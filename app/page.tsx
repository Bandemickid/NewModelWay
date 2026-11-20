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

const promotionDeadline = new Date("2026-11-27T23:59:59+02:00").getTime();

const pricingPlans = [
  {
    name: "MODEL START",
    label: "Самостійне навчання",
    current: "9 900 грн",
    full: "14 900 грн",
    saving: "5 000 грн",
    seats: "Без обмежень",
    cta: "ОПЛАТИТИ START",
    features: ["1–5", "—", "—", "—", "—", "—"],
  },
  {
    name: "NEW MODEL PRO",
    label: "Повна програма з підтримкою",
    current: "14 900 грн",
    full: "19 900 грн",
    saving: "5 000 грн",
    seats: "100",
    cta: "ОПЛАТИТИ PRO",
    recommended: true,
    features: ["Усі 6", "✓", "✓", "✓", "—", "—"],
  },
  {
    name: "VIP MODEL WAY",
    label: "Максимум персональної уваги",
    current: "39 900 грн",
    full: "49 900 грн",
    saving: "10 000 грн",
    seats: "10",
    cta: "ОПЛАТИТИ VIP",
    features: ["Усі 6", "✓", "✓", "✓", "✓", "✓"],
  },
];

const priceFeatures = [
  "Модулі",
  "Перевірка завдань Іриною",
  "Загальний чат",
  "Випускний, зйомка, сертифікат",
  "Особистий чат з Іриною",
  "Розбір портфоліо, Instagram і модельної пропозиції",
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
      {children.split(/(\s+)/).map((word, wordIndex, words) => {
        if (/^\s+$/.test(word)) return word;
        const offset = words.slice(0, wordIndex).join("").length;
        return (
          <span className="letter-word" key={wordIndex}>
            {Array.from(word).map((character, index) => (
              <span key={index} className="letter-character" style={{ animationDelay: `${startDelay + (offset + index) * 0.008}s` }}>
                {character}
              </span>
            ))}
          </span>
        );
      })}
    </p>
  );
}

