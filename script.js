const header = document.querySelector("[data-site-header]");
const year = document.querySelector("[data-year]");
const form = document.querySelector("#pilot-form");
const formNote = document.querySelector("[data-form-note]");

document.documentElement.classList.add("js-enhanced");

if (year) {
  year.textContent = new Date().getFullYear();
}

const updateHeader = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 24);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

if (form && formNote) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const subject = "CHARM Band pilot interest";
    const body = Array.from(data.entries())
      .filter(([, value]) => String(value).trim())
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");

    window.location.href = `mailto:hello@charm.band?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    formNote.textContent = "Your email app should open with the pilot request details filled in.";
  });
}
