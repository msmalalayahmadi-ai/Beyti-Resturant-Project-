
// ==========================================
// 1. SELECT HTML ELEMENTS
// ==========================================

const menuCheckbox = document.querySelector("#menu");
const navLinks = document.querySelector(".nav-links");

const reservationForm = document.querySelector(
    "#Contact_Us .form form"
);

const newsletterForm = document.querySelector(
    "#Quick_Links form"
);


// ==========================================
// 2. MOBILE NAVIGATION
// ==========================================

if (navLinks && menuCheckbox) {

    navLinks.addEventListener("click", function(event) {

        const clickedLink = event.target.closest("a");

        if (clickedLink) {

            menuCheckbox.checked = false;

        }

    });

}


// ==========================================
// 3. SET MINIMUM RESERVATION DATE
// ==========================================

function setMinimumDate(dateInput) {

    const today = new Date();

    const year = today.getFullYear();

    const month = String(today.getMonth() + 1).padStart(2, "0");

    const day = String(today.getDate()).padStart(2, "0");

    dateInput.min = `${year}-${month}-${day}`;

}


if (reservationForm) {

    const dateInput = reservationForm.querySelector(
        'input[type="date"]'
    );

    if (dateInput) {

        setMinimumDate(dateInput);

    }

}


// ==========================================
// 4. RESERVATION FORM VALIDATION
// ==========================================

if (reservationForm) {

    reservationForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const nameInput = reservationForm.querySelector(
            'input[type="text"]'
        );

        const emailInput = reservationForm.querySelector(
            'input[type="email"]'
        );

        const dateInput = reservationForm.querySelector(
            'input[type="date"]'
        );

        const timeInput = reservationForm.querySelector(
            'input[type="time"]'
        );

        const guestsInput = reservationForm.querySelector(
            'input[type="number"]'
        );

        const phoneInput = reservationForm.querySelector(
            'input[type="tel"]'
        );

        const messageInput = reservationForm.querySelector("textarea");


        // Check required elements

        if (
            !nameInput ||
            !emailInput ||
            !dateInput ||
            !timeInput ||
            !guestsInput ||
            !phoneInput ||
            !messageInput
        ) {

            alert("Reservation form elements are missing.");

            return;

        }


        const name = nameInput.value.trim();

        const email = emailInput.value.trim();

        const date = dateInput.value;

        const time = timeInput.value;

        const guests = Number(guestsInput.value);

        const phone = phoneInput.value.trim();

        const message = messageInput.value.trim();


        // Check empty fields

        if (
            name === "" ||
            email === "" ||
            date === "" ||
            time === "" ||
            guestsInput.value === "" ||
            phone === ""
        ) {

            alert("Please complete all required fields.");

            return;

        }


        // Check name

        if (name.length < 2) {

            alert("Please enter a valid name.");

            return;

        }


        // Check email

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            alert("Please enter a valid email address.");

            return;

        }


        // Check reservation date

        const today = new Date();

        const year = today.getFullYear();

        const month = String(today.getMonth() + 1).padStart(2, "0");

        const day = String(today.getDate()).padStart(2, "0");

        const todayDate = `${year}-${month}-${day}`;

        if (date < todayDate) {

            alert("Please select today or a future date.");

            return;

        }


        // Check guests

        if (!Number.isInteger(guests) || guests < 1 || guests > 50) {

            alert("The number of guests must be between 1 and 50.");

            return;

        }


        // Check phone number

        const phoneDigits = phone.replace(/\D/g, "");

        if (phoneDigits.length < 7 || phoneDigits.length > 15) {

            alert("Please enter a valid phone number.");

            return;

        }


        // Create reservation object

        const reservation = {

            name: name,

            email: email,

            date: date,

            time: time,

            guests: guests,

            phone: phone,

            message: message

        };


        // Display reservation information in console

        console.log("Reservation Details:");

        console.log(reservation);


        // Show result message

        showMessage(
            reservationForm,
            "Your reservation request has been checked successfully. Please contact the restaurant to confirm your booking.",
            "success"
        );


        reservationForm.reset();


        // Set minimum date again after reset

        setMinimumDate(dateInput);

    });

}


// ==========================================
// 5. REUSABLE MESSAGE FUNCTION
// ==========================================

function showMessage(form, text, type) {

    let messageBox = form.querySelector(".js-message");

    if (!messageBox) {

        messageBox = document.createElement("p");

        messageBox.className = "js-message";

        form.appendChild(messageBox);

    }

    messageBox.textContent = text;

    messageBox.style.cssText = `
        padding: 12px;
        margin-top: 15px;
        border-radius: 6px;
        background: ${type === "success" ? "#e1f5e5" : "#ffe5e5"};
        color: ${type === "success" ? "#176b2c" : "#a00000"};
        font-size: 14px;
    `;

}


// ==========================================
// 6. ACTIVATE PHONE AND EMAIL LINKS
// ==========================================

const phoneNumber = "+902126632990";

const emailAddress = "rezervasyon@beyti.com";

document.querySelectorAll(
    '#Our_Location a, #Contact_Us a, #Quick_Links a'
).forEach(function(link) {

    const text = link.textContent.trim();

    if (text.includes("+90 212 663 29 90")) {

        link.href = "tel:" + phoneNumber;

    }

    if (text.includes("rezervasyon@beyti.com")) {

        link.href = "mailto:" + emailAddress;

    }

});


// ==========================================
// 7. GOOGLE MAPS DIRECTIONS
// ==========================================

const restaurantAddress =
    "Orman Sk. Florya, Senlikkoy, Bakirkoy, Istanbul, Turkey";

const mapURL =
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(restaurantAddress);


const mapLinks = document.querySelectorAll(
    "#Our_Location a"
);

mapLinks.forEach(function(link) {

    const linkText = link.textContent.trim();

    if (
        linkText.includes("Get Directions") ||
        linkText.includes("View on Google Maps")
    ) {

        link.href = mapURL;

        link.target = "_blank";

        link.rel = "noopener noreferrer";

    }

});


// ==========================================
// 8. PRIVATE EVENTS EMAIL LINK
// ==========================================

const privateEventLink = document.querySelector(
    "#Private_Events .a_link a"
);

if (privateEventLink) {

    privateEventLink.href =
        "mailto:rezervasyon@beyti.com?subject=" +
        encodeURIComponent("Private Event Inquiry");

}


// ==========================================
// 9. NEWSLETTER FORM VALIDATION
// ==========================================

if (newsletterForm) {

    newsletterForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const emailInput = newsletterForm.querySelector(
            'input[type="email"]'
        );

        if (!emailInput) return;

        const email = emailInput.value.trim();

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (email === "") {

            alert("Please enter your email address.");

            return;

        }


        if (!emailPattern.test(email)) {

            alert("Please enter a valid email address.");

            return;

        }


        alert(
            "Your email is valid! Newsletter registration is not connected to a server yet."
        );

        newsletterForm.reset();

    });

}


// ==========================================
// 10. FAQ SECTION
// ==========================================

const faqItems = document.querySelectorAll(
    "#Ask_Questions details"
);

faqItems.forEach(function(item) {

    item.addEventListener("toggle", function() {

        if (item.open) {

            faqItems.forEach(function(otherItem) {

                if (otherItem !== item) {

                    otherItem.open = false;

                }

            });

        }

    });

});


// ==========================================
// 11. WELCOME MESSAGE
// ==========================================

console.log("Beyti Contact Page JavaScript is working!");
