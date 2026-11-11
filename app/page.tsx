"use client";

import { useEffect, useRef, useState } from "react";

const barriers = [
  ["Я не знаю, з чого почати.", "Це не твоя вина. Ніхто не показує свої перші кроки. Я покажу."],
  ["У мене не вийде.", "Ти знаєш цей голос. Я навчу, як вимикати його перед камерою."],
  ["Зі мною щось не так: зріст, вік, зовнішність.", "Бренди шукають різних людей. Комерційна зйомка — це не лише подіум."],
  ["Потрібні великі гроші.", "Для старту потрібні телефон, світло з вікна і план дій."],
  ["А що скажуть?", "Скажуть. А потім спитають, як тобі вдалося?"],
  ["Хочу заробляти на зйомках, але в мене немає зв’язків.", "Тепер у тебе є я. Зовсім скоро з’являться сотні знайомих у світі моделінгу."],
];

const questions = [
  ["Чи потрібен досвід?", "Ні. Курс створений для тих, хто лише починає, а також для моделей із першим досвідом."],
  ["Чи потрібні модельні параметри?", "Ні. У комерційному моделінгу цінують характер, типаж і вміння працювати в кадрі."],
  ["Чи можна навчатися з іншої країни?", "Так. Основна програма повністю онлайн."],
  ["Коли старт навчання?", "10 січня 2027 року."],
];

const outcomes = [
  "Визначити свій напрямок у комерційному моделінгу.",
  "Працювати перед камерою, позувати та передавати потрібні емоції.",
  "Підготувати професійні digitals і модельне портфоліо.",
  "Оформити Instagram як сторінку комерційної моделі.",
  "Самостійно знаходити бренди та рекламні проєкти.",
  "Домовлятися про співпрацю з потенційними клієнтами.",
  "Визначати вартість своєї роботи та обговорювати умови оплати.",
  "Професійно поводитися на рекламних зйомках.",
  "Розвиватися у напрямках UGC та моделі-інфлюенсера.",
];

const outcomePhotos = [
  ["/images/hero-fashion-1.jpg", "Твій типаж"],
  ["/images/hero-fashion-2.jpg", "Кадр і позування"],
  ["/images/hero-fashion-3.jpg", "Портфоліо"],
  ["/images/dream-feature.jpg", "Commercial image"],
  ["/images/iryna-letter.jpg", "Особистий бренд"],
  ["/images/iryna-solution.jpg", "Зйомки для брендів"],
  ["/images/hero-portrait.jpg", "Співпраця"],
  ["/images/hero-editorial-1.jpg", "UGC та influence"],
];

const courseModules = [
  {
    title: "Я модель!",
    before: "не розумієш, хто така комерційна модель і чи підходить твоя зовнішність.",
    after: "знаєш ринок і способи заробітку, визначила свій типаж і напрямок, оформила Instagram моделі.",
  },
  {
    title: "Від новачка до профі",
    before: "не знаєш, куди діти руки, кам’янієш перед камерою.",
    after: "впевнено позуєш, керуєш мімікою й емоціями, провела першу фотосесію у двох образах і маєш фото для портфоліо.",
  },
  {
    title: "Пошук перших комерційних зйомок",
    before: "не знаєш, де шукати бренди і як їм писати.",
    after: "маєш digitals і портфоліо, знаєш, де шукати замовників в Україні й за кордоном, пишеш брендам, домовляєшся про оплату, розумієш, коли бартер, а коли відмова.",
  },
  {
    title: "Перші комерційні зйомки",
    before: "бренд обрав тебе, і ти не знаєш, що робити далі.",
    after: "читаєш ТЗ і moodboard, знаєш, як працювати з командою на майданчику, обговорюєш оплату й права на використання фото.",
  },
  {
    title: "Розвиток у професії",
    before: "бачиш у моделінгу лише красиві фото.",
    after: "знаєш усі джерела доходу, обрала свій напрямок і встановила свою ціну.",
  },
  {
    title: "Особистий бренд і масштабування",
    before: "зйомки трапляються випадково.",
    after: "Instagram приводить клієнтів сам, маєш контент-стратегію і план, як щільно заповнити свій графік зйомок.",
  },
];

