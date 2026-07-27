// ======================================
// Shorsh Restaurant
// cart.js
// ======================================

let cart = JSON.parse(

    localStorage.getItem("cart")

) || [];

// ======================================
// Start
// ======================================

document.addEventListener(

    "DOMContentLoaded",

    () => {

        loadCart();

        bindAddButtons();

        bindCartButtons();

    }

);

// ======================================
// Add To Cart
// ======================================

function bindAddButtons(){

    const buttons =

        document.querySelectorAll(".add-cart");

    buttons.forEach(button=>{

        button.addEventListener(

            "click",

            function(){

                const card =

                    this.closest(".food-card");

                const name =

                    card.querySelector("h3").textContent;

                const image =

                    card.querySelector("img").src;

                const price =

                    parseFloat(

                        card.querySelector(".price")

                        .textContent

                        .replace("$","")

                    );

                addItem({

                    name,

                    image,

                    price,

                    qty:1

                });

            }

        );

    });

}

// ======================================
// Add Item
// ======================================

function addItem(product){

    const found =

        cart.find(

            item => item.name === product.name

        );

    if(found){

        found.qty++;

    }

    else{

        cart.push(product);

    }

    saveCart();

    renderCart();

    showToast();

}

// ======================================
// Save
// ======================================

function saveCart(){

    localStorage.setItem(

        "cart",

        JSON.stringify(cart)

    );

}

// ======================================
// Load
// ======================================

function loadCart(){

    renderCart();

}

// ======================================
// Render Cart
// ======================================
function renderCart(){

    const cartItems = document.getElementById("cartItems");
    const total = document.getElementById("cartTotal");
    const count = document.getElementById("cartCount");

    if(!cartItems) return;

    cartItems.innerHTML = "";

    let totalPrice = 0;
    let totalCount = 0;

    cart.forEach((item,index)=>{

        totalPrice += item.price * item.qty;
        totalCount += item.qty;

        cartItems.innerHTML += `
        <div class="cart-item">

            <img src="${item.image}" alt="${item.name}" class="cart-image">

            <div class="cart-info">

                <h4>${item.name}</h4>

                <div class="cart-price">$${item.price.toFixed(2)}</div>

                <div class="cart-controls">

                    <button class="qty-btn" onclick="decreaseQty(${index})">
                        <i class="fa-solid fa-minus"></i>
                    </button>

                    <span class="qty">${item.qty}</span>

                    <button class="qty-btn" onclick="increaseQty(${index})">
                        <i class="fa-solid fa-plus"></i>
                    </button>

                    <button class="delete-btn" onclick="removeItem(${index})">
                        <i class="fa-solid fa-trash"></i>
                    </button>

                </div>

            </div>

        </div>
        `;

    });

    if(total){
        total.textContent = "$" + totalPrice.toFixed(2);
    }

    if(count){
        count.textContent = totalCount;
    }

}
// ======================================
// Quantity
// ======================================

function increaseQty(index){

    cart[index].qty++;

    saveCart();

    renderCart();

}

function decreaseQty(index){

    if(cart[index].qty > 1){

        cart[index].qty--;

    }else{

        cart.splice(index,1);

    }

    saveCart();

    renderCart();

}

// ======================================
// Remove Item
// ======================================

function removeItem(index){

    cart.splice(index,1);

    saveCart();

    renderCart();

}

// ======================================
// Clear Cart
// ======================================

function clearCart(){

    cart = [];

    saveCart();

    renderCart();

}

// ======================================
// Buttons
// ======================================

function bindCartButtons(){

    const panel =

        document.getElementById("cartPanel");

    const open =

        document.getElementById("cartButton");

    const close =

        document.getElementById("closeCart");

    const clear =

        document.getElementById("clearCart");

    if(open){

        open.onclick = ()=>{

            panel.classList.add("active");

        };

    }

    if(close){

        close.onclick = ()=>{

            panel.classList.remove("active");

        };

    }

    if(clear){

        clear.onclick = clearCart;

    }

}

// ======================================
// Toast
// ======================================

function showToast(){

    const toast =

        document.getElementById("toast");

    if(!toast) return;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },2000);

}





// ======================================
// Order WhatsApp
// ======================================

const orderBtn = document.getElementById("orderWhatsApp");

if(orderBtn){

    orderBtn.addEventListener("click",()=>{

        if(cart.length===0){

            alert("السلة فارغة");

            return;

        }

        let message = "🍽️ طلب جديد من مطعم شورش\n";
        message += "━━━━━━━━━━━━━━\n\n";

        let total = 0;

        cart.forEach(item=>{

            const subTotal = item.price * item.qty;
            total += subTotal;

            message += ` 🍴 ${item.name}\n`;
            message += `💲 السعر: $${item.price}\n`;
            message += ` 🔢 الكمية: ${item.qty}\n`;
            message += ` 💰 المجموع: $${subTotal}\n\n`;

        });

        message += "━━━━━━━━━━━━━━\n";
        message +=`💵 المجموع الكلي: $${total.toFixed(2)}\n\n`;
        message += "شكراً لكم ❤️";

        window.open(
            "https://wa.me/9647830929916?text=" +
            encodeURIComponent(message),
            "_blank"
        );

    });

}