import { readNotification, validNotification, siteUrl } from '@/lib/wayforpay';
export const runtime = 'nodejs';
export async function POST(request: Request) {
  try {
    const data = await readNotification(request);
    if (validNotification(data) && data.transactionStatus === 'Approved') {
      return Response.redirect(`${siteUrl()}/thank-you?status=approved`, 303);
    }
  } catch { /* A browser return is not a trusted payment confirmation. */ }
  return Response.redirect(`${siteUrl()}/thank-you?status=pending`, 303);
}
