// Midnight after 27 November in Europe/Kyiv (UTC+02:00 on this date).
export const promotionDeadline = Date.parse('2026-11-28T00:00:00+02:00');
export const plans = [
  { id: 'start', name: 'MODEL START', early: 9900, full: 14900 },
  { id: 'pro', name: 'NEW MODEL PRO', early: 14900, full: 19900 },
  { id: 'vip', name: 'VIP MODEL WAY', early: 39900, full: 49900 },
] as const;
export function priceAt(plan: typeof plans[number], now = Date.now()) {
  return now < promotionDeadline ? plan.early : plan.full;
}
export const formatPrice = (amount: number) => new Intl.NumberFormat('uk-UA').format(amount) + ' грн';
