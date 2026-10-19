import { Currency } from '../types';

export const formatCurrency = (amount: number, currency: Currency = 'INR'): string => {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '0';
  }

  if (currency === 'INR') {
    // Format in Indian numbering system (Lakhs and Crores)
    const formatted = new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }).format(Math.round(amount));
    return `₹${formatted}`;
  } else if (currency === 'USD') {
    const formatted = new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }).format(Math.round(amount));
    return `$${formatted}`;
  } else if (currency === 'EUR') {
    const formatted = new Intl.NumberFormat('de-DE', {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }).format(Math.round(amount));
    return `€${formatted}`;
  }

  return `₹${Math.round(amount).toLocaleString()}`;
};

export const formatCompactNumber = (value: number, currency: Currency = 'INR'): string => {
  if (currency === 'INR') {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(2)} Cr`;
    }
    if (value >= 100000) {
      return `₹${(value / 100000).toFixed(1)} Lakh`;
    }
    if (value >= 1000) {
      return `₹${(value / 1000).toFixed(1)}k`;
    }
    return `₹${Math.round(value)}`;
  }
  return formatCurrency(value, currency);
};

export const formatPercent = (value: number): string => {
  return `${value.toFixed(1)}%`;
};
