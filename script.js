const menuBtn = document.getElementById("menuBtn");
const mainNav = document.getElementById("mainNav");

if (menuBtn && mainNav) {
    menuBtn.addEventListener("click", () => {
        const isOpen = mainNav.classList.toggle("is-open");
        menuBtn.setAttribute("aria-expanded", String(isOpen));
        menuBtn.innerHTML = isOpen
            ? '<i class="fas fa-xmark"></i>'
            : '<i class="fas fa-bars"></i>';
    });

    mainNav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            if (mainNav.classList.contains("is-open")) {
                mainNav.classList.remove("is-open");
                menuBtn.setAttribute("aria-expanded", "false");
                menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
}

const growthForm = document.getElementById("growthForm");
const leadInput = document.getElementById("leadInput");
const formFeedback = document.getElementById("formFeedback");
const growthResult = document.getElementById("growthResult");
const resultValue = document.getElementById("resultValue");

const isValidRuc = (value) => /^\d{11}$/.test(value);
const isValidUrl = (value) => {
    try {
        const parsed = new URL(value.startsWith("http") ? value : `https://${value}`);
        return parsed.hostname.includes(".");
    } catch {
        return false;
    }
};

if (growthForm && leadInput && formFeedback && growthResult && resultValue) {
    growthForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const rawValue = leadInput.value.trim();

        if (!rawValue) {
            formFeedback.textContent = "Ingresa una URL o un RUC para continuar.";
            growthResult.hidden = true;
            return;
        }

        if (!isValidRuc(rawValue) && !isValidUrl(rawValue)) {
            formFeedback.textContent = "Dato no valido. Usa un RUC de 11 digitos o una URL valida.";
            growthResult.hidden = true;
            return;
        }

        formFeedback.textContent = "";

        const growth = (Math.random() * (28 - 12) + 12).toFixed(1);
        resultValue.textContent = `${growth}%`;
        growthResult.hidden = false;
    });
}
