// Modo oscuro con localStorage
const body = document.body;
const btnTheme = document.getElementById("btn-theme");
const themeIcon = document.getElementById("theme-icon");

// Cargar tema guardado
const storedTheme = localStorage.getItem("pulonio-theme");
if (storedTheme === "dark") {
  body.classList.add("dark");
  if (themeIcon) themeIcon.textContent = "light_mode";
}

// Toggle de tema
if (btnTheme) {
  btnTheme.addEventListener("click", () => {
    body.classList.toggle("dark");
    const isDark = body.classList.contains("dark");
    localStorage.setItem("pulonio-theme", isDark ? "dark" : "light");
    if (themeIcon) {
      themeIcon.textContent = isDark ? "light_mode" : "dark_mode";
    }
  });
}

// Menú responsive
const btnMenu = document.getElementById("btn-menu");
const navLinks = document.getElementById("nav-links");

if (btnMenu && navLinks) {
  btnMenu.addEventListener("click", () => {
    navLinks.classList.toggle("nav__links--open");
  });

  // Cerrar menú al hacer click en un enlace
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("nav__links--open");
    });
  });
}

// Scroll suave para nav (por si el navegador no lo usa por defecto)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (targetId && targetId.startsWith("#")) {
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  });
});

// Acordeón FAQ
const faqItems = document.querySelectorAll(".faq__item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq__question");
  question.addEventListener("click", () => {
    // Cerrar otros
    faqItems.forEach((itm) => {
      if (itm !== item) {
        itm.classList.remove("faq__item--open");
      }
    });
    // Toggle actual
    item.classList.toggle("faq__item--open");
  });
});

// Formulario simulado
const form = document.getElementById("form-contacto");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = form.nombre.value.trim();
    const email = form.email.value.trim();

    if (!nombre || !email) {
      alert("Por favor, completa tu nombre y correo.");
      return;
    }

    alert(
      `¡Gracias, ${nombre}! Tu suscripción (simulada) a Pulonio ha sido registrada.`
    );

    form.reset();
  });
}
