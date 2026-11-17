
/* ==========================================
   BEYTI RESTAURANT - HOME JAVASCRIPT
   ========================================== */


// ==========================================
// 1. MOBILE NAVIGATION
// ==========================================

const menuCheckbox = document.querySelector("#menu");
const navLinks = document.querySelector(".nav-links");

if (menuCheckbox && navLinks) {

    navLinks.addEventListener("click", function(event) {

        if (event.target.closest("a")) {

            menuCheckbox.checked = false;

        }

    });

}


// ==========================================
// 2. RESERVATION FORM
// ==========================================

const reservationForm = document.querySelector("#Contact_Us form");

if (reservationForm) {

    const nameInput = reservationForm.querySelector('input[type="text"]');
    const emailInput = reservationForm.querySelector('input[type="email"]');
    const dateInput = reservationForm.querySelector('input[type="date"]');
    const timeInput = reservationForm.querySelector('input[type="time"]');
    const guestsInput = reservationForm.querySelector('input[type="number"]');
    const phoneInput = reservationForm.querySelector('input[type="tel"]');

    // Check whether all required HTML elements exist

    if (
        !nameInput ||
        !emailInput ||
        !dateInput ||
        !timeInput ||
        !guestsInput ||
        !phoneInput
    ) {

        console.error("Reservation form inputs were not found.");

    } else {

        // Get today's date in local time

        function getTodayDate() {

            const today = new Date();

            const localDate = new Date(
                today.getTime() - today.getTimezoneOffset() * 60000
            ).toISOString().split("T")[0];

            return localDate;

        }

        // Prevent selecting a past date

        dateInput.min = getTodayDate();

        // Set required fields

        nameInput.required = true;
        emailInput.required = true;
        dateInput.required = true;
        timeInput.required = true;
        guestsInput.required = true;
        phoneInput.required = true;

        // Set guest limits

        guestsInput.min = 1;
        guestsInput.max = 20;
        guestsInput.step = 1;

        // Reservation form submission

        reservationForm.addEventListener("submit", function(event) {

            event.preventDefault();

            // Check browser form validation

            if (!reservationForm.checkValidity()) {

                reservationForm.reportValidity();

                return;

            }

            // Get input values

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const date = dateInput.value;
            const time = timeInput.value;
            const guests = Number(guestsInput.value);
            const phone = phoneInput.value.trim();

            // Validate name

            if (name.length < 2) {

                alert("Please enter a valid name.");

                nameInput.focus();

                return;

            }

            // Validate email

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {

                alert("Please enter a valid email address.");

                emailInput.focus();

                return;

            }

            // Validate reservation date

            if (date < getTodayDate()) {

                alert("Please select today or a future date.");

                dateInput.focus();

                return;

            }

            // Validate number of guests

            if (
                !Number.isInteger(guests) ||
                guests < 1 ||
                guests > 20
            ) {

                alert("Please select between 1 and 20 guests.");

                guestsInput.focus();

                return;

            }

            // Validate phone number

            const phoneDigits = phone.replace(/\D/g, "");

            if (phoneDigits.length < 7 || phoneDigits.length > 15) {

                alert("Please enter a valid phone number.");

                phoneInput.focus();

                return;

            }

            // Create reservation object

            const reservation = {

                name: name,
                email: email,
                date: date,
                time: time,
                guests: guests,
                phone: phone

            };

            // Display reservation information in console

            console.log("Reservation Details:", reservation);

            // Show success message

            showMessage(
                reservationForm,
                "Your reservation request has been checked successfully! Please contact the restaurant to confirm your booking.",
                "success"
            );

            // Reset form

            reservationForm.reset();

            // Set minimum date again

            dateInput.min = getTodayDate();

        });

    }

}


// ==========================================
// 3. NEWSLETTER SUBSCRIPTION
// ==========================================

const newsletterForm = document.querySelector("#Quick_Links form");

