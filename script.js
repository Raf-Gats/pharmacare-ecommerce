document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // HERO CAROUSEL
    // =========================
    const heroSlides = document.querySelectorAll(".slide");
    const heroPrev = document.querySelector(".prev");
    const heroNext = document.querySelector(".next");
    let heroIndex = 0;

    function showHeroSlide(i) {
        heroSlides.forEach(s => {
            s.classList.remove("active");
            s.style.opacity = 0;
        });

        heroSlides[i].classList.add("active");
        heroSlides[i].style.opacity = 1;
    }

    if (heroSlides.length) {
        if (heroNext && heroPrev) {
            heroNext.addEventListener("click", () => {
                heroIndex = (heroIndex + 1) % heroSlides.length;
                showHeroSlide(heroIndex);
            });

            heroPrev.addEventListener("click", () => {
                heroIndex = (heroIndex - 1 + heroSlides.length) % heroSlides.length;
                showHeroSlide(heroIndex);
            });
        }

        setInterval(() => {
            heroIndex = (heroIndex + 1) % heroSlides.length;
            showHeroSlide(heroIndex);
        }, 5000);

        showHeroSlide(heroIndex);
    }

    // =========================
    // LIGHTBOX
    // =========================
    const productImages = document.querySelectorAll(".product-img");
    const popup = document.getElementById("popup");
    const popupImg = document.getElementById("popup-img");
    const popupCaption = document.getElementById("popup-caption");
    const closeBtn = document.getElementById("closeBtn");

    if (popup && popupImg && closeBtn) {
        productImages.forEach(img => {
            img.addEventListener("click", () => {
                popup.style.display = "flex";
                popupImg.src = img.src;
                popupCaption.textContent = img.dataset.caption || "";
            });
        });

        closeBtn.addEventListener("click", () => {
            popup.style.display = "none";
        });
    }

    // =========================
    // CART SYSTEM (SINGLE CLEAN VERSION)
    // =========================
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const cartItemsContainer = document.getElementById("cart-items");
    const totalEl = document.getElementById("total");
    const cartCountEl = document.getElementById("cart-count");

    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    function updateCartCount() {
        if (!cartCountEl) return;

        let totalQty = 0;
        cart.forEach(item => totalQty += item.qty);

        cartCountEl.innerText = totalQty;
    }

    function renderCart() {
        if (!cartItemsContainer) return;

        cartItemsContainer.innerHTML = "";

        let total = 0;
        let totalItems = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<p style='text-align:center;'>Your cart is empty</p>";
            if (totalEl) totalEl.textContent = "0";
            if (cartCountEl) cartCountEl.textContent = "0";
            return;
        }

        cart.forEach((item, index) => {
            total += item.price * item.qty;
            totalItems += item.qty;

            const div = document.createElement("div");
            div.classList.add("cart-item");

            div.innerHTML = `
                <div>
                    <strong>${item.name}</strong><br>
                    ₱${item.price} x ${item.qty}
                </div>

                <div class="qty-controls">
                    <button onclick="decreaseQty(${index})">−</button>
                    <span>${item.qty}</span>
                    <button onclick="increaseQty(${index})">+</button>
                </div>

                <button class="remove-btn" onclick="removeItem(${index})">🗑</button>
            `;

            cartItemsContainer.appendChild(div);
        });

        if (totalEl) totalEl.textContent = total;
        if (cartCountEl) cartCountEl.textContent = totalItems;

        saveCart();
    }

    // =========================
    // GLOBAL CART FUNCTIONS
    // =========================
    window.addToCart = function (name, price) {
        let existing = cart.find(item => item.name === name);

        if (existing) {
            existing.qty += 1;
        } else {
            cart.push({ name, price, qty: 1 });
        }

        saveCart();
        updateCartCount();
        renderCart();
    };

    window.increaseQty = function (index) {
        cart[index].qty++;
        saveCart();
        renderCart();
    };

    window.decreaseQty = function (index) {
        if (cart[index].qty > 1) {
            cart[index].qty--;
        } else {
            cart.splice(index, 1);
        }
        saveCart();
        renderCart();
    };

    window.removeItem = function (index) {
        cart.splice(index, 1);
        saveCart();
        renderCart();
    };

    // =========================
    // BUTTONS
    // =========================
    document.getElementById("clear")?.addEventListener("click", () => {
        cart = [];
        saveCart();
        renderCart();
    });

    document.getElementById("checkout")?.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Cart is empty!");
            return;
        }
        alert("Proceeding to payment...");
    });

    // =========================
    // INIT
    // =========================
    updateCartCount();
    renderCart();

});