const curriculumModules = [
  {
    title: "Я — модель!",
    summary: "Знайомство з професією, модельним ринком, видами комерційного моделінгу та можливостями для новачків.",
    lessons: ["Назва уроку буде додана після затвердження програми", "Назва уроку буде додана після затвердження програми", "Назва уроку буде додана після затвердження програми"],
    before: ["Не розуміла, хто така комерційна модель і чим цей напрямок відрізняється від fashion-моделінгу.", "Не знала, які існують види модельної роботи та скільки можна заробляти на різних типах зйомок.", "Не розуміла, чи підходить твоя зовнішність, зріст і типаж для комерційного моделінгу.", "Не знала, з чого почати шлях у професії та як взагалі влаштований модельний ринок."],
    after: ["Розумітимеш, як працює індустрія комерційного моделінгу та які можливості вона відкриває.", "Знатимеш основні напрямки модельної роботи, формати зйомок та способи заробітку.", "Зможеш визначити свої сильні сторони, особливості зовнішності та перспективні напрямки для роботи.", "Обереш власний напрямок розвитку та сформуєш перше розуміння свого позиціонування.", "Матимеш чітке уявлення, з чого починати та які кроки потрібно зробити, щоб стати комерційною моделлю."],
  },
  {
    title: "Від новачка до профі",
    summary: "Позування, робота з мімікою та емоціями, пластика тіла, впевненість перед камерою, підготовка до зйомок і створення портфоліо.",
    lessons: ["Назва уроку буде додана після затвердження програми", "Назва уроку буде додана після затвердження програми", "Назва уроку буде додана після затвердження програми"],
    before: ["Не знала, як правильно позувати перед камерою та що робити з руками, ногами й тілом.", "Не вміла працювати з мімікою, емоціями та виразом обличчя.", "Не розуміла, як рухатися, змінювати пози та виглядати природно під час зйомки.", "Могла соромитися камери, затискатися та почуватися невпевнено перед об'єктивом.", "Не знала, як самостійно організувати зйомку та отримати фотографії для модельного портфоліо."],
    after: ["Навчишся позувати та впевнено працювати перед камерою.", "Знатимеш, як використовувати міміку, емоції, погляд і рухи тіла для створення різних образів.", "Зможеш підбирати пози відповідно до завдання фотографа або бренду.", "Навчишся працювати зі своїми затисками та почуватися природніше під час зйомок.", "Зможеш самостійно організувати тестову фотосесію та підготуватися до неї.", "Отримаєш перші фотографії, які зможеш використовувати для формування свого модельного портфоліо."],
  },
  {
    title: "Пошук перших комерційних зйомок",
    summary: "Digitals, портфоліо, Instagram моделі, пошук брендів і кастингів, комунікація із замовниками, переговори та перші домовленості.",
    lessons: ["Назва уроку буде додана після затвердження програми", "Назва уроку буде додана після затвердження програми", "Назва уроку буде додана після затвердження програми"],
    before: ["Не знала, де шукати бренди, рекламні проєкти та кастинги для моделей.", "Не розуміла, як презентувати себе потенційним замовникам.", "Не знала, які фотографії потрібно надсилати брендам і що таке digitals.", "Не вміла правильно писати брендам, пропонувати свою кандидатуру та домовлятися про співпрацю.", "Не розуміла різниці між комерційною зйомкою, бартером і безкоштовною роботою.", "Не знала, як визначати вартість своїх послуг та обговорювати оплату."],
    after: ["Навчишся знаходити бренди, кастинги та потенційних замовників.", "Знатимеш, де шукати можливості для перших комерційних зйомок в Україні та за її межами.", "Підготуєш власні digitals і зрозумієш, яким має бути модельне портфоліо.", "Навчишся презентувати себе, писати брендам та пропонувати свою кандидатуру.", "Зможеш вести переговори із замовниками, обговорювати умови співпраці та оплату.", "Розумітимеш, як формувати свою вартість, коли погоджуватися на бартер, а коли відмовлятися від пропозиції.", "Отримаєш зрозумілу систему пошуку перших комерційних замовлень."],
  },
  {
    title: "Перші комерційні зйомки",
    summary: "Підготовка до рекламного проєкту, робота на майданчику, взаємодія з командою, виконання технічного завдання та професійна поведінка.",
    lessons: ["Назва уроку буде додана після затвердження програми", "Назва уроку буде додана після затвердження програми", "Назва уроку буде додана після затвердження програми"],
    before: ["Не знала, як підготуватися до рекламної зйомки після того, як бренд обрав тебе.", "Не розуміла, як читати технічне завдання та що потрібно уточнити в замовника.", "Не знала, хто входить до команди на знімальному майданчику та за що відповідає кожен спеціаліст.", "Не розуміла, як поводитися під час зйомки, взаємодіяти з фотографом і виконувати завдання бренду.", "Не знала, на що звертати увагу в домовленостях щодо оплати та використання фотографій і відео."],
    after: ["Навчишся правильно готуватися до комерційних зйомок та аналізувати технічне завдання.", "Знатимеш, як працювати з референсами, moodboard та побажаннями замовника.", "Розумітимеш, як організована робота на знімальному майданчику та як взаємодіяти з командою.", "Навчишся професійно поводитися під час рекламних, каталожних, beauty та lifestyle-зйомок.", "Знатимеш, як виконувати завдання фотографа, режисера чи представника бренду.", "Розумітимеш, як обговорювати оплату, авторські права та умови використання відзнятого матеріалу.", "Матимеш чіткий план дій, як пройти шлях від запрошення на зйомку до завершення співпраці із замовником."],
  },
  {
    title: "Розвиток в професії",
    summary: "Види робіт і оплат, UGC-кріейтори, моделі-інфлюенсери, вибір свого напрямку, позиціонування та встановлення власної ціни.",
    lessons: ["Назва уроку буде додана після затвердження програми", "Назва уроку буде додана після затвердження програми", "Назва уроку буде додана після затвердження програми"],
    before: ["Не знала, які ще можливості для заробітку існують у комерційному моделінгу, крім класичних фотозйомок.", "Не розуміла, чим відрізняється робота комерційної моделі від UGC-кріейтора та моделі-інфлюенсера.", "Не знала, як обрати напрямок, у якому зможеш розвиватися та заробляти.", "Не розуміла, як правильно позиціонувати себе та встановлювати ціну за різні формати роботи.", "Можливо, сприймала моделінг лише як красиві фотографії, а не як професію з різними джерелами доходу."],
    after: ["Дізнаєшся про різні формати модельної роботи та способи монетизації своїх навичок.", "Розберешся, хто такі UGC-кріейтори та моделі-інфлюенсери й чим відрізняється їхня робота.", "Зможеш визначити, який напрямок найбільше відповідає твоїм інтересам і можливостям.", "Навчишся формувати власне позиціонування та презентувати себе відповідно до обраного напрямку.", "Розумітимеш, як оцінювати свою роботу та формувати вартість різних послуг.", "Побачиш більше можливостей для розвитку та заробітку, використовуючи навички комерційної моделі."],
  },
  {
    title: "Особистий бренд і масштабування",
    summary: "Розвиток особистого бренду, системний пошук клієнтів, контент для Instagram, збільшення вартості послуг і подальший розвиток у професії.",
    lessons: ["Назва уроку буде додана після затвердження програми", "Назва уроку буде додана після затвердження програми", "Назва уроку буде додана після затвердження програми"],
    before: ["Не знала, як перетворити Instagram на інструмент залучення клієнтів.", "Не розуміла, який контент публікувати, щоб привертати увагу брендів і замовників.", "Не знала, як підтримувати інтерес до себе та регулярно нагадувати про себе потенційним клієнтам.", "Не розуміла, як перейти від поодиноких зйомок до системної роботи з брендами.", "Не мала стратегії подальшого розвитку та збільшення власного доходу."],
    after: ["Навчишся використовувати Instagram як інструмент особистого бренду та пошуку клієнтів.", "Зможеш оформити профіль так, щоб бренди розуміли, хто ти, у якому напрямку працюєш і як із тобою співпрацювати.", "Сформуєш контент-стратегію для просування себе як комерційної моделі.", "Навчишся регулярно привертати увагу потенційних замовників і підтримувати професійні контакти.", "Розумітимеш, як розвивати співпрацю з брендами та поступово підвищувати вартість своїх послуг.", "Матимеш власний план подальшого розвитку в професії та масштабування своєї діяльності."],
  },
];