if (newsletterForm) {

    const newsletterEmail = newsletterForm.querySelector(
        'input[type="email"]'
    );

    if (newsletterEmail) {

        newsletterEmail.required = true;

        newsletterForm.addEventListener("submit", function(event) {

            event.preventDefault();

            // Check email validation

            if (!newsletterForm.checkValidity()) {

                newsletterForm.reportValidity();

                return;

            }

            const email = newsletterEmail.value.trim();

            // Validate email format

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {

                alert("Please enter a valid email address.");

                newsletterEmail.focus();

                return;

            }

            // Display email in console

            console.log("Newsletter Email:", email);

            // Show success message

            showMessage(
                newsletterForm,
                "Thank you! Your email has been checked successfully.",
                "success"
            );

            // Reset newsletter form

            newsletterForm.reset();

        });

    }

}


// ==========================================
// 4. GALLERY LIGHTBOX
// ==========================================

const gallery = document.querySelector("#Gallery .gallery");

if (gallery) {

    const images = gallery.querySelectorAll("img");

    if (images.length > 0) {

        // Create lightbox

        const lightbox = document.createElement("div");

        lightbox.style.cssText = `
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            justify-content: center;
            align-items: center;
            z-index: 9999;
            cursor: pointer;
        `;

        // Create preview image

        const previewImage = document.createElement("img");

        previewImage.style.cssText = `
            max-width: 85%;
            max-height: 85%;
            object-fit: contain;
            border-radius: 10px;
            cursor: default;
        `;

        lightbox.appendChild(previewImage);

        document.body.appendChild(lightbox);

        // Open image on click

        gallery.addEventListener("click", function(event) {

            const clickedImage = event.target.closest("img");

            if (!clickedImage || !gallery.contains(clickedImage)) return;

            previewImage.src = clickedImage.src;

            previewImage.alt = clickedImage.alt;

            lightbox.style.display = "flex";

        });

        // Close lightbox

        lightbox.addEventListener("click", function(event) {

            if (event.target !== previewImage) {

                lightbox.style.display = "none";

            }

        });

        // Close lightbox with Escape key

        document.addEventListener("keydown", function(event) {

            if (
                event.key === "Escape" &&
                lightbox.style.display === "flex"
            ) {

                lightbox.style.display = "none";

            }

        });

    }

}


// ==========================================
// 5. MENU INTERACTION
// ==========================================

const menuCards = document.querySelectorAll(
    "#Our_Menu .menu article"
);

menuCards.forEach(function(card) {

    card.addEventListener("click", function() {

        const dishNameElement = card.querySelector("div p");

        const dishPriceElement = card.querySelector("div span");

        // Check whether dish information exists

        if (!dishNameElement || !dishPriceElement) return;

        const dishName = dishNameElement.textContent.trim();

        const dishPrice = dishPriceElement.textContent.trim();

        // Display dish information

        alert(
            "Dish: " + dishName +
            "\nPrice: " + dishPrice
        );

    });

});


// ==========================================
// 6. REUSABLE MESSAGE FUNCTION
// ==========================================

function showMessage(form, message, type = "success") {

    if (!form) return;

    let messageBox = form.querySelector(".js-message");

    // Create message element if it does not exist

    if (!messageBox) {

        messageBox = document.createElement("p");

        messageBox.className = "js-message";

        messageBox.setAttribute("role", "status");

        form.appendChild(messageBox);

    }

    // Set message text

    messageBox.textContent = message;

    // Style message box

    messageBox.style.padding = "12px";

    messageBox.style.marginTop = "12px";

    messageBox.style.borderRadius = "6px";

    messageBox.style.backgroundColor =
        type === "success" ? "#d4edda" : "#f8d7da";

    messageBox.style.color =
        type === "success" ? "#155724" : "#721c24";

}


// ==========================================
// 7. CONSOLE SUCCESS MESSAGE
// ==========================================

console.log("Beyti Home JavaScript loaded successfully!");
