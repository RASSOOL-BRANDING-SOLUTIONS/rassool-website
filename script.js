const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".navigation");

menuButton.addEventListener("click", () => {
  navigation.classList.toggle("navigation-open");
});
// Services carousel

const carouselTrack = document.querySelector(".carousel-track");
const carouselCards = document.querySelectorAll(
    ".carousel-track .service-card"
);
const previousButton = document.querySelector(
    ".carousel-button.previous"
);
const nextButton = document.querySelector(
    ".carousel-button.next"
);

let currentSlide = 0;

function getVisibleCards() {
    if (window.innerWidth <= 768) {
        return 1;
    }

    return 3;
}

function updateCarousel() {
    const cardWidth = carouselCards[0].getBoundingClientRect().width;
    const trackStyles = window.getComputedStyle(carouselTrack);
    const gap = parseFloat(trackStyles.gap) || 0;

    const distance = currentSlide * (cardWidth + gap);

    carouselTrack.style.transform =
        `translateX(-${distance}px)`;

    previousButton.disabled = currentSlide === 0;

    nextButton.disabled =
        currentSlide >= carouselCards.length - getVisibleCards();
}

nextButton.addEventListener("click", function () {
    const maximumSlide =
        carouselCards.length - getVisibleCards();

    if (currentSlide < maximumSlide) {
        currentSlide++;
        updateCarousel();
    }
});

previousButton.addEventListener("click", function () {
    if (currentSlide > 0) {
        currentSlide--;
        updateCarousel();
    }
});

window.addEventListener("resize", function () {
    const maximumSlide =
        carouselCards.length - getVisibleCards();

    if (currentSlide > maximumSlide) {
        currentSlide = maximumSlide;
    }

    updateCarousel();
});

updateCarousel();
const aboutSlides = document.querySelectorAll(".about-slide");
const aboutDots = document.querySelectorAll(".about-dot");

if (aboutSlides.length > 0) {
    let aboutSlideIndex = 0;

    function showAboutSlide(index) {
        aboutSlides.forEach((slide) => {
            slide.classList.remove("active");
        });

        aboutDots.forEach((dot) => {
            dot.classList.remove("active");
        });

        aboutSlides[index].classList.add("active");
        aboutDots[index].classList.add("active");

        aboutSlideIndex = index;
    }

    aboutDots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            showAboutSlide(index);
        });
    });

    setInterval(() => {
        const nextSlide =
            (aboutSlideIndex + 1) % aboutSlides.length;

        showAboutSlide(nextSlide);
    }, 4000);
}
// CONTACT FORM TO WHATSAPP
(() => {
    const projectForm = document.getElementById("projectForm");

    if (!projectForm) {
        return;
    }

    projectForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const clientName =
            document.getElementById("clientName").value.trim();

        const businessName =
            document.getElementById("businessName").value.trim();

        const phoneNumber =
            document.getElementById("phoneNumber").value.trim();

        const clientCity =
            document.getElementById("clientCity").value.trim();

        const serviceRequired =
            document.getElementById("serviceRequired").value;

        const projectDetails =
            document.getElementById("projectDetails").value.trim();

        const message =
`Hello Rassool Branding Solutions,

I would like to enquire about your services.

Name: ${clientName}
Business: ${businessName || "Not provided"}
Phone number: ${phoneNumber}
Location: ${clientCity || "Not provided"}
Service required: ${serviceRequired}

Project details:
${projectDetails}`;

        const rassoolWhatsAppNumber = "27619167193";

        const whatsappLink =
            `https://wa.me/${rassoolWhatsAppNumber}?text=${encodeURIComponent(message)}`;

        window.open(whatsappLink, "_blank");
    });
})();
// COOKIE CONSENT BANNER
(() => {
    const consentKey = "rassool-cookie-consent";

    if (localStorage.getItem(consentKey)) return;

    const banner = document.createElement("section");
    banner.className = "cookie-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-label", "Cookie preferences");

    banner.innerHTML = `
        <div class="cookie-banner-content">
            <div>
                <h2>We value your privacy</h2>
                <p>
                    We use essential cookies to remember your preferences
                    and help our website work properly.
                </p>
            </div>

            <div class="cookie-banner-buttons">
                <button id="rejectCookies" type="button">Reject</button>
                <button id="acceptCookies" type="button">Accept</button>
            </div>
        </div>
    `;

    document.body.appendChild(banner);

    document.getElementById("acceptCookies").addEventListener("click", () => {
        localStorage.setItem(consentKey, "accepted");
        banner.remove();
    });

    document.getElementById("rejectCookies").addEventListener("click", () => {
        localStorage.setItem(consentKey, "rejected");
        banner.remove();
    });
})();