type LetterStage = "waiting" | "sealed" | "cracked" | "opened";

function LetterText({ children, startDelay }: { children: string; startDelay: number }) {
  return (
    <p className="letter-typed-text">
      {Array.from(children).map((character, index) => (
        <span key={`${character}-${index}`} className="letter-character" style={{ animationDelay: `${startDelay + index * 0.008}s` }}>
          {character === " " ? "\u00a0" : character}
        </span>
      ))}
    </p>
  );
}

export default function Home() {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [heroReady, setHeroReady] = useState(false);
  const [letterVisible, setLetterVisible] = useState(false);
  const [letterStage, setLetterStage] = useState<LetterStage>("waiting");
  const [dreamVisible, setDreamVisible] = useState(false);
  const [storyVisible, setStoryVisible] = useState(false);
  const [turnVisible, setTurnVisible] = useState(false);
  const [solutionVisible, setSolutionVisible] = useState(false);
  const [outcomesVisible, setOutcomesVisible] = useState(false);
  const [courseVisible, setCourseVisible] = useState(false);
  const letterRef = useRef<HTMLElement>(null);
  const letterSequenceStarted = useRef(false);
  const dreamRef = useRef<HTMLElement>(null);
  const storyRef = useRef<HTMLElement>(null);
  const turnRef = useRef<HTMLDivElement>(null);
  const solutionRef = useRef<HTMLDivElement>(null);
  const outcomesRef = useRef<HTMLElement>(null);
  const courseRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setHeaderScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const dream = dreamRef.current;
    if (!dream) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setDreamVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.18 });
    observer.observe(dream);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const story = storyRef.current;
    if (!story) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setStoryVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(story);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const turn = turnRef.current;
    if (!turn) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTurnVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    observer.observe(turn);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const solution = solutionRef.current;
    if (!solution) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setSolutionVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.22 });
    observer.observe(solution);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const outcomesSection = outcomesRef.current;
    if (!outcomesSection) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setOutcomesVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.18 });
    observer.observe(outcomesSection);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const courseSection = courseRef.current;
    if (!courseSection) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setCourseVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(courseSection);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setHeroReady(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const letter = letterRef.current;
    if (!letter) return;

    const timers: number[] = [];
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || letterSequenceStarted.current) return;

      letterSequenceStarted.current = true;
      setLetterStage("sealed");
      timers.push(window.setTimeout(() => setLetterStage("cracked"), 1150));
      timers.push(window.setTimeout(() => setLetterStage("opened"), 1780));
      timers.push(window.setTimeout(() => setLetterVisible(true), 2380));
      observer.disconnect();
    }, { threshold: 0.3 });
    observer.observe(letter);
    return () => {
      observer.disconnect();
      timers.forEach(window.clearTimeout);
    };
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
          <a href="#outcomes">Результат</a>
          <a href="#faq">FAQ</a>
        </nav>
        <a className="header-cta" href="#contact">Записатися <span>↗</span></a>
      </header>

      <section className={`hero-cover ${heroReady ? "is-ready" : ""}`} id="top">
        <div className="cover-image hero-portrait" aria-label="Портрет Ірини">
    <img src="/images/hero-portrait-wide.jpeg" alt="Ірина у fashion-образі" />
        </div>
        <p className="hero-brand">NEW MODEL WAY</p>
        <div className="cover-title" aria-label="Ти мріяла, уявляла, але ніхто не пояснив тобі, що робити"><span>Ти мріяла, уявляла,</span><span>але ніхто не пояснив</span><em>тобі, що робити...</em></div>
        <p className="hero-detail detail-top">Онлайн-курс для майбутніх<br />комерційних моделей</p>
        <p className="hero-detail detail-right">Старт навчання —<br />10 січня</p>
        <div className="cover-offer">
          <p className="offer-title">Як стати незалежною моделлю та почати зніматись для брендів</p>
          <p className="offer-text">Покрокова онлайн-програма, яка допоможе тобі освоїти професію моделі, створити портфоліо, знаходити бренди та отримувати перші оплачувані замовлення.</p>
          <a className="button" href="#contact">Записатися <span>→</span></a>
          <small>Ціни раннього бронювання діють до 27 листопада.</small>
        </div>
      </section>

      <section className="intro section" id="author">
        <article ref={letterRef} className={`letter-paper letter-${letterStage} ${letterVisible ? "is-visible" : ""}`}>
          <div className="letter-envelope" aria-hidden="true">
            <div className="envelope-address">
              <span>Для тебе</span>
              <small>особисте послання</small>
            </div>
            <div className="envelope-flap envelope-flap-left" />
            <div className="envelope-flap envelope-flap-right" />
            <div className="envelope-top" />
            <img className="envelope-seal envelope-seal-whole" src="/images/wax-seal-whole.jpeg" alt="" />
            <img className="envelope-seal envelope-seal-broken" src="/images/wax-seal-broken.jpeg" alt="" />
          </div>
          <div className="section-label">01 / Лист від Ірини</div>
          <div className="letter-content">
            <div className="letter-opening">
              <p>Привіт!</p>
              <span>Особисте послання від Ірини</span>
            </div>
            <div className="letter-copy">
              <LetterText startDelay={0.65}>Якщо ти відкрила цю сторінку, швидше за все, щось із цього про тебе правда: ти давно хочеш спробувати себе в моделінгу, але не знаєш, з чого почати; тобі набридла робота, яку ти не любиш, і залежність від чужих грошей; ти боїшся камери і думки «а що скажуть».</LetterText>
              <LetterText startDelay={3.5}>Якщо хоч одне про тебе, читай далі. Я розкажу, що зробила я. І що можеш зробити ти. Не відкладай: нижче ти побачиш, чому.</LetterText>
              <div className="letter-signoff">
                <img src="/images/iryna-letter.jpg" alt="Ірина" />
                <p className="signature">Ірина</p>
              </div>
            </div>
          </div>
        </article>
      </section>

      <section ref={dreamRef} className={`statement section ${dreamVisible ? "is-visible" : ""}`}>
        <div className="dream-topline">
          <p className="eyebrow">02 / Твоя нова реальність</p>
          <span>CALL SHEET · NEW MODEL WAY</span>
        </div>

        <div className="dream-heading">
          <h2>Можливо, ти теж<br /><em>про це мрієш?</em></h2>
          <p>Не колись. Не після дозволу. А в твоєму наступному робочому дні.</p>
        </div>

        <div className="dream-editorial">
          <article className="dream-story-card">
            <span className="dream-card-number">01</span>
            <p className="dream-intro">Уяви, що замість звичайного робочого дня на тебе чекає <em>рекламна зйомка...</em></p>
            <p className="dream-scene">Фотограф, стиліст, команда бренду. Сьогодні реклама косметики, завтра одягу, через тиждень ти обличчя нової кампанії.</p>
          </article>

          <div className="dream-contact-sheet" aria-label="Типи рекламних зйомок">
            <figure className="dream-shot dream-shot-main">
              <img src="/images/dream-feature.jpg" alt="Портретна beauty-зйомка Ірини" />
              <figcaption><b>01</b> Beauty / Campaign</figcaption>
            </figure>
            <figure className="dream-shot dream-shot-top">
              <img src="/images/hero-fashion-2.jpg" alt="Fashion-зйомка Ірини" />
              <figcaption>02 / Fashion</figcaption>
            </figure>
            <figure className="dream-shot dream-shot-bottom">
              <img src="/images/hero-fashion-3.jpg" alt="Lifestyle-зйомка Ірини" />
              <figcaption>03 / Lifestyle</figcaption>
            </figure>
            <span className="dream-stamp">ON SET<br />09:00—18:00</span>
          </div>

          <aside className="dream-outcome">
            <p className="dream-paid">І за це<br />тобі платять.</p>
            <p className="dream-note">Для цього не потрібні школа моделей, контракт з агентством чи ідеальні параметри. <b>Потрібен план.</b></p>
          </aside>
        </div>
      </section>

      <section className="barriers section" id="barriers">
        <p className="eyebrow">03 / Чесна розмова</p>
        <div className="barriers-heading">
          <h2>Чому ти досі<br />не почала. <em>Чесно.</em></h2>
          <p>Обери картку — і дозволь сумніву відповісти тобі по-новому.</p>
        </div>
        <div className="barrier-deck" aria-label="Сумніви й відповіді">
          {barriers.map(([doubt, answer], index) => (
            <article className="barrier-card" key={doubt}>
              <div className="barrier-card-inner">
                <div className="barrier-card-front">
                  <span className="barrier-number">0{index + 1}</span>
                  <span className="barrier-rays" aria-hidden="true">✦</span>
                  <h3>{doubt}</h3>
                  <small>Наведи, щоб побачити відповідь</small>
                </div>
                <div className="barrier-card-back">
                  <span className="barrier-number">відповідь</span>
                  <p>{answer}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="barriers-conclusion">
          <p>Насправді тобі не потрібно чекати, поки зникнуть усі сумніви.</p>
          <strong>Тобі потрібен зрозумілий план дій.</strong>
        </div>
      </section>

      <section ref={storyRef} className={`iryna-story section ${storyVisible ? "is-visible" : ""}`}>
        <div className="story-topline">
          <p className="eyebrow">05 / Історія Ірини</p>
          <p>Від банківського столу — до кадру</p>
        </div>

        <div className="story-intro">
          <figure className="story-portrait">
            <img src="/images/hero-fashion-1.jpg" alt="Ірина на студійній зйомці" />
            <figcaption>Ірина / commercial model</figcaption>
          </figure>
          <div className="story-greeting">
            <p className="story-index">01 — ОСОБИСТА ІСТОРІЯ</p>
            <h2>Я Ірина — <em>незалежна модель,</em> яка ніколи не вчилася в школі моделей.</h2>
            <div className="story-model-mark" aria-hidden="true">
              <span className="story-model-mark-line" />
              <span className="story-model-mark-word">NMW</span>
              <span className="story-model-mark-caption">NEW MODEL WAY</span>
            </div>
          </div>
        </div>

        <div className="story-pages">
          <article>
            <span>01 / ДО</span>
            <p>Три роки тому я сиділа в банку від дзвінка до дзвінка. «День бабака» і зарплата, якої вистачало лише на базове. Я мріяла про зйомки, але світ моди здавався недосяжним.</p>
          </article>
          <article>
            <span>02 / СУМНІВИ</span>
            <p>Зріст 170. Параметри далекі від 90-60-90. Жодного знайомого в моделінгу, жодного уроку в школі моделей. Я не пройшла кастинг у проект «Модель по-українськи».</p>
          </article>
          <article>
            <span>03 / НЕ ІДЕАЛЬНА</span>
            <p>Я думала, що без агентства й дорогих фотосесій шансів нема. Це виявилося неправдою. Комерційному ринку не потрібні холодні манекени. Йому потрібні живі, впевнені дівчата, які вміють позувати й красиво показати продукт.</p>
          </article>
        </div>

        <div ref={turnRef} className={`story-turn ${turnVisible ? "is-visible" : ""}`}>
          <div className="story-turn-copy">
            <p className="eyebrow">Поворотний момент</p>
            <h3><span>Тож я просто написала</span><span>в Instagram: <em>«Я модель».</em></span></h3>
            <p>Робила фотосесії, відео, відмічала бренди. І бренди почали писати мені самі.</p>
          </div>
          <div className="story-milestones" aria-label="Ключові результати Ірини">
            <article><strong>01</strong><span>тиждень</span><p>у мене була перша оплачена зйомка</p></article>
            <article><strong>6–7</strong><span>зйомок</span><p>за перший місяць</p></article>
            <article><strong>3</strong><span>роки</span><p>я знялася для українських та міжнародних брендів: [додати назви брендів]</p></article>
          </div>
        </div>

        <div className="story-afterword">
          <p><span className="afterword-text">Коли підписниці почали питати «як повторити?», я провела анкету. Виявилося, що дівчат зупиняють не гроші й не параметри, а три речі: не знають, з чого почати, бояться камери і бояться осуду.</span><span className="afterword-mark" aria-hidden="true">01</span></p>
          <p><span className="afterword-text">Тому я зробила New Model Way. Без обіцянок «мільйонів за тиждень». Тільки інструменти, які працюють у реальній індустрії, і чіткі кроки.</span><span className="afterword-mark" aria-hidden="true">02</span></p>
        </div>

        <div ref={solutionRef} className={`story-solution-wrap ${solutionVisible ? "is-visible" : ""}`}>
          <div className="story-solution">
          <figure className="solution-photo">
            <span className="solution-photo-index" aria-hidden="true">01 / EDITORIAL FRAME</span>
            <img src="/images/iryna-solution.jpg" alt="Ірина під час студійної fashion-зйомки" />
            <span className="solution-glint" aria-hidden="true" />
            <figcaption>NEW MODEL WAY / ТВОЯ СИСТЕМА</figcaption>
          </figure>
          <div className="solution-copy">
            <span className="solution-axis" aria-hidden="true">01 — 04</span>
            <p className="eyebrow">Рішення — курс New Model Way</p>
            <h3>Не набір порад.<br /><em>Послідовна система дій.</em></h3>
            <p>Це практична онлайн-програма, у якій я проведу тебе від новачка до професії комерційної моделі. Ти навчишся не лише позувати, а й розуміти модельний ринок, знаходити замовників, презентувати себе брендам, домовлятися про оплату та перетворювати зйомки на джерело доходу.</p>
            <ul className="solution-pillars" aria-label="Складові курсу">
              <li>Навчання</li><li>Практика</li><li>Портфоліо</li><li>Клієнти</li>
            </ul>
            <a className="button" href="#contact">Записатися <span>→</span></a>
          </div>
          </div>
        </div>
      </section>

      <section ref={outcomesRef} className={`outcomes section ${outcomesVisible ? "is-visible" : ""}`} id="outcomes">
        <div className="outcomes-heading">
          <p className="eyebrow">06 / Результат навчання</p>
          <h2>Після навчання ти знатимеш, <em>як:</em></h2>
          <p>Не просто дивитися уроки — а впевнено працювати в кадрі, знаходити бренди та будувати професію моделі.</p>
        </div>
        <div className="outcomes-layout">
          <ol className="outcomes-list">
            {outcomes.map((outcome, index) => <li key={outcome}><span>0{index + 1}</span>{outcome}</li>)}
          </ol>
          <div className="outcomes-gallery" aria-label="Результати навчання у кадрі">
            {outcomePhotos.map(([, caption], index) => (
              <figure key={caption} className={`outcome-photo outcome-photo-${index + 1}`}>
                <figcaption>{caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section ref={courseRef} className={`course-frames section ${courseVisible ? "is-visible" : ""}`} id="program">
        <div className="course-film-grain" aria-hidden="true" />
        <header className="course-frames-heading">
          <p className="eyebrow">Курс New Model Way</p>
          <h2>6 кадрів <em>до професії.</em></h2>
          <p>Кожен модуль змінює не лише навички — а й те, як ти бачиш себе в кадрі.</p>
        </header>

        <div className="course-frames-list">
          {courseModules.map((module, index) => (
            <article className={`course-frame ${index % 2 ? "is-reversed" : ""} ${index === courseModules.length - 1 ? "is-final" : ""}`} key={module.title}>
              <div className="course-frame-visual" aria-hidden="true">
                <span className="course-frame-number">0{index + 1}</span>
                <span className="course-frame-corner corner-a" />
                <span className="course-frame-corner corner-b" />
                <span className="course-frame-shine" />
                <small>NEW MODEL WAY<br />EDITORIAL FRAME</small>
              </div>
              <div className="course-frame-copy">
                <div className="course-frame-meta"><span>Модуль 0{index + 1}</span><span>кадр змін</span></div>
                <h3>{module.title}</h3>
                <div className="course-frame-shift">
                  <section className="course-frame-before"><p>До</p><span>{module.before}</span></section>
                  <div className="course-frame-arrow" aria-hidden="true">→</div>
                  <section className="course-frame-after"><p>Після</p><span>{module.after}</span></section>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="course-frames-finale">
          <p>Твоя система приводить клієнтів,<br /><em>поки ти будуєш кар’єру.</em></p>
          <a className="button" href="#rates">Обрати тариф <span>→</span></a>
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

      <section className="closing section" id="rates">
        <span id="contact" aria-hidden="true" />
        <p className="eyebrow">New Model Way / 2027</p>
        <h2>Почни свій<br /><em>шлях.</em></h2>
        <p>Твоя професія може початися з одного рішення.</p>
        <a className="button" href="#contact">Записатися →</a>
      </section>

      <footer>© 2026 NEW MODEL WAY <span>·</span> Політика конфіденційності <span>·</span> Публічна оферта</footer>
    </main>
  );
}
