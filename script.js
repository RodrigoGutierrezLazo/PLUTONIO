// Modo oscuro con localStorage
const body = document.body;
const btnTheme = document.getElementById("btn-theme");
const themeIcon = document.getElementById("theme-icon");

// Cargar tema guardado
const storedTheme = localStorage.getItem("plutonio-theme");
if (storedTheme === "dark") {
  body.classList.add("dark");
  if (themeIcon) themeIcon.textContent = "light_mode";
}

// Toggle de tema
if (btnTheme) {
  btnTheme.addEventListener("click", () => {
    body.classList.toggle("dark");
    const isDark = body.classList.contains("dark");
    localStorage.setItem("plutonio-theme", isDark ? "dark" : "light");
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

// Formulario -> generar mensaje para WhatsApp
const form = document.getElementById("form-contacto");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = form.nombre.value.trim();
    const email = form.email.value.trim();
    const mensajeExtra = form.mensaje.value.trim();

    if (!nombre || !email) {
      alert("Por favor, completa tu nombre y correo.");
      return;
    }

    let mensaje = `Hola, soy ${nombre} y estoy viendo la página de PLUTONIO.\n`;
    mensaje += `Mi correo es: ${email}.\n`;
    mensaje += `Me gustaría recibir más información sobre la bebida para fiebre y tos.`;

    if (mensajeExtra) {
      mensaje += `\n\nMensaje adicional:\n${mensajeExtra}`;
    }

    const encoded = encodeURIComponent(mensaje);

    // Número en formato internacional para Perú: +51 949 287 245
    const whatsappUrl = `https://wa.me/51949287245?text=${encoded}`;

    window.open(whatsappUrl, "_blank");

    alert("Se ha generado tu mensaje para WhatsApp. Se abrirá una nueva pestaña.");
    form.reset();
  });
}
