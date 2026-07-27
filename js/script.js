// ======================================
// Shorsh Restaurant
// script.js
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    initLoader();

    initSidebar();

    initTheme();

    initScrollTop();

    initRestaurantStatus();

    initWhatsAppForm();

   
});

// ======================================
// Loader
// ======================================

function initLoader() {

    const loader = document.getElementById("loader");

    const bar = document.getElementById("progressBar");

    const percent = document.getElementById("loadingPercent");

    if (!loader) return;

    let value = 0;

    const timer = setInterval(() => {

        value++;

        if (bar) {

            bar.style.width = value + "%";

        }

        if (percent) {

            percent.textContent = value + "%";

        }

        if (value >= 100) {

            clearInterval(timer);

            setTimeout(() => {

                loader.style.opacity = "0";

                loader.style.visibility = "hidden";

                loader.style.pointerEvents = "none";

            }, 400);

        }

    }, 20);

}

// ======================================
// Sidebar
// ======================================

function initSidebar() {

    const menuBtn = document.getElementById("menuBtn");

    const sidebar = document.getElementById("sidebar");

    if (!menuBtn || !sidebar) return;

    menuBtn.addEventListener("click", () => {

        sidebar.classList.toggle("active");

    });

    document.querySelectorAll("#navMenu a").forEach(link => {

        link.addEventListener("click", () => {

            if (window.innerWidth <= 992) {

                sidebar.classList.remove("active");

            }

        });

    });

}

// ======================================
// Dark Mode
// ======================================

function initTheme() {

    const themeBtn = document.getElementById("themeBtn");

    if (!themeBtn) return;

    if (localStorage.getItem("theme") === "dark") {

        document.body.classList.add("dark");

        themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';

    }

    themeBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        const dark = document.body.classList.contains("dark");

        localStorage.setItem("theme", dark ? "dark" : "light");

        themeBtn.innerHTML = dark

            ? '<i class="fa-solid fa-sun"></i>'

            : '<i class="fa-solid fa-moon"></i>';

    });

}

// ======================================
// Scroll Top
// ======================================

function initScrollTop() {

    const button = document.getElementById("scrollTop");

    if (!button) return;

    window.addEventListener("scroll", () => {

        button.style.display =

            window.scrollY > 500

            ? "flex"

            : "none";

    });

    button.addEventListener("click", () => {

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}
// ======================================
// Restaurant Status
// ======================================

function initRestaurantStatus() {

    const status1 = document.getElementById("restaurantStatus");
    const status2 = document.getElementById("footerStatus");

    const hour = new Date().getHours();

    const open = (hour >= 10 && hour < 24);

    const html = open
        ? "🟢 <span>Open Now</span>"
        : "🔴 <span>Closed Now</span>";

    if(status1){

        status1.innerHTML = html;

    }

    if(status2){

        status2.innerHTML = html;

    }

}

// ======================================
// WhatsApp Form
// ======================================

function initWhatsAppForm(){

    const form = document.getElementById("whatsappForm");

    if(!form) return;

    form.addEventListener("submit",function(e){

        e.preventDefault();

        const name = document.getElementById("name").value;

        const phone = document.getElementById("phone").value;

        const note = document.getElementById("note").value;

        const message =`

الاسم : ${name}

الهاتف : ${phone}

الملاحظة :

${note}`;

        const url =
`https://wa.me/9647830929916?text=${encodeURIComponent(message)}`;

        window.open(url,"_blank");

    });

}

// ======================================
// Gallery Slider
// ======================================

// ======================================
// Reveal Animation
// ======================================

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:0.2
});

document.querySelectorAll("section").forEach(section=>{

    observer.observe(section);

});









