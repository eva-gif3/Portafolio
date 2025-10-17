document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const confirmacio = document.getElementById("form-status");
  const camps = ["nom", "email", "telefon", "data", "missatge"];

  camps.forEach((camp) => {
    const input = form.elements[camp];
    if (!input) return;

    const eventType = camp === "data" ? "change" : "input";

    input.addEventListener(eventType, () => {
      validarCamp(camp);
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;
    let primerError = null;

    for (const camp of camps) {
      const campValid = validarCamp(camp);
      if (!campValid) {
        valid = false;
        if (!primerError) {
          primerError = form.elements[camp];
        }
      }
    }

    if (valid) {
      confirmacio.textContent = "Formulari enviat correctament!";
      form.reset();

      window.location.href = "gracies.html"; // Aquesta línia fa la redirecció

      // Netejar aria-invalid per a tots els camps
      camps.forEach(c => {
        form.elements[c].setAttribute("aria-invalid", "false");
      });

      // Focus al primer camp (opcional) després de reset
      form.elements["nom"].focus();
    } else {
      confirmacio.textContent = "";
      // Posar focus al primer camp amb error
      if (primerError) primerError.focus();
    }
  });

  function validarCamp(camp) {
    const input = form.elements[camp];
    const valor = input.value.trim();
    let msg = "";

    switch (camp) {
      case "nom":
        if (!/^[A-Za-zÀ-ÿ'\-\s]+$/.test(valor)) {
          msg = "El nom només pot contenir lletres, espais i accents.";
        }
        break;

      case "email":
        if (!/^[^@]+@[^@]+\.[a-z]{2,}$/.test(valor)) {
          msg = "Introdueix un correu electrònic vàlid.";
        }
        break;

      case "telefon":
        if (!/^\d{9}$/.test(valor)) {
          msg = "El telèfon ha de tenir 9 xifres.";
        }
        break;

      case "data":
        const avui = new Date().toISOString().split("T")[0];
        if (valor < avui) {
          msg = "La data no pot ser anterior a avui.";
        }
        break;

      case "missatge":
        if (valor.length < 20) {
          msg = "El missatge ha de tenir com a mínim 20 caràcters.";
        }
        break;
    }

    if (msg) {
      showError(camp, msg);
      input.setAttribute("aria-invalid", "true");
      return false;
    } else {
      clearError(camp);
      input.setAttribute("aria-invalid", "false");
      return true;
    }
  }

  function showError(id, msg) {
    const error = document.getElementById(`error-${id}`);
    if (error) error.textContent = msg;
  }

  function clearError(id) {
    const error = document.getElementById(`error-${id}`);
    if (error) error.textContent = "";
  }
});

// Et porta a la pàgina web de la botiga quan toques el botó "veure botiga"
document.getElementById("cta").addEventListener("click", function () {
  window.location.href = "https://naturasi.bio/ca/botigues-naturasi/";
});

