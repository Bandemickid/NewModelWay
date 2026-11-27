export default async function ThankYou({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const approved = (await searchParams).status === 'approved';
  return <main className="payment-result"><p className="eyebrow">NEW MODEL WAY</p>
    <h1>{approved ? 'Оплата пройшла!' : 'Перевіряємо оплату'}</h1>
    <p>{approved ? 'Ми надішлемо доступ на вашу пошту. Старт курсу 10 січня.' : 'Якщо кошти списано, дочекайтеся підтвердження. З питань доступу напишіть нам у Telegram.'}</p>
    <a className="button" href="https://t.me/newmodelway_bot">Перейти в Telegram</a></main>;
}
