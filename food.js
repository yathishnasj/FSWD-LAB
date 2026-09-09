
const foods = [
    {
        name: "Margherita Pizza",
        category: "Pizza",
        price: 249,
        emoji: "🍕",
        restaurant: "Pizza Corner",
        rating: 4.5
    },
    {
        name: "Cheese Burger",
        category: "Burger",
        price: 149,
        emoji: "🍔",
        restaurant: "Burger Hub",
        rating: 4.4
    },
    {
        name: "Chicken Biryani",
        category: "Biryani",
        price: 220,
        emoji: "🍛",
        restaurant: "Spice Kitchen",
        rating: 4.6
    },
    {
        name: "Veg Noodles",
        category: "Chinese",
        price: 160,
        emoji: "🍜",
        restaurant: "Chinese Wok",
        rating: 4.3
    },
    {
        name: "Chocolate Cake",
        category: "Dessert",
        price: 120,
        emoji: "🍰",
        restaurant: "Sweet Treats",
        rating: 4.7
    },
    {
        name: "Cold Coffee",
        category: "Drinks",
        price: 100,
        emoji: "🥤",
        restaurant: "Cafe Chill",
        rating: 4.5
    },
    {
        name: "Farmhouse Pizza",
        category: "Pizza",
        price: 299,
        emoji: "🍕",
        restaurant: "Pizza Corner",
        rating: 4.6
    },
    {
        name: "Chicken Burger",
        category: "Burger",
        price: 179,
        emoji: "🍔",
        restaurant: "Burger Hub",
        rating: 4.5
    }
];
let cart = [];
let discount = 0;
function showPage(page) {
    document.querySelectorAll(".page")
        .forEach(p => {
            p.classList.remove("active");
        });
    document.getElementById(page)
        .classList.add("active");
    window.scrollTo(0, 0);
}
function displayFood(list = foods) {
    const container =
        document.getElementById("foodContainer");
    container.innerHTML = "";
    list.forEach((food, index) => {
        container.innerHTML += `
            <div class="food-card">
                <div class="food-image">
                    ${food.emoji}
                </div>
                <h3>
                    ${food.name}
                </h3>
                <p>
                    ${food.restaurant}
                </p>
                <p>
                    ⭐ ${food.rating}
                </p>
                <b>
                    ₹${food.price}
                </b>
                <br><br>
                <button onclick="addToCart(${index})">
                    Add to Cart
                </button>
            </div>
        `;
    });
}
function addToCart(index) {
    const food = foods[index];
    const existing =
        cart.find(item =>
            item.name === food.name
        );
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            ...food,
            quantity: 1
        });
    }
    updateCart();
    alert(food.name + " added to cart! 🛒");
}
function updateCart() {
    const container =
        document.getElementById("cartItems");
    container.innerHTML = "";
    let total = 0;
    cart.forEach((item, index) => {
        total +=
            item.price * item.quantity;
        container.innerHTML += `
            <div class="cart-item">
                <div>
                    ${item.emoji}
                </div>
                <div>
                    <h3>
                        ${item.name}
                    </h3>
                    <p>
                        ₹${item.price}
                    </p>
                </div>
                <div class="quantity">
                    <button
                        onclick="changeQuantity(${index}, -1)">
                        -
                    </button>
                    ${item.quantity}
                    <button
                        onclick="changeQuantity(${index}, 1)">
                        +
                    </button>
                </div>
            </div>
        `;
    });
    document.getElementById("cartCount")
        .textContent =
        cart.reduce(
            (sum, item) =>
                sum + item.quantity,
            0
        );
    const gst = total * 0.05;
    let finalTotal =
        total + 40 + gst - discount;
    if (total === 0) 
        finalTotal = 0;
    }
    document.getElementById("itemTotal")
        .textContent =
        "₹" + total.toFixed(0);
    document.getElementById("gst")
        .textContent =
        "₹" + gst.toFixed(0);
    document.getElementById("grandTotal")
        .textContent =
        "₹" + finalTotal.toFixed(0);

function changeQuantity(index, amount) {
    cart[index].quantity += amount;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    updateCart();
}
function searchFood() {
    const value =
        document.getElementById("searchFood")
        .value
        .toLowerCase();
    const result =
        foods.filter(food =>
            food.name
                .toLowerCase()
                .includes(value)
            ||
            food.restaurant
                .toLowerCase()
                .includes(value)
        );
    displayFood(result);
}
function filterFood(category) {
    showPage("home");
    const result =
        foods.filter(food =>
            food.category === category
        );
    displayFood(result);
}
function applyCoupon() {
    const coupon =
        document.getElementById("coupon")
        .value
        .toUpperCase();
    if (coupon === "FOOD50") {
        discount = 50;
        document.getElementById("couponMessage")
            .textContent =
            "🎉 ₹50 discount applied!";
    } else {
        discount = 0;
        document.getElementById("couponMessage")
            .textContent =
            "❌ Invalid coupon.";
    }
    updateCart();
}
function placeOrder() {
    const address =
        document.getElementById("address")
        .value.trim();
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    if (address === "") {
        alert("Please enter delivery address.");
        return;
    }
    const payment =
        document.querySelector(
            'input[name="payment"]:checked'
        ).value;
    const orderNumber =
        "FD" +
        Math.floor(
            1000 + Math.random() * 9000
        );
    const total =
        document.getElementById("grandTotal")
            .textContent;
    document.getElementById("orderHistory")
        .innerHTML = `
        <div class="order-card">
            <h3>
                Order #${orderNumber}
            </h3>
            <p>
                ${cart.length} food item(s)
            </p>
            <p>
                Payment: ${payment}
            </p>
            <p>
                Address: ${address}
            </p>
            <strong>
                ${total}
            </strong>
            <div class="status">
                Order Placed ✓
            </div>
            <br>
            <button
                onclick="showPage('tracking')">
                Track Order 🚚
            </button>
        </div>
    `;
    cart = [];
    discount = 0;
    updateCart();
    alert(
        "Order placed successfully! 🎉"
    );
    showPage("orders");
}
displayFood();
updateCart();