import { readNotification, validNotification, sign, sendOrderToSendPulse } from '@/lib/wayforpay';
import { plans } from '@/lib/pricing';
export const runtime = 'nodejs';
export async function POST(request: Request) {
  try {
    const data = await readNotification(request);
    if (!validNotification(data)) return Response.json({ error: 'Invalid signature' }, { status: 403 });
    if (data.transactionStatus === 'Approved') {
      const plan = plans.find(p => String(data.orderReference).startsWith(`nmw-${p.id}-`));
      const order = { tariff: plan?.name, amount: data.amount, email: data.email, phone: data.phone,
        name: [data.clientFirstName || data.firstName, data.clientLastName || data.lastName].filter(Boolean).join(' '), orderReference: data.orderReference };
      console.info('WayForPay Approved', order);
      await sendOrderToSendPulse(order);
    }
    const time = Math.floor(Date.now() / 1000);
    return Response.json({ orderReference: data.orderReference, status: 'accept', time,
      signature: sign([String(data.orderReference), 'accept', time]) });
  } catch { return Response.json({ error: 'Unable to process notification' }, { status: 400 }); }
}
