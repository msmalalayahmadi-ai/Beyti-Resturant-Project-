
/* ==========================================
   BEYTI RESTAURANT - GALLERY JAVASCRIPT
   ========================================== */


// 1. GALLERY IMAGE DATA

const galleryImages = [
    {
        src: "assets/img/WhatsApp Image 2026-09-18 at 1.13.49 PM.jpeg",
        category: "Interior"
    },
    {
        src: "assets/img/WhatsApp Image 2026-09-18 at 2.13.52 PM.jpeg",
        category: "Food"
    },
    {
        src: "assets/img/WhatsApp Image 2026-09-18 at 1.13.49 PM (1).jpeg",
        category: "Interior"
    },
    {
        src: "assets/img/WhatsApp Image 2026-09-22 at 5.57.11 AM.jpeg",
        category: "Food"
    },
    {
        src: "assets/img/WhatsApp Image 2026-09-18 at 2.13.52 PM (2).jpeg",
        category: "Food"
    },
    {
        src: "assets/img/WhatsApp Image 2026-09-18 at 2.13.52 PM (1).jpeg",
        category: "Drinks"
    },
    {
        src: "assets/img/WhatsApp Image 2026-09-18 at 2.13.51 PM.jpeg",
        category: "Food"
    },
    {
        src: "assets/img/WhatsApp Image 2026-09-18 at 2.43.49 PM.jpeg",
        category: "Interior"
    }
];


// 2. GALLERY FILTERING

const galleryContainer = document.querySelector("#Pictures_Tab .photoes");

const filterLinks = document.querySelectorAll(
    "#Pictures_Tab .content div a"
);

let currentCategory = "All";

if (galleryContainer) {

    filterLinks.forEach(function(link) {

        link.addEventListener("click", function(event) {

            event.preventDefault();

            currentCategory = link.textContent.trim();

            const filteredImages = currentCategory === "All"
                ? galleryImages
                : galleryImages.filter(function(image) {
                    return image.category === currentCategory;
                });

            galleryContainer.innerHTML = "";

            filteredImages.forEach(function(image) {

                const figure = document.createElement("figure");

                const img = document.createElement("img");

                img.src = image.src;
                img.alt = image.category;

                figure.appendChild(img);

                galleryContainer.appendChild(figure);

            });

        });

    });

}


// 3. LIGHTBOX CREATION

const lightbox = document.createElement("div");

lightbox.style.cssText = `
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.95);
    justify-content: center;
    align-items: center;
    z-index: 9999;
`;

const previewImage = document.createElement("img");

previewImage.style.cssText = `
    max-width: 80%;
    max-height: 80%;
    object-fit: contain;
    border-radius: 10px;
`;

lightbox.appendChild(previewImage);

document.body.appendChild(lightbox);


// 4. IMAGE NAVIGATION

let currentImageIndex = 0;

function showImage(index) {

    if (!galleryContainer) return;

    const visibleImages = Array.from(
        galleryContainer.querySelectorAll("img")
    );

    if (visibleImages.length === 0) return;

    if (index < 0) {
        index = visibleImages.length - 1;
    }

    if (index >= visibleImages.length) {
        index = 0;
    }

    currentImageIndex = index;

    previewImage.src = visibleImages[currentImageIndex].src;

    previewImage.alt = visibleImages[currentImageIndex].alt;

    lightbox.style.display = "flex";
}


// 5. GALLERY CLICK EVENTS

if (galleryContainer) {

    galleryContainer.addEventListener("click", function(event) {

        const clickedImage = event.target.closest("img");

        if (!clickedImage) return;

        const visibleImages = Array.from(
            galleryContainer.querySelectorAll("img")
        );

        const imageIndex = visibleImages.indexOf(clickedImage);

        showImage(imageIndex);

    });

}


// 6. KEYBOARD CONTROLS

document.addEventListener("keydown", function(event) {

    if (lightbox.style.display !== "flex") return;

    if (event.key === "Escape") {

        lightbox.style.display = "none";

    }

    if (event.key === "ArrowRight") {

        showImage(currentImageIndex + 1);

    }

    if (event.key === "ArrowLeft") {

        showImage(currentImageIndex - 1);

    }

});


// 7. CLOSE LIGHTBOX

lightbox.addEventListener("click", function(event) {

    if (event.target !== previewImage) {

        lightbox.style.display = "none";

    }

});


// 8. MOBILE NAVIGATION

const menuCheckbox = document.querySelector("#menu");

const navLinks = document.querySelector(".nav-links");

if (menuCheckbox && navLinks) {

    navLinks.addEventListener("click", function(event) {

        if (event.target.closest("a")) {

            menuCheckbox.checked = false;

        }

    });

}


// 9. INSTAGRAM INTERACTION

const instagramLink = document.querySelector(
    "#Social_Information a"
);

if (instagramLink) {

    instagramLink.addEventListener("click", function(event) {

        event.preventDefault();

        alert("Thank you for your interest in Beyti Instagram!");

    });

}


// 10. CONSOLE SUCCESS MESSAGE

console.log("Beyti Gallery JavaScript loaded successfully!");
