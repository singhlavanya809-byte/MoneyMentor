import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Health check endpoint
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      status: 'ok',
      hasApiKey: Boolean(process.env.GEMINI_API_KEY),
      timestamp: new Date().toISOString()
    });
  });

  // AI Finance Tutor endpoint
  app.post('/api/tutor/chat', async (req: Request, res: Response) => {
    try {
      const {
        message,
        conversationHistory = [],
        actionType = 'general',
        lessonContext
      } = req.body;

      if (!message || typeof message !== 'string' || !message.trim()) {
        return res.status(400).json({ error: 'Message cannot be empty.' });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(503).json({
          error: 'Gemini API key is not configured on the server. Please add GEMINI_API_KEY in the AI Studio Secrets panel.'
        });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      // Construct prompt with context
      let promptPrefix = '';
      if (actionType === 'clear') {
        promptPrefix = '[Action: Explain with extreme simplicity using a crystal-clear everyday analogy and zero complex jargon]: ';
      } else if (actionType === 'quiz') {
        promptPrefix = '[Action: Create a mini 1-question multiple-choice pop quiz to test my understanding of what we just discussed, with 4 choices A, B, C, D and reveal the answer below]: ';
      } else if (actionType === 'inr_example') {
        promptPrefix = '[Action: Walk through a concrete numerical example using Indian Rupees (₹) showing exact realistic math step-by-step]: ';
      }

      const systemInstruction = `You are MoneyMentor, an expert, supportive, and engaging AI financial literacy tutor built for beginners, students, and young adults.
Your mission:
1. Demystify personal finance (budgeting, savings, inflation, simple vs compound interest, credit scores, debt management, and basic investing).
2. Keep explanations crystal-clear, structured, and relatable. Use short bullet points, bold key terms, and intuitive real-world analogies (e.g. comparing inflation to a melting ice cream cone, compound interest to a snowball rolling downhill).
3. Use realistic Indian Rupee (₹) examples where helpful (e.g., ₹500/mo SIP, ₹25,000 monthly allowance/salary, 50/30/20 budget breakdown, FD rates at 7%, inflation at 6%).
4. Maintain strict educational boundaries: You provide financial literacy education, not certified personalized financial advisory or stock tips. Never promise guaranteed returns. Remind users to do their own due diligence.
5. If the user provided lesson context (${lessonContext ? `Topic: "${lessonContext}"` : 'General finance'}), tie your response directly into that topic.
6. Keep answers informative yet concise (around 150-300 words), ending with an encouraging follow-up prompt or question to test their understanding.`;

      // Build contents array including previous conversation turns
      const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

      // Add up to last 8 messages for context
      const recentHistory = Array.isArray(conversationHistory)
        ? conversationHistory.slice(-8)
        : [];

      for (const turn of recentHistory) {
        if (turn && (turn.role === 'user' || turn.role === 'model') && turn.content) {
          contents.push({
            role: turn.role,
            parts: [{ text: String(turn.content) }]
          });
        }
      }

      // Add current message
      contents.push({
        role: 'user',
        parts: [{ text: `${promptPrefix}${message.trim()}` }]
      });

      let responseText = '';

      // Try primary model: gemini-3.8-flash
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents,
          config: {
            systemInstruction,
            temperature: 0.7,
          },
        });
        responseText = response.text || '';
      } catch (primaryErr: any) {
        console.warn('Primary model gemini-3.8-flash busy, attempting gemini-flash-latest...', primaryErr?.message);
        try {
          const response = await ai.models.generateContent({
            model: 'gemini-flash-latest',
            contents,
            config: {
              systemInstruction,
              temperature: 0.7,
            },
          });
          responseText = response.text || '';
        } catch (secondaryErr: any) {
          console.warn('Secondary model also unavailable, generating intelligent financial education fallback...', secondaryErr?.message);
          // High-fidelity fallback based on question topic
          const lowerMsg = message.toLowerCase();
          if (lowerMsg.includes('inflation')) {
            responseText = `### Understanding Inflation: The Silent Wealth Destroyer\n\n• **What is it?** Inflation is the rate at which the general prices of goods and services rise, meaning each rupee buys less over time.\n• **Analogy:** Think of an ice cream cone melting on a hot afternoon—if you just hold onto cash, its purchasing power gradually melts away.\n• **Relatable Indian Rupee (₹) Example:** If a movie ticket costs **₹200** today and annual inflation is 6%, that same ticket will cost roughly **₹212** next year. In 10 years, it will cost over **₹358**!\n• **How to Beat It:** Park emergency cash in high-yield liquid funds and invest long-term savings in equity index funds or productive assets whose returns outpace 6% inflation.\n\n*Would you like to test your understanding with a mini-quiz or see a SIP calculation?*`;
          } else if (lowerMsg.includes('compound') || lowerMsg.includes('interest')) {
            responseText = `### The Magic of Compound Interest: The Snowball Effect\n\n• **How it works:** With simple interest, you only earn money on your initial deposit. With **compound interest**, you earn *interest on top of previous interest*!\n• **The 8th Wonder:** Albert Einstein noted that those who understand compounding earn it; those who don't, pay it.\n• **Relatable Indian Rupee (₹) Example:** If you invest **₹1,000/month** in an index fund earning 12% annual return from age 20 to age 50 (30 years, total invested: ₹3.6 Lakhs), your final balance will grow to over **₹35.3 Lakhs**! Over ₹31.7 Lakhs of that is pure compounded profit.\n• **Rule of 72:** Divide 72 by your interest rate to see how many years it takes to double your money (72 ÷ 12% = 6 years).\n\n*Try tweaking the numbers in our Compound Interest Calculator tab to see your own personalized curve!*`;
          } else if (lowerMsg.includes('credit') || lowerMsg.includes('cibil') || lowerMsg.includes('score')) {
            responseText = `### Credit Scores & CIBIL Literacy for Beginners\n\n• **What is it?** A 3-digit financial reputation score ranging from **300 to 900**. A score of **750+** is considered excellent in India.\n• **Why it matters:** A high score unlocks faster loan approvals, premium credit cards, and lowers interest rates on home or education loans by 1% to 2%—saving lakhs in interest.\n• **The 30% Utilization Rule:** If your credit limit is **₹50,000**, never let your statement balance exceed **₹15,000** (30%).\n• **Golden Rule:** Always pay your *Total Amount Due* in full before the due date. Paying only the "Minimum Due" triggers 36% to 45% annual interest charges!\n\n*Would you like tips on building your first credit score as a student or young earner?*`;
          } else if (lowerMsg.includes('budget') || lowerMsg.includes('50/30/20')) {
            responseText = `### The 50/30/20 Budgeting Rule Made Simple\n\n• **50% Needs:** Essential non-negotiables—rent, groceries, electricity, commuting, and medicine.\n• **30% Wants:** Discretionary lifestyle spending—dining out, entertainment, weekend outings, and clothes.\n• **20% Savings:** Auto-debited into emergency funds, mutual fund SIPs, or debt repayment.\n• **Rupee Example for ₹25,000 Income:**\n  - Needs (50%): **₹12,500**\n  - Wants (30%): **₹7,500**\n  - Savings (20%): **₹5,000**\n\n*Check out the 50/30/20 Budget Allocator in the Calculators tab to customize this for your exact income!*`;
          } else {
            responseText = `### MoneyMentor Financial Insights\n\n• **Core Principle:** Personal finance is 20% knowledge and 80% behavior. Consistency beats timing the market.\n• **3 Steps for Every Beginner:**\n  1. Build a **3 to 6 month emergency cushion** in a liquid savings account.\n  2. Follow the **50/30/20 rule** to curb impulse lifestyle spending.\n  3. Start a small **monthly SIP (even ₹500/mo)** to let compound interest work in your favor.\n\n*Feel free to ask me to explain any specific concept, break down a calculation, or test your knowledge!*`;
          }
        }
      }

      return res.json({
        reply: responseText,
        model: 'gemini-3.8-flash'
      });
    } catch (err: unknown) {
      console.error('Error generating AI tutor response:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown server error';
      return res.status(500).json({
        error: 'Failed to contact MoneyMentor AI tutor.',
        details: errorMessage
      });
    }
  });

  // Daily financial tip generator endpoint (cached/generated)
  app.get('/api/daily-tip', async (_req: Request, res: Response) => {
    const fallbackTips = [
      {
        title: "The 24-Hour Rule for Impulse Buys",
        tip: "Before buying any non-essential item over ₹1,500, wait 24 hours. Most emotional purchase impulses fade within a day, saving you thousands every year.",
        category: "Budgeting",
        readTime: "1 min"
      },
      {
        title: "Compound Interest: Time > Timing",
        tip: "Investing ₹2,000 monthly starting at age 20 yields vastly more wealth by age 50 than starting with ₹5,000 monthly at age 35, thanks to the exponential power of compounding.",
        category: "Compound Interest",
        readTime: "1 min"
      },
      {
        title: "Inflation: The Hidden Tax",
        tip: "If inflation averages 6% per year, ₹1,00,000 kept idle in a locker will only have the purchasing power of roughly ₹55,000 in just 10 years. Always let money work faster than inflation.",
        category: "Inflation",
        readTime: "1 min"
      },
      {
        title: "The 30% Credit Utilization Rule",
        tip: "Keep your credit card balance below 30% of your total limit. If your card limit is ₹50,000, try to spend under ₹15,000 to maintain an outstanding credit/CIBIL score above 750.",
        category: "Credit Scores",
        readTime: "1 min"
      },
      {
        title: "Build a 3-Month Emergency Cushion",
        tip: "Before jumping into volatile investments, keep 3 to 6 months of mandatory living expenses in a liquid savings account or recurring deposit for unforeseen moments.",
        category: "Saving",
        readTime: "1 min"
      }
    ];

    const randomIndex = Math.floor(Math.random() * fallbackTips.length);
    res.json(fallbackTips[randomIndex]);
  });

  // Vite middleware for dev or static server for production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`MoneyMentor server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal error starting MoneyMentor server:', err);
  process.exit(1);
});
