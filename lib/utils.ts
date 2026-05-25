import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatValue(value: string, type: string): string {
  if (!value) return '';
  
  if (type === 'currency') {
    // Strip non-numeric characters except decimals
    const cleanValue = value.replace(/[^0-9.]/g, '');
    const num = parseFloat(cleanValue);
    if (!isNaN(num)) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(num);
    }
  }

  if (type === 'date') {
    // Simple date string formatting: YYYY-MM-DD to Long Form
    const dateObj = new Date(value + 'T00:00:00');
    if (!isNaN(dateObj.getTime())) {
      return dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }
  }

  return value;
}
