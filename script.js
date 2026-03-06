const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function prefersReducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

function setYear() {
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
}

function initTheme() {
  const key = "theme";
  const btn = $("#themeToggle");
  const root = document.documentElement;

  const apply = (theme) => {
    if (theme === "light") root.setAttribute("data-theme", "light");
    else root.removeAttribute("data-theme");

    btn?.setAttribute("aria-pressed", theme === "light" ? "true" : "false");
  };

  const stored = localStorage.getItem(key);
  if (stored === "light" || stored === "dark") apply(stored);

  btn?.addEventListener("click", () => {
    const isLight = root.getAttribute("data-theme") === "light";
    const next = isLight ? "dark" : "light";
    apply(next);
    localStorage.setItem(key, next);
  });
}

function initReveal() {
  const items = $$("[data-reveal]");
  if (!items.length) return;

  if (prefersReducedMotion()) {
    for (const el of items) el.classList.add("is-in");
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add("is-in");
        io.unobserve(e.target);
      }
    },
    { threshold: 0.18 }
  );

  for (const el of items) io.observe(el);
}

function initTilt() {
  if (prefersReducedMotion()) return;
  const cards = $$("[data-tilt]");
  if (!cards.length) return;

  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

  for (const el of cards) {
    let raf = 0;

    const onMove = (ev) => {
      const rect = el.getBoundingClientRect();
      const px = clamp((ev.clientX - rect.left) / rect.width, 0, 1);
      const py = clamp((ev.clientY - rect.top) / rect.height, 0, 1);

      const rx = (py - 0.5) * -8;
      const ry = (px - 0.5) * 10;

      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--mx", `${(px * 100).toFixed(2)}%`);
        el.style.setProperty("--my", `${(py * 100).toFixed(2)}%`);
        el.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(
          2
        )}deg) translateY(-1px)`;
        el.classList.add("is-hover");
      });
    };

    const onLeave = () => {
      cancelAnimationFrame(raf);
      el.style.transform = "";
      el.classList.remove("is-hover");
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("blur", onLeave);
  }
}

function initExternalLinkSafety() {
  // Ensure any target=_blank links are safe (noreferrer/noopener).
  for (const a of $$('a[target="_blank"]')) {
    const rel = new Set((a.getAttribute("rel") ?? "").split(/\s+/).filter(Boolean));
    rel.add("noreferrer");
    rel.add("noopener");
    a.setAttribute("rel", Array.from(rel).join(" "));
  }
}

function initQuoteRotator() {
  const textEl = $("#quoteText");
  const fromEl = $("#quoteFrom");
  const tagEl = $("#quoteTag");
  if (!textEl || !fromEl || !tagEl) return;

  const quotes = [
    {
      text: "Courage is resistance to fear, mastery of fear—not absence of fear.",
      from: "Mark Twain, Roughing It",
      tag: "courage",
    },
    {
      text: "There could have been no two hearts so open, no tastes so similar, no feelings so in unison.",
      from: "Jane Austen, Persuasion",
      tag: "tenderness",
    },
    {
      text: "The world breaks everyone, and afterward, some are strong at the broken places.",
      from: "Ernest Hemingway, A Farewell to Arms",
      tag: "resilience",
    },
    {
      text: "It is never too late to be what you might have been.",
      from: "George Eliot",
      tag: "fresh start",
    },
    {
      text: "Do the next kind thing that is small enough to finish.",
      from: "A small note",
      tag: "gentleness",
    },
    {
      text: "Reduce the problem until it becomes a sentence you can answer.",
      from: "A small note",
      tag: "clarity",
    },
    {
      text: "Sometimes the smallest stubborn goodness is what saves the day.",
      from: "Inspired by modern comfort stories (paraphrased)",
      tag: "hope",
    },
    {
      text: "People are complicated; patience often reveals the softer truth.",
      from: "Inspired by modern novels (paraphrased)",
      tag: "patience",
    },
  ];

  if (prefersReducedMotion()) {
    const q = quotes[0];
    textEl.textContent = q.text;
    fromEl.textContent = q.from;
    tagEl.textContent = q.tag;
    return;
  }

  let i = 0;
  const paint = () => {
    const q = quotes[i % quotes.length];
    textEl.textContent = q.text;
    fromEl.textContent = q.from;
    tagEl.textContent = q.tag;
    i += 1;
  };

  paint();
  window.setInterval(paint, 6500);
}

setYear();
initTheme();
initReveal();
initTilt();
initExternalLinkSafety();
initQuoteRotator();