// =========================
// ADD TO CART BUTTONS (PRODUCT PAGE)
// =========================
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {

        let name = button.getAttribute("data-name");
        let price = parseFloat(button.getAttribute("data-price"));

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        let existing = cart.find(item => item.name === name);

        if (existing) {
            existing.qty += 1;
        } else {
            cart.push({ name, price, qty: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        let total = 0;
        cart.forEach(item => total += item.qty);

        let el = document.getElementById("cart-count");
        if (el) el.innerText = total;

        showToast("🛒 " + name + " added to cart");
    });
});

// =========================
// PRODUCT GALLERY SCROLL
// =========================
 let images = [
            'images/product1.jpg',
            'images/product2.jpg',
            'images/product3.jpg',
            'images/product4.jpg',
            'images/product5.jpg',
            'images/product6.jpg',
            'images/product7.jpg',
            'images/product8.jpg',
            'images/product9.jpg',
            'images/product10.jpg'

        ];

        let index = 0;

        // Change image by clicking thumbnail
        function changeImage(i) {
            index = i;
            document.getElementById('largeImage').src = images[index];
        }

        // Previous image
        function prevImage() {
            index = (index - 1 + images.length) % images.length;
            document.getElementById('largeImage').src = images[index];
        }

        // Next image
        function nextImage() {
            index = (index + 1) % images.length;
            document.getElementById('largeImage').src = images[index];
        }

        function changeImage(element) {
    // change main image
    document.getElementById("LargeImage").src = element.src;

    // get price
    let price = element.getAttribute("data-price");

    // display price
    document.getElementById("product-price").textContent = price;

    // OPTIONAL: auto-fill calculator
    document.getElementById("price").value = price;
}
// ========================
// INSTALLMENT CALCULATOR
// ========================
    function calculate() {
  const price = parseFloat(document.getElementById("price").value);
  const rate = parseFloat(document.getElementById("rate").value);
  const years = parseFloat(document.getElementById("years").value);

  // Validate inputs
  if (isNaN(price) || isNaN(rate) || isNaN(years)) {
    alert("Please enter valid numbers");
    return;
  }

  // Formula
  const total = price + (price * (rate / 100) * years);
  const monthly = total / (years * 12);
  const yearly = total / years;

  // Output
  document.getElementById("total").textContent = total.toFixed(2);
  document.getElementById("monthly").textContent = monthly.toFixed(2);
  document.getElementById("yearly").textContent = yearly.toFixed(2);
}

function resetAll() {
  // Clear inputs
  document.getElementById("price").value = "";
  document.getElementById("rate").value = "";
  document.getElementById("years").value = "";
  document.getElementById("usd").value = "";

  // Reset results
  document.getElementById("total").innerText = "0";
  document.getElementById("monthly").innerText = "0";
  document.getElementById("yearly").innerText = "0";
  document.getElementById("result").innerText = "";
}

function convert() {
    let usd = document.getElementById("usd").value;

    let rate = 60.2; 

    let php = usd * rate;

    document.getElementById("result").innerText =
        "PHP: " + php.toFixed(2);
}   

// =========================
// CLICK THUMBNAIL → CHANGE MAIN IMAGE
// =========================
const largeImage = document.getElementById("largeImage");
const thumbnails = document.querySelectorAll(".medium-image");

thumbnails.forEach(img => {
    img.addEventListener("click", () => {
        largeImage.src = img.src;
    });
});

// ========================
// SHOW TOAST NOTIFICATION
// ========================
function showToast(message) {
    const toast = document.getElementById("toast");

    if (!toast) return; // prevent crash

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

showToast("✅ Added to cart!");
