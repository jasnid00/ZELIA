/**
 * Formats a number in Indian Rupees (₹) using Indian numbering standards (e.g., ₹7,999, ₹14,500)
 */
export function formatINR(amount: number): string {
  if (isNaN(amount)) return '₹0';
  return `₹${Math.round(amount).toLocaleString('en-IN')}`;
}