export default function Home() {
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [heroReady, setHeroReady] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const [footerVisible, setFooterVisible] = useState(false);
  const [letterVisible, setLetterVisible] = useState(false);
  const [letterStage, setLetterStage] = useState<LetterStage>("waiting");
  const [dreamVisible, setDreamVisible] = useState(false);
  const [barriersVisible, setBarriersVisible] = useState(false);
  const [storyVisible, setStoryVisible] = useState(false);
  const [turnVisible, setTurnVisible] = useState(false);
  const [solutionVisible, setSolutionVisible] = useState(false);
  const [courseVisible, setCourseVisible] = useState(false);
  const [audienceVisible, setAudienceVisible] = useState(false);
  const [learningVisible, setLearningVisible] = useState(false);
  const [graduationVisible, setGraduationVisible] = useState(false);
  const [pricingVisible, setPricingVisible] = useState(false);
  const [finalCallVisible, setFinalCallVisible] = useState(false);
  // Keep the first server and browser render identical. The real countdown starts
  // immediately after hydration in the effect below.
  const [timeLeft, setTimeLeft] = useState(0);
  const letterRef = useRef<HTMLElement>(null);
  const letterSequenceStarted = useRef(false);
  const dreamRef = useRef<HTMLElement>(null);
  const barriersRef = useRef<HTMLElement>(null);
  const storyRef = useRef<HTMLElement>(null);
  const turnRef = useRef<HTMLDivElement>(null);
  const solutionRef = useRef<HTMLDivElement>(null);
  const courseRef = useRef<HTMLElement>(null);
  const audienceRef = useRef<HTMLElement>(null);
  const learningRef = useRef<HTMLElement>(null);
  const graduationRef = useRef<HTMLElement>(null);
  const pricingRef = useRef<HTMLElement>(null);
  const pricingTrackRef = useRef<HTMLDivElement>(null);
  const finalCallRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const observer = new IntersectionObserver(([entry]) => {
      setPastHero(!entry.isIntersecting && entry.boundingClientRect.bottom <= 0);
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const update = () => {
      const bounds = footer.getBoundingClientRect();
      setFooterVisible(bounds.top < window.innerHeight && bounds.bottom > 0);
    };
    const observer = new IntersectionObserver(update);
    observer.observe(footer);
    update();
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const track = pricingTrackRef.current;
    if (!track) return;

    const autoScroll = window.matchMedia("(max-width: 800px) and (prefers-reduced-motion: no-preference)");
    let timeout: number | undefined;
    let touching = false;

    const advance = () => {
      const bounds = track.getBoundingClientRect();
      const end = track.scrollWidth - track.clientWidth;
      if (!autoScroll.matches || document.hidden || touching ||
        track.contains(document.activeElement) ||
        bounds.top >= window.innerHeight || bounds.bottom <= 0 || end <= 0) {
        schedule();
        return;
      }

      const step = end / (pricingPlans.length - 1);
      const next = (Math.round(track.scrollLeft / step) + 1) % pricingPlans.length;
      track.scrollTo({ left: next * step, behavior: "smooth" });
      schedule();
    };

    function schedule() {
      window.clearTimeout(timeout);
      if (autoScroll.matches) timeout = window.setTimeout(advance, 7500);
    }

    const startTouch = () => {
      touching = true;
      window.clearTimeout(timeout);
    };

    const endTouch = () => {
      touching = false;
      schedule();
    };

    track.addEventListener("scroll", schedule, { passive: true });
    track.addEventListener("touchstart", startTouch, { passive: true });
    track.addEventListener("touchend", endTouch, { passive: true });
    track.addEventListener("touchcancel", endTouch, { passive: true });
    autoScroll.addEventListener("change", schedule);
    schedule();

    return () => {
      window.clearTimeout(timeout);
      track.removeEventListener("scroll", schedule);
      track.removeEventListener("touchstart", startTouch);
      track.removeEventListener("touchend", endTouch);
      track.removeEventListener("touchcancel", endTouch);
      autoScroll.removeEventListener("change", schedule);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setHeaderScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const graduation = graduationRef.current;
    if (!graduation) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setGraduationVisible(true);
      observer.disconnect();
    }, { threshold: 0.18 });
    const heading = window.matchMedia("(max-width: 800px)").matches
      ? graduation.querySelector(".graduation-copy h2")
      : null;
    observer.observe(heading ?? graduation);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const pricing = pricingRef.current;
    if (!pricing) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setPricingVisible(true);
      observer.disconnect();
    }, { threshold: 0.12 });
    observer.observe(pricing);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const finalCall = finalCallRef.current;
    if (!finalCall) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setFinalCallVisible(true);
      observer.disconnect();
    }, { threshold: 0.16 });
    observer.observe(finalCall);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateTimer = () => setTimeLeft(Math.max(0, promotionDeadline - Date.now()));
    updateTimer();
    const timer = window.setInterval(updateTimer, 1000);
    return () => window.clearInterval(timer);
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
    const barriersSection = barriersRef.current;
    if (!barriersSection) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setBarriersVisible(true);
      observer.disconnect();
    }, { threshold: 0.14 });
    observer.observe(barriersSection);
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
    const audience = audienceRef.current;
    if (!audience) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setAudienceVisible(true);
      observer.disconnect();
    }, { threshold: 0.18 });
    const casting = window.matchMedia("(max-width: 800px)").matches
      ? audience.querySelector(".audience-casting")
      : null;
    observer.observe(casting ?? audience);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const learning = learningRef.current;
    if (!learning) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setLearningVisible(true);
      observer.disconnect();
    }, { threshold: 0.2 });
    const heading = window.matchMedia("(max-width: 800px)").matches
      ? learning.querySelector(".learning-heading")
      : null;
    observer.observe(heading ?? learning);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const courseSection = courseRef.current;
    if (!courseSection || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const frames = Array.from(courseSection.querySelectorAll<HTMLElement>(".course-frame"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in-view");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -24px" });
    frames.forEach((frame) => observer.observe(frame));
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
          <a href="#iryna-story">Про авторку</a>
          <a href="#program">Програма</a>
          <a href="#faq">Для кого</a>
          <a href="#learning">Формат</a>
          <a href="#graduation">Випускний</a>
          <a href="#rates">Тарифи</a>
        </nav>
        <a className="header-cta" href="#rates">Обрати тариф <span>↗</span></a>
      </header>

      <section className={`hero-cover ${heroReady ? "is-ready" : ""}`} id="top" ref={heroRef}>
        <div className="cover-image hero-portrait" aria-label="Портрет Ірини">
    <img src="/images/hero-portrait-f1.jpg" alt="Ірина у fashion-образі" />
        </div>
        <p className="hero-brand">NEW MODEL WAY</p>
        <div className="cover-title" aria-label="Ти мріяла, уявляла, але ніхто не пояснив тобі, що робити"><span>Ти мріяла, уявляла,</span><span>але ніхто не пояснив</span><em>тобі, що робити...</em></div>
        <p className="hero-detail detail-top">Онлайн-курс для майбутніх<br />комерційних моделей</p>
        <p className="hero-detail detail-right">Старт навчання —<br />10 січня</p>
        <div className="cover-offer">
          <p className="offer-title">Як стати незалежною моделлю та почати зніматись для брендів</p>
          <p className="offer-text">Покрокова онлайн-програма, яка допоможе тобі освоїти професію моделі, створити портфоліо, знаходити бренди та отримувати перші оплачувані замовлення.</p>
          <a className="button" href="#rates">Записатися <span>→</span></a>
          <small>Ціни раннього бронювання діють до 27 листопада.</small>
          {timeLeft > 0 && (
            <div className="hero-price-countdown">
              <span>Ціни підвищаться через</span>
              <strong role="timer" aria-label="Дні, години, хвилини та секунди до підвищення цін">
                {[Math.floor(timeLeft / 86400000), Math.floor(timeLeft / 3600000) % 24, Math.floor(timeLeft / 60000) % 60, Math.floor(timeLeft / 1000) % 60]
                  .map((value) => String(value).padStart(2, "0"))
                  .join(" : ")}
              </strong>
              <span>дні · год · хв · сек</span>
            </div>
          )}
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
              <img src="/images/dream-beauty-backstage.jpg" alt="Підготовка макіяжу перед зйомкою" loading="lazy" />
              <figcaption><b>01</b> Beauty / Campaign</figcaption>
            </figure>
            <figure className="dream-shot dream-shot-top">
              <img src="/images/dream-fashion-backstage.jpg" alt="Ірина позує перед фотографом у студії" loading="lazy" />
              <figcaption>02 / Fashion</figcaption>
            </figure>
            <figure className="dream-shot dream-shot-bottom">
              <img src="/images/dream-lifestyle-backstage.jpg" alt="Ірина на знімальному майданчику зі студійним освітленням" loading="lazy" />
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

      <section ref={barriersRef} className={`barriers section ${barriersVisible ? "is-visible" : ""}`} id="barriers">
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
          <strong>Тобі потрібно діяти по плану!</strong>
        </div>
      </section>

      <section id="iryna-story" ref={storyRef} className={`iryna-story section ${storyVisible ? "is-visible" : ""}`}>
        <div className="story-topline">
          <p className="eyebrow">05 / Історія Ірини</p>
        </div>

        <div className="story-intro">
          <figure className="story-portrait">
            <picture>
              <source media="(max-width: 760px)" srcSet="/images/iryna-story-mobile.jpg" />
              <img src="/images/hero-fashion-1.jpg" alt="Ірина на студійній зйомці" />
            </picture>
            <figcaption>Ірина / commercial model</figcaption>
          </figure>
          <div className="story-greeting">
            <h2>Я Ірина<span className="story-desktop-copy"> — </span><em>незалежна модель<span className="story-desktop-copy">,</span></em><span className="story-desktop-copy"> яка ніколи не вчилася в школі моделей.</span></h2>
            <div className="story-model-mark" aria-hidden="true">
              <span className="story-model-mark-line" />
              <span className="story-model-mark-word">NMW</span>
              <span className="story-model-mark-caption">NEW MODEL WAY</span>
            </div>
          </div>
          <p className="story-mobile-note">Я ніколи не вчилася в школі моделей.</p>
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
            <article>
              <h4>За <b>1</b> тиждень</h4>
              <p>Отримала першу оплачувану зйомку.</p>
            </article>
            <article>
              <h4><b>6–7</b> зйомок</h4>
              <p>За перший місяць ці зйомки принесли стільки грошей, скільки я отримувала в банку за місяць роботи!</p>
            </article>
            <article>
              <h4>За <b>3</b> роки</h4>
              <p>Я співпрацювала з брендами.</p>
            </article>
          </div>
        </div>

        <section className="story-afterword" aria-labelledby="afterword-title">
          <div className="afterword-question">
            <h3 id="afterword-title">Що зупиняє <em>дівчат?</em></h3>
            <p>Коли підписниці почали питати «як повторити?», я провела анкетування. Виявилося, що дівчат зупиняють не гроші й не параметри, а три речі:</p>
            <ul className="afterword-findings">
              <li>Не знають, з чого почати</li>
              <li>Бояться камери</li>
              <li>Бояться осуду</li>
            </ul>
          </div>
          <div className="afterword-answer">
            <h3>Тому я зробила <strong>New Model Way</strong></h3>
            <p>Без обіцянок «мільйонів за тиждень». Тільки інструменти, які працюють у реальній індустрії, і чіткі кроки.</p>
          </div>
        </section>

        <div ref={solutionRef} className={`story-solution-wrap ${solutionVisible ? "is-visible" : ""}`}>
          <div className="story-solution">
          <figure className="solution-photo">
            <span className="solution-photo-index" aria-hidden="true">01 / EDITORIAL FRAME</span>
            <img src="/images/iryna-solution-sofa.jpg" alt="Ірина під час студійної fashion-зйомки" />
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
            <a className="button" href="#rates">Записатися <span>→</span></a>
          </div>
          </div>
        </div>
      </section>

      <section ref={courseRef} className={`course-frames section ${courseVisible ? "is-visible" : ""}`} id="program">
        <div className="course-film-grain" aria-hidden="true" />
        <header className="course-frames-heading">
          <p className="eyebrow">Курс New Model Way</p>
          <h2>6 кроків <em>до професії.</em></h2>
          <p>Кожен модуль змінює не лише навички — а й те, як ти бачиш себе в кадрі.</p>
        </header>

        <div className="course-frames-list">
          {courseModules.map((module, index) => (
            <article className={`course-frame ${index % 2 ? "is-reversed" : ""} ${index === courseModules.length - 1 ? "is-final" : ""}`} key={module.title}>
              <div className="course-frame-visual" aria-hidden="true">
                <span className="course-frame-number">0{index + 1}</span>
                <span className="course-frame-corner corner-a" />
                <span className="course-frame-corner corner-b" />
                  <small>NEW MODEL WAY<br />EDITORIAL FRAME</small>
              </div>
              <div className="course-frame-copy">
                <div className="course-frame-meta"><span>Модуль 0{index + 1}</span></div>
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
          <a className="button" href="#rates">Обрати тариф <span>→</span></a>
        </div>
      </section>

      <section className={`audience section ${audienceVisible ? "is-visible" : ""}`} id="faq" ref={audienceRef}>
        <div className="audience-edition" aria-hidden="true"><span>NEW MODEL WAY</span><span>CASTING ISSUE / 07</span></div>
        <div className="audience-stage">
          <figure className="audience-casting">
            {/* Replace audience-casting-board.png here when the casting collage is updated. */}
            <img src="/images/audience-casting-board.png" alt="Колаж дівчат різного типажу" />
            <figcaption><span>CASTING BOARD</span><b>У кадрі є місце<br />для тебе.</b></figcaption>
          </figure>

          <div className="audience-content">
            <p className="eyebrow">07 / ДЛЯ КОГО</p>
            <h2>New Model Way<br />для тебе, <em>якщо ти:</em></h2>
            <ol className="audience-lines">
              <li>ніколи не працювала моделлю, але хочеш спробувати;</li>
              <li>вже маєш досвід зйомок і хочеш перетворити його на стабільну професію;</li>
              <li>студентка й шукаєш додатковий заробіток;</li>
              <li>працюєш в іншій сфері й хочеш нову професію;</li>
              <li>живеш у маленькому місті чи за кордоном.</li>
            </ol>
          </div>
        </div>
        <div className="audience-verdict"><span>досвід не потрібен</span><p>Потрібно бажання вчитися й виконувати завдання.</p><i aria-hidden="true">✦</i></div>
      </section>

      <section className={`learning section ${learningVisible ? "is-visible" : ""}`} id="learning" ref={learningRef}>
        <header className="learning-heading">
          <p className="eyebrow">08 / НАВЧАННЯ ОНЛАЙН</p>
          <h2><span>Твій темп.</span><br /><em>Твій кадр.</em></h2>
          <div className="learning-intro">
            <p>Усе потрібне — в одному просторі: дивишся урок, виконуєш завдання й рухаєшся до свого результату.</p>
            <div className="learning-intro-steps" aria-label="Як проходить навчання">
              <span><b>01</b> уроки</span>
              <i aria-hidden="true">→</i>
              <span><b>02</b> практика</span>
              <i aria-hidden="true">→</i>
              <span><b>03</b> результат</span>
            </div>
          </div>
        </header>

        <div className="learning-platform">
          <aside className="learning-sidebar" aria-label="Навігація навчальною платформою">
            <p>NEW MODEL WAY</p>
            <span className="learning-profile">ІМ</span>
            <ul>
              <li className="is-active"><b>01</b> Знайомство</li>
              <li><b>02</b> Уроки</li>
              <li><b>03</b> Практика</li>
            </ul>
            <small>Твій простір<br />навчання</small>
          </aside>
          <div className="learning-screen">
            <div className="learning-screenbar"><span>ПЛАТФОРМА / МОДУЛЬ 01</span><i>● запис уроку</i></div>
            <figure className="learning-video">
              <div className="learning-video-brand" aria-label="New Model Way">
                <span>NEW</span>
                <span>MODEL</span>
                <span>WAY</span>
              </div>
              <span className="learning-video-label">NEW MODEL WAY / INTRO</span>
              <span className="learning-play" aria-hidden="true">▶</span>
              <figcaption><small>Урок 01</small><b>Починаємо свій шлях у моделінгу</b></figcaption>
            </figure>
            <div className="learning-progress"><span>Твій прогрес</span><i><b /></i><em>01 / 06</em></div>
          </div>
          <div className="learning-start">
            <p>Старт потоку</p>
            <strong>10<span>січня</span>2027</strong>
            <small>Доступ до матеріалів — 6 місяців.</small>
          </div>
        </div>

        <div className="learning-specs">
          <article><span>01</span><b>Тривалість</b><p>6 тижнів</p></article>
          <article><span>02</span><b>Формат</b><p>онлайн-відеоуроки + практичні завдання</p></article>
          <article><span>03</span><b>Темп</b><p>зручний для тебе, з будь-якого міста чи країни</p></article>
          <article><span>04</span><b>Підтримка</b><p>залежить від тарифу</p></article>
        </div>
      </section>

      <section className={`graduation section ${graduationVisible ? "is-visible" : ""}`} id="graduation" ref={graduationRef}>
        <div className="graduation-edition"><span>09 / ВИПУСКНИЙ</span><span>ХМЕЛЬНИЦЬКИЙ · 2027</span></div>
        <div className="graduation-layout">
          <div className="graduation-copy">
            <p className="eyebrow">ВИПУСКНИЙ У ХМЕЛЬНИЦЬКОМУ</p>
            <h2>Ми не просто<br /> завершимо <em>навчання.</em></h2>
            <p className="graduation-lead">Ми зустрінемося наживо.</p>
            <ul>
              <li>професійна зйомка digitals;</li>
              <li>зйомка в ефектному образі;</li>
              <li>знайомство з іншими ученицями;</li>
              <li>спілкування, нові знайомства та святкова атмосфера;</li>
              <li>вечірка в одному з кращих закладів міста.</li>
            </ul>
          </div>
          <div className="graduation-collage" aria-label="Концептуальний колаж випускного New Model Way">
            <div className="graduation-light" />
            <div className="graduation-card graduation-card-main">
              <img className="graduation-party-photo" src="/images/graduation-party.jpg" alt="Дівчата разом на вечірці" loading="lazy" />
              <span>NEW MODEL WAY</span>
              <b>GRADUATION<br /> NIGHT</b>
            </div>
            <div
              className="graduation-card graduation-card-ticket"
              onPointerMove={(event) => {
                const ticket = event.currentTarget;
                const bounds = ticket.getBoundingClientRect();
                const x = (event.clientX - bounds.left) / bounds.width - .5;
                const y = (event.clientY - bounds.top) / bounds.height - .5;
                ticket.style.setProperty("--ticket-x", `${x * 8}deg`);
                ticket.style.setProperty("--ticket-y", `${y * -8}deg`);
                ticket.style.setProperty("--glow-x", `${(x + .5) * 100}%`);
                ticket.style.setProperty("--glow-y", `${(y + .5) * 100}%`);
              }}
              onPointerLeave={(event) => {
                const ticket = event.currentTarget;
                ticket.style.removeProperty("--ticket-x");
                ticket.style.removeProperty("--ticket-y");
                ticket.style.removeProperty("--glow-x");
                ticket.style.removeProperty("--glow-y");
              }}
            ><small>ADMIT ONE</small><b>ХМЕЛЬНИЦЬКИЙ</b><i>✦</i></div>
            <div className="graduation-card graduation-card-frame"><span>digital<br />portrait</span></div>
            <p>ПЕРШИЙ ВИПУСК<br />ТВІЙ ПЕРШИЙ ВЕЛИКИЙ КАДР</p>
          </div>
        </div>
        <aside className="graduation-note"><span>ВАЖЛИВО</span><p>Участь у випускному входить у тарифи PRO та VIP. Дорогу до Хмельницького та проживання учасниці організовують і оплачують самостійно.</p></aside>
      </section>

      <section className={`pricing section ${pricingVisible ? "is-visible" : ""}`} id="rates" ref={pricingRef}>
        <header className="pricing-heading">
          <p className="eyebrow">10 / ТАРИФИ</p>
          <h2>Обери свій<br /><em>формат старту.</em></h2>
          <div className="pricing-timer" aria-label="Акція діє до 27 листопада 2026 року">
            <span>ціна до 27.11</span>
            <b>{String(Math.floor(timeLeft / 86400000)).padStart(2, "0")} : {String(Math.floor(timeLeft / 3600000) % 24).padStart(2, "0")} : {String(Math.floor(timeLeft / 60000) % 60).padStart(2, "0")} : {String(Math.floor(timeLeft / 1000) % 60).padStart(2, "0")}</b>
            <small>дні&nbsp;&nbsp;&nbsp;&nbsp;год&nbsp;&nbsp;&nbsp;&nbsp;хв&nbsp;&nbsp;&nbsp;&nbsp;сек</small>
          </div>
        </header>
        <p className="pricing-swipe-hint">Гортай, щоб порівняти тарифи <span aria-hidden="true">↔</span></p>
        <div className="pricing-grid" ref={pricingTrackRef}>
          {pricingPlans.map((plan) => (
            <article className={`price-card ${plan.recommended ? "is-recommended" : ""}`} key={plan.name}>
              {plan.recommended && <span className="price-recommended">РЕКОМЕНДОВАНИЙ</span>}
              <p className="price-name">{plan.name}{plan.recommended && <i>★</i>}</p>
              <h3>{plan.label}</h3>
              <div className="price-total"><small>Ціна до 27.11</small><b>{plan.current}</b><del>{plan.full}</del><em>Економія {plan.saving}</em></div>
              <dl>
                {priceFeatures.map((feature, index) => {
                  const value = plan.features[index];
                  const included = value === "✓";
                  const excluded = value === "—";
                  return (
                    <div key={feature}>
                      <dt>{feature}</dt>
                      <dd>
                        {included || excluded ? (
                          <span className={included ? "price-status is-included" : "price-status"} role="img" aria-label={included ? "Входить у тариф" : "Не входить у тариф"}>
                            {included ? "✓" : "×"}
                          </span>
                        ) : value}
                      </dd>
                    </div>
                  );
                })}
                <div className="price-seats"><dt>Місця</dt><dd>{plan.seats}</dd></div>
              </dl>
              <a className="price-button" href="#contact">{plan.cta} <span>→</span></a>
            </article>
          ))}
        </div>
        <p className="pricing-legal"><b>Акція:</b> до 27 листопада 2026. Після цього на сайті автоматично повні ціни: 14 900 / 19 900 / 49 900 грн.</p>
      </section>

      <section className={`final-call section ${finalCallVisible ? "is-visible" : ""}`} id="contact" ref={finalCallRef}>
        <div className="final-call-halo" aria-hidden="true" />
        <div className="final-call-stage">
          <div className="final-call-copy">
            <p className="eyebrow">12 / ОСТАННІЙ КАДР</p>
            <h2><span>Якщо закриєш</span><span>цю сторінку&nbsp;—</span><span><em>нічого не зміниться.</em></span></h2>
            <p className="final-call-body">Ось що відбудеться, якщо ти просто закриєш зараз цю сторінку: нічого. І в цьому проблема. Через рік ти будеш там, де і зараз. З тією ж роботою, тими ж «колись» і тим самим голосом «у мене не вийде».</p>
            <p className="final-call-decision">Або можеш зробити <b>перший крок сьогодні.</b></p>
          </div>
          <figure className="final-call-portrait final-call-photo">
            <img src="/images/iryna-final.jpg" alt="Ірина" />
            <span>NEW MODEL WAY<br />THE FINAL FRAME</span>
            <strong>MAKE<br />THE<br /><em>FIRST</em><br />MOVE.</strong>
            <i aria-hidden="true">✦</i>
          </figure>
        </div>

        <div className="final-call-action">
          <div className="final-call-start">
            <span>СТАРТ НАВЧАННЯ</span>
            <b>10 <small>СІЧНЯ · 2027</small></b>
            <p>Ціни раннього бронювання до 27 листопада, потім дорожче.</p>
          </div>
          <div className="final-call-timer" aria-label="Таймер ціни раннього бронювання">
            <span>ДО ЗМІНИ ЦІНИ</span>
            <b><i>{String(Math.floor(timeLeft / 86400000)).padStart(2, "0")}</i><i>{String(Math.floor(timeLeft / 3600000) % 24).padStart(2, "0")}</i><i>{String(Math.floor(timeLeft / 60000) % 60).padStart(2, "0")}</i><i>{String(Math.floor(timeLeft / 1000) % 60).padStart(2, "0")}</i></b>
            <small>дні&nbsp;&nbsp;&nbsp;&nbsp; год&nbsp;&nbsp;&nbsp;&nbsp; хв&nbsp;&nbsp;&nbsp;&nbsp; сек</small>
          </div>
          <div className="final-call-tariffs">
            <p>ОБРАТИ СВІЙ ТАРИФ</p>
            <div>
              <a href="#rates">START <span>→</span></a>
              <a href="#rates">PRO <span>→</span></a>
              <a href="#rates">VIP <span>→</span></a>
            </div>
          </div>
        </div>
        <aside className="final-call-note"><b>P.S.</b><p>У PRO лише 100 місць, у VIP лише 10. Коли вони закінчаться, нових я не додам, бо інакше не встигну перевірити кожну домашку сама. Якщо хочеш, щоб я була поруч, не чекай останнього дня.</p><em>Ірина</em></aside>
      </section>

      <footer className="site-footer" ref={footerRef}>
        <div className="footer-details">
          <div className="footer-business">
            <span className="footer-label">Реквізити</span>
            <p>ФОП Пономаренко<br />Ірина Денисівна</p>
          </div>
          <dl className="footer-bank">
            <div><dt>ЄДРПОУ/РНОКПП</dt><dd>3619800085</dd></div>
            <div className="footer-iban"><dt>IBAN</dt><dd>UA 26 300346 00000 2600 1100 0178 62</dd></div>
            <div><dt>Банк</dt><dd>Sense bank м. Київ</dd></div>
          </dl>
        </div>
        <div className="footer-bottom">
        <span>© 2026 NEW MODEL WAY</span>
        <a href="/documents/new-model-way-privacy-policy.pdf" download="Політика_конфіденційності_New_Model_Way.pdf">Політика конфіденційності</a>
        <span>·</span>
        <a href="/documents/new-model-way-public-offer.pdf" download="Договір_публічної_оферти_New_Model_Way.pdf">Публічна оферта</a>
        </div>
      </footer>
      <a className={`floating-enroll${pastHero && !footerVisible ? " is-visible" : ""}`} href="#rates">
        Записатися <span aria-hidden="true">↗</span>
      </a>
    </main>
  );
}
