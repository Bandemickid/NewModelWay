import { createHmac, randomUUID, timingSafeEqual } from 'node:crypto';
import { plans, priceAt } from './pricing';
export const merchantAccount = 'newmodelway_com';
export const merchantDomainName = 'newmodelway.com';
export function sign(values: (string | number)[], secret = process.env.WAYFORPAY_SECRET_KEY) {
  if (!secret) throw new Error('Payment configuration missing');
  return createHmac('md5', secret).update(values.join(';'), 'utf8').digest('hex');
}
export function siteUrl() {
  const url = new URL(process.env.WAYFORPAY_SITE_URL || 'https://newmodelway.com');
  if (url.protocol !== 'https:' && url.hostname !== 'localhost') throw new Error('Invalid payment origin');
  return url.origin;
}
export function paymentAmount(plan: typeof plans[number], now = Date.now()) {
  const test = process.env.WAYFORPAY_TEST_AMOUNT;
  const amount = test ? Number(test) : priceAt(plan, now);
  if (!Number.isFinite(amount) || amount <= 0 || Math.abs(Math.round(amount * 100) - amount * 100) > 0.000001) throw new Error('Invalid test amount');
  return amount;
}
export function createPurchase(name: string, now = Date.now()) {
  const plan = plans.find(p => p.name === name);
  if (!plan) throw new Error('Unknown plan');
  const amount = paymentAmount(plan, now);
  const orderDate = Math.floor(now / 1000);
  const orderReference = `nmw-${plan.id}-${orderDate}-${randomUUID()}`;
  const signatureValues = [merchantAccount, merchantDomainName, orderReference, orderDate, amount, 'UAH', plan.name, 1, amount];
  return { merchantAccount, merchantDomainName, merchantAuthType: 'SimpleSignature', merchantTransactionSecureType: 'AUTO',
    merchantSignature: sign(signatureValues), orderReference, orderDate, amount, currency: 'UAH',
    productName: [plan.name], productCount: [1], productPrice: [amount], language: 'UA',
    returnUrl: `${siteUrl()}/api/wayforpay/return`, serviceUrl: `${siteUrl()}/api/wayforpay/webhook` };
}
export type Notification = Record<string, unknown>;
export function validNotification(data: Notification) {
  if (data.merchantAccount !== merchantAccount || data.currency !== 'UAH' || typeof data.orderReference !== 'string' || !/^nmw-(start|pro|vip)-\d+-[a-f0-9-]+$/.test(data.orderReference)) return false;
  const fields = ['merchantAccount', 'orderReference', 'amount', 'currency', 'authCode', 'cardPan', 'transactionStatus', 'reasonCode'];
  if (fields.some(k => !['string', 'number'].includes(typeof data[k]))) return false;
  const supplied = data.merchantSignature;
  if (typeof supplied !== 'string' || !/^[a-f0-9]{32}$/i.test(supplied)) return false;
  return timingSafeEqual(Buffer.from(sign(fields.map(k => String(data[k]))), 'hex'), Buffer.from(supplied, 'hex'));
}
export async function readNotification(request: Request): Promise<Notification> {
  const text = await request.text();
  if (text.length > 65536) throw new Error('Payload too large');
  const data = request.headers.get('content-type')?.includes('application/x-www-form-urlencoded')
    ? Object.fromEntries(new URLSearchParams(text)) : JSON.parse(text);
  if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('Invalid payload');
  return data;
}
// TODO: Connect SendPulse. Webhooks are retried: deduplicate by orderReference in durable storage before granting access.
export async function sendOrderToSendPulse(order: Record<string, unknown>) { void order; }
