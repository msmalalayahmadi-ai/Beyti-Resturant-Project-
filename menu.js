
// ==========================================
// 1. SELECT HTML ELEMENTS
// ==========================================

const menuCheckbox = document.querySelector("#menu");
const navLinks = document.querySelector(".nav-links");
const categoryLinks = document.querySelectorAll(".second_links a");
const foodSections = document.querySelectorAll(
    "#Antipasti_Foods, #Primi_Foods, #Secondi_Foods, #Dolci_Foods"
);

const newsletterForm = document.querySelector("#Quick_Links form");


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
// 3. SMOOTH SCROLL FOR FOOD CATEGORIES
// ==========================================

categoryLinks.forEach(function(link) {
    link.addEventListener("click", function(event) {
        const targetId = link.getAttribute("href");

        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            event.preventDefault();

            targetSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});


// ==========================================
// 4. ACTIVE CATEGORY WHILE SCROLLING
// ==========================================

const observer = new IntersectionObserver(
    function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {

                const currentId = "#" + entry.target.id;

                categoryLinks.forEach(function(link) {
                    link.style.backgroundColor = "";
                    link.style.color = "";

                    if (link.getAttribute("href") === currentId) {
                        link.style.backgroundColor = "#b88a44";
                        link.style.color = "#ffffff";
                    }
                });
            }
        });
    },
    {
        threshold: 0.25
    }
);

foodSections.forEach(function(section) {
    observer.observe(section);
});


// ==========================================
// 5. CREATE ORDER DATA
// ==========================================

let cart = [];


// ==========================================
// 6. CREATE ORDER PANEL
// ==========================================

const cartPanel = document.createElement("div");

cartPanel.id = "menu-cart";

cartPanel.style.cssText = `
    position: fixed;
    right: 20px;
    bottom: 20px;
    width: 320px;
    max-width: calc(100% - 40px);
    max-height: 70vh;
    overflow-y: auto;
    background: #ffffff;
    color: #222222;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.25);
    z-index: 9999;
    display: none;
`;

cartPanel.innerHTML = `
    <h3>Your Order</h3>
    <div id="cart-items"></div>
    <hr>
    <h3>Total: $<span id="cart-total">0</span></h3>
    <button id="close-cart" type="button">Close</button>
`;

document.body.appendChild(cartPanel);


// ==========================================
// 7. CREATE OPEN CART BUTTON
// ==========================================

const openCartButton = document.createElement("button");

openCartButton.textContent = "View Order (0)";

openCartButton.style.cssText = `
    position: fixed;
    right: 20px;
    top: 100px;
    padding: 12px 18px;
    background: #b88a44;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    z-index: 9998;
`;

document.body.appendChild(openCartButton);


// ==========================================
// 8. ADD ORDER BUTTON TO EACH FOOD
// ==========================================

const foodCards = document.querySelectorAll(".foods > div");

foodCards.forEach(function(card) {

    const foodName = card.querySelector("h3");
    const foodPrice = card.querySelector("section span");

    if (foodName && foodPrice) {

        const addButton = document.createElement("button");

        addButton.type = "button";
        addButton.textContent = "Add to Order";
        addButton.className = "add-to-order";

        addButton.style.cssText = `
            margin-top: 12px;
            padding: 9px 14px;
            background: #b88a44;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        `;

        card.appendChild(addButton);
    }
});


// ==========================================
// 9. ADD FOOD TO CART USING EVENT DELEGATION
// ==========================================

document.addEventListener("click", function(event) {

    const addButton = event.target.closest(".add-to-order");

    if (addButton) {

        const card = addButton.closest(".foods > div");

        const name = card.querySelector("h3").textContent.trim();

        const priceText = card.querySelector("section span").textContent;

        const price = Number(priceText.replace("$", "").trim());

        const existingFood = cart.find(function(food) {
            return food.name === name;
        });

        if (existingFood) {

            existingFood.quantity++;

        } else {

            const newFood = {
                name: name,
                price: price,
                quantity: 1
            };

            cart = [...cart, newFood];
        }

        updateCart();

        cartPanel.style.display = "block";
    }
});


// ==========================================
// 10. UPDATE CART
// ==========================================

function updateCart() {

    const cartItems = document.querySelector("#cart-items");
    const cartTotal = document.querySelector("#cart-total");

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach(function(food, index) {

        const itemTotal = food.price * food.quantity;

        total += itemTotal;

        const item = document.createElement("div");

        item.style.cssText = `
            padding: 10px 0;
            border-bottom: 1px solid #dddddd;
        `;

        item.innerHTML = `
            <strong>${food.name}</strong>
            <p>$${food.price} × ${food.quantity} = $${itemTotal}</p>

            <button type="button" data-action="decrease" data-index="${index}">−</button>

            <button type="button" data-action="increase" data-index="${index}">+</button>

            <button type="button" data-action="remove" data-index="${index}">Remove</button>
        `;

        cartItems.appendChild(item);
    });

    cartTotal.textContent = total;

    const totalQuantity = cart.reduce(function(sum, food) {
        return sum + food.quantity;
    }, 0);

    openCartButton.textContent = `View Order (${totalQuantity})`;

    if (cart.length === 0) {
        cartItems.textContent = "Your order is empty.";
    }
}


// ==========================================
// 11. INCREASE, DECREASE AND REMOVE FOOD
// ==========================================

cartPanel.addEventListener("click", function(event) {

    const button = event.target.closest("button[data-action]");

    if (!button) return;

    const action = button.dataset.action;

    const index = Number(button.dataset.index);

    if (action === "increase") {

        cart[index].quantity++;

    } else if (action === "decrease") {

        cart[index].quantity--;

        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }

    } else if (action === "remove") {

        cart.splice(index, 1);
    }

    updateCart();
});


// ==========================================
// 12. OPEN AND CLOSE CART
// ==========================================

openCartButton.addEventListener("click", function() {

    cartPanel.style.display = "block";
});

document.querySelector("#close-cart").addEventListener(
    "click",
    function() {
        cartPanel.style.display = "none";
    }
);


// ==========================================
// 13. NEWSLETTER EMAIL VALIDATION
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

            alert("Please enter your email address.");

        } else if (!emailPattern.test(email)) {

            alert("Please enter a valid email address.");

        } else {

            alert("Your email is valid! Newsletter submission is not connected to a server yet.");

            newsletterForm.reset();
        }
    });
}


// ==========================================
// 14. WELCOME MESSAGE IN CONSOLE
// ==========================================

console.log("Beyti Menu JavaScript is working successfully!");
