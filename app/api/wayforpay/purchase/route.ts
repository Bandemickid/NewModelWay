import { plans } from '@/lib/pricing';
import { createPurchase, paymentAmount } from '@/lib/wayforpay';
export const runtime = 'nodejs';
export async function POST(request: Request) {
  try {
    const { plan } = await request.json();
    if (typeof plan !== 'string') return Response.json({ error: 'Оберіть тариф.' }, { status: 400 });
    if (!process.env.WAYFORPAY_SECRET_KEY) return Response.json({ error: 'Оплата ще налаштовується. Спробуйте пізніше.' }, { status: 503 });
    return Response.json(createPurchase(plan), { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return Response.json({ error: 'Не вдалося створити оплату. Перевірте тариф або спробуйте пізніше.' }, { status: 400 });
  }
}

export async function GET() {
  try {
    return Response.json({ testMode: Boolean(process.env.WAYFORPAY_TEST_AMOUNT), plans: plans.map(p => ({ name: p.name, amount: paymentAmount(p) })) }, { headers: { 'Cache-Control': 'no-store' } });
  } catch { return Response.json({ error: 'Payment configuration unavailable' }, { status: 503 }); }
}
