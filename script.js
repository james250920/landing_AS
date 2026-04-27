const menuBtn = document.getElementById("menuBtn");
const mainNav = document.getElementById("mainNav");
const siteHeader = document.querySelector(".site-header");
const hero = document.querySelector(".hero");
const heroVisual = document.querySelector(".hero-visual");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

if (siteHeader) {
    const toggleHeaderState = () => {
        siteHeader.classList.toggle("is-scrolled", window.scrollY > 8);
    };

    toggleHeaderState();
    window.addEventListener("scroll", toggleHeaderState, { passive: true });
}

const revealGroups = [
    [".hero-copy", ".hero-visual"],
    [".hero-showcase-head"],
    [".service-chip"],
    [".section-head"],
    [".why-card"],
    [".feature-card"],
    [".cta-band-wrap"],
    [".contact-wrap"],
    [".footer-wrap", ".footer-bottom"]
];

revealGroups.forEach((selectors) => {
    const elements = document.querySelectorAll(selectors.join(","));
    elements.forEach((element, index) => {
        element.setAttribute("data-reveal", "");
        element.style.setProperty("--reveal-delay", `${Math.min(index * 95, 520)}ms`);
    });
});

const revealItems = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.1,
            rootMargin: "0px 0px -4% 0px"
        }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
} else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
}

if (hero && heroVisual && !prefersReducedMotion) {
    const handleParallax = (event) => {
        const rect = hero.getBoundingClientRect();
        const xRatio = (event.clientX - rect.left) / rect.width - 0.5;
        const yRatio = (event.clientY - rect.top) / rect.height - 0.5;
        const moveX = xRatio * 18;
        const moveY = yRatio * 12;

        heroVisual.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    };

    const resetParallax = () => {
        heroVisual.style.transform = "translate3d(0, 0, 0)";
    };

    hero.addEventListener("mousemove", handleParallax);
    hero.addEventListener("mouseleave", resetParallax);
}
