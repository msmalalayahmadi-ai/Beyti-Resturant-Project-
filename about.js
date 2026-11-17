
 // ==========================================
 // 1. SELECT HTML ELEMENTS
 // ==========================================

const menuCheckbox = document.querySelector("#menu");
const navLinks = document.querySelector(".nav-links");

const newsletterForm = document.querySelector(
    "#Quick_Links form"
);

const aboutSections = document.querySelectorAll(
    "#About_Photo, #Our_Core_Values, #Our_Cooks, #Welcome_Page"
);


// ==========================================
// 2. MOBILE NAVIGATION
// ==========================================

if (menuCheckbox && navLinks) {
    navLinks.addEventListener("click", function(event) {
        const clickedLink = event.target.closest("a");
        if (clickedLink) {
            menuCheckbox.checked = false;

        }
    });
}


// ==========================================
// 3. SCROLL REVEAL ANIMATION
// ==========================================

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                    revealObserver.unobserve(entry.target);
                }
            })
        },
        {
            threshold: 0.15
        }
    );


    aboutSections.forEach(function(section) {
        section.style.opacity = "0";
        section.style.transform = "translateY(35px)";
        section.style.transition =
            "opacity 0.8s ease, transform 0.8s ease";
        revealObserver.observe(section);
    });
}

// ==========================================
// 4. SELECT RESTAURANT STATISTICS
// ==========================================
const statistics = document.querySelectorAll(
    "#About_Photo article section div span"
);


// ==========================================
// 5. ANIMATE STATISTICS NUMBERS
// ==========================================
function animateNumber(element) {
    const originalText = element.textContent.trim();
    const number = parseInt(originalText.replace(/\D/g, ""));
    if (isNaN(number)) return;
    const suffix = originalText.includes("+") ? "+" : "";
    const duration = 2000;
    const startTime = performance.now();

    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentNumber = Math.floor(number * progress);
        element.textContent = currentNumber + suffix;
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        } else {
            element.textContent = originalText;
        }
    }
    requestAnimationFrame(updateNumber);

}


// ==========================================
// 6. START STATISTICS ANIMATION ON SCROLL
// ==========================================
if ("IntersectionObserver" in window) {
    const statisticsObserver = new IntersectionObserver(
        function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    animateNumber(entry.target);
                    statisticsObserver.unobserve(entry.target);
                }
            })
        },
        {
            threshold: 0.5
        }
    );


    statistics.forEach(function(stat) {
        statisticsObserver.observe(stat);

    });

}


// ==========================================
// 7. TEAM MEMBERS INTERACTION
// ==========================================

const teamMembers = document.querySelectorAll(
    "#Our_Cooks .cooks_photo figure"
);
teamMembers.forEach(function(member) {
    member.addEventListener("mouseenter", function() {
        member.style.transform = "translateY(-8px)";
        member.style.transition = "transform 0.3s ease";

    });


    member.addEventListener("mouseleave", function() {
        member.style.transform = "translateY(0)";

    });

});


// ==========================================
// 8. CORE VALUES CARD INTERACTION
// ==========================================

const valueCards = document.querySelectorAll(
    "#Our_Core_Values .icon_Card > div"
);
valueCards.forEach(function(card) {
    card.addEventListener("mouseenter", function() {
        card.style.transform = "translateY(-8px)";
        card.style.transition = "transform 0.3s ease";

    });
    card.addEventListener("mouseleave", function() {
        card.style.transform = "translateY(0)";
    });

});


// ==========================================
// 9. NEWSLETTER EMAIL VALIDATION
// ==========================================

if (newsletterForm) {
    newsletterForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const emailInput = newsletterForm.querySelector(
            'input[type="email"]'
        );
        const email = emailInput.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === "") {
            showNewsletterMessage(
                newsletterForm,
                "Please enter your email address.",
                "error"
            );
            return;
        }


        if (!emailPattern.test(email)) {
            showNewsletterMessage(
                newsletterForm,
                "Please enter a valid email address.",
                "error"
            );

            return;
        }

        showNewsletterMessage(
            newsletterForm,
            "Your email is valid! Newsletter registration is not connected to a server yet.",
            "success"
        );
        newsletterForm.reset();
    });
}


// ==========================================
// 10. NEWSLETTER MESSAGE FUNCTION
// ==========================================

function showNewsletterMessage(form, message, type) {
    let messageBox = form.querySelector(".js-newsletter-message");
    if (!messageBox) {
        messageBox = document.createElement("p");
        messageBox.className = "js-newsletter-message";
        form.appendChild(messageBox);
    }


    messageBox.textContent = message;
    messageBox.style.cssText = `
        margin-top: 12px;
        padding: 10px;
        border-radius: 5px;
        font-size: 14px;
        background: ${type === "success" ? "#e1f5e5" : "#ffe5e5"};
        color: ${type === "success" ? "#176b2c" : "#a00000"};
    `;

}


// ==========================================
// 11. ACTIVATE PHONE AND EMAIL LINKS
// ==========================================

const footerLinks = document.querySelectorAll(
    "#Quick_Links a"
);
footerLinks.forEach(function(link) {
    const linkText = link.textContent.trim();
    if (linkText === "+90 212 663 29 90") {
        link.href = "tel:+902126632990";
    }
    if (linkText === "rezervasyon@beyti.com") {
        link.href = "mailto:rezervasyon@beyti.com";
    }

});


// ==========================================
// 12. CREATE BACK TO TOP BUTTON
// ==========================================

const backToTop = document.createElement("button");
backToTop.textContent = "↑";
backToTop.id = "back-to-top";
backToTop.title = "Back to Top";
backToTop.setAttribute("aria-label", "Back to top");
backToTop.style.cssText = `
    position: fixed;
    right: 25px;
    bottom: 25px;
    width: 45px;
    height: 45px;
    border: none;
    border-radius: 50%;
    background: #b88a44;
    color: white;
    font-size: 25px;
    cursor: pointer;
    z-index: 9999;
    display: none;
    box-shadow: 0 3px 10px rgba(0,0,0,0.2);
`;

document.body.appendChild(backToTop);
// ==========================================
// 13. SHOW AND HIDE BACK TO TOP BUTTON
// ==========================================
window.addEventListener("scroll", function() {
    if (window.scrollY > 400) {
        backToTop.style.display = "block";
    } else {
        backToTop.style.display = "none";
    }

});


// ==========================================
// 14. BACK TO TOP CLICK EVENT
// ==========================================
backToTop.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


// ==========================================
// 15. CONSOLE MESSAGE
// ==========================================
console.log("Beyti About Page JavaScript is working successfully!");
