"use client";

import { useEffect, useState } from "react";

const modules = [
  "Я — модель!",
  "Від новачка до профі",
  "Пошук перших зйомок",
  "Перші комерційні зйомки",
  "Розвиток у професії",
  "Особистий бренд і масштабування",
];

const questions = [
  ["Чи потрібен досвід?", "Ні. Курс створений для тих, хто лише починає, а також для моделей із першим досвідом."],
  ["Чи потрібні модельні параметри?", "Ні. У комерційному моделінгу цінують характер, типаж і вміння працювати в кадрі."],
  ["Чи можна навчатися з іншої країни?", "Так. Основна програма повністю онлайн."],
  ["Коли старт навчання?", "10 січня 2027 року."],
];

export default function Home() {
  const [openModule, setOpenModule] = useState<number | null>(null);
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);
  const [headerScrolled, setHeaderScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setHeaderScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main>
      <header className={`site-header ${headerScrolled ? "is-scrolled" : ""}`}>
        <a className="logo" href="#top" aria-label="New Model Way — на початок">
          NEW<br /><i>MODEL WAY</i>
        </a>
        <nav aria-label="Головна навігація">
          <a href="#program">Програма</a>
          <a href="#author">Про авторку</a>
          <a href="#tariffs">Тарифи</a>
          <a href="#faq">FAQ</a>
        </nav>
        <a className="header-cta" href="#tariffs">Обрати тариф <span>↗</span></a>
      </header>

      <section className="hero-cover" id="top">
        <div className="cover-image"><img src="/images/iryna-hero.jpg" alt="Ірина, авторка New Model Way" /></div>
        <div className="cover-title" aria-label="New Model Way"><span>NEW</span><span>MODEL</span><em>WAY</em></div>
        <div className="cover-title cover-title-outline" aria-hidden="true"><span>NEW</span><span>MODEL</span><em>WAY</em></div>
        <p className="hero-detail detail-top">Онлайн-курс для майбутніх<br />комерційних моделей</p>
        <p className="hero-detail detail-right">Старт 10.01.2027<br />Навчання онлайн</p>
        <p className="hero-detail detail-bottom">Модулі <span>·</span> практика <span>·</span> портфоліо <span>·</span> бренди</p>
        <div className="hero-manifesto"><span>Твій шлях</span><p>Не чекай дозволу.<br />Створи свою можливість.</p></div>
        <div className="cover-offer">
          <p className="offer-title">Як стати незалежною моделлю та почати зніматись для брендів.</p>
          <p className="offer-text">Покрокова онлайн-програма для тих, хто хоче впевнено працювати в кадрі, створити портфоліо та самостійно знаходити комерційні зйомки.</p>
          <a className="button" href="#tariffs">Обрати тариф <span>→</span></a>
          <small>Ціни раннього бронювання діють до 27 листопада.</small>
        </div>
      </section>

      <section className="intro section" id="author">
        <div className="section-label">01 / Лист від Ірини</div>
        <div className="intro-content">
          <h2>Моделінг може<br />починатися з <em>тебе.</em></h2>
          <div>
            <p className="intro-large">Якщо ти давно хочеш спробувати себе в моделінгу, але не знаєш, з чого почати — я створила цю програму для тебе.</p>
            <p>Без залежності від агентств, жорстких рамок чи чужого дозволу. Лише зрозумілі кроки, практика та твій власний шлях.</p>
            <p className="signature">Ірина</p>
          </div>
        </div>
      </section>

      <section className="statement section">
        <p className="eyebrow">Твоя нова реальність</p>
        <h2>Не чекати запрошення.<br /><em>Створювати можливості.</em></h2>
        <div className="statement-grid">
          <p>Навчишся впевнено працювати в кадрі, створиш портфоліо і зрозумієш, як знаходити бренди самостійно.</p>
          <p>Твоя перша комерційна зйомка — не випадковість. Це результат системних кроків.</p>
        </div>
      </section>

      <section className="program section" id="program">
        <p className="eyebrow">Програма навчання</p>
        <div className="section-heading">
          <h2>Шість кроків до<br /><em>першої зйомки.</em></h2>
          <p>Уроки, практика й інструменти, які допомагають рухатися без хаосу.</p>
        </div>
        <div className="module-list">
          {modules.map((module, index) => (
            <article key={module} className={openModule === index ? "expanded" : ""}>
              <button onClick={() => setOpenModule(openModule === index ? null : index)} aria-expanded={openModule === index}>
                <span>0{index + 1}</span><b>{module}</b><i>{openModule === index ? "−" : "+"}</i>
              </button>
              {openModule === index && <p>Практичний модуль із чіткими діями, щоб наблизити тебе до впевненої роботи як комерційна модель.</p>}
            </article>
          ))}
        </div>
      </section>

      <section className="format section">
        <p className="eyebrow">Формат навчання</p>
        <div className="format-grid">
          <h2>Навчання, яке<br />працює з твоїм <em>життям.</em></h2>
          <ul>
            <li><span>Формат</span> Онлайн-уроки у зручному темпі</li>
            <li><span>Практика</span> Завдання після кожного модуля</li>
            <li><span>Підтримка</span> Зворотний зв’язок на тарифах PRO та VIP</li>
            <li><span>Випускний</span> Для PRO та VIP у Хмельницькому</li>
          </ul>
        </div>
      </section>

      <section className="prices section" id="tariffs">
        <p className="eyebrow">Тарифи та вартість</p>
        <h2>Обери свій <em>формат.</em></h2>
        <div className="price-grid">
          <article>
            <p>MODEL START</p><strong>9 900 <small>грн</small></strong><s>14 900 грн</s>
            <span>Модулі 1–5<br />Самостійне навчання</span>
            <a className="text-link" href="#contact">Обрати →</a>
          </article>
          <article className="recommended">
            <p>NEW MODEL PRO <i>популярний</i></p><strong>14 900 <small>грн</small></strong><s>19 900 грн</s>
            <span>Усі 6 модулів<br />Перевірка Іриною · випускний</span>
            <a className="button" href="#contact">Обрати тариф →</a>
          </article>
          <article>
            <p>VIP MODEL WAY</p><strong>39 900 <small>грн</small></strong><s>49 900 грн</s>
            <span>Персональний чат<br />Розбори · лише 10 місць</span>
            <a className="text-link" href="#contact">Обрати →</a>
          </article>
        </div>
      </section>

      <section className="faq section" id="faq">
        <p className="eyebrow">FAQ</p>
        <h2>Часті <em>запитання.</em></h2>
        <div className="faq-list">
          {questions.map(([question, answer], index) => (
            <article key={question}>
              <button onClick={() => setOpenQuestion(openQuestion === index ? null : index)} aria-expanded={openQuestion === index}>
                {question}<span>{openQuestion === index ? "−" : "+"}</span>
              </button>
              {openQuestion === index && <p>{answer}</p>}
            </article>
          ))}
        </div>
      </section>

      <section className="closing section" id="contact">
        <p className="eyebrow">New Model Way / 2027</p>
        <h2>Почни свій<br /><em>шлях.</em></h2>
        <p>Твоя професія може початися з одного рішення.</p>
        <a className="button" href="#tariffs">Обрати свій тариф →</a>
      </section>

      <footer>© 2026 NEW MODEL WAY <span>·</span> Політика конфіденційності <span>·</span> Публічна оферта</footer>
    </main>
  );
}
