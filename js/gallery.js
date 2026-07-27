// ======================================
// Shorsh Restaurant
// gallery.js
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    initGallerySlider();

});

// ======================================
// Gallery Slider
// ======================================

function initGallerySlider() {

    const slider = document.querySelector(".gallery-slider");

    const track = document.querySelector(".gallery-track");

    const slides = document.querySelectorAll(".gallery-track img");

    const prev = document.querySelector(".gallery-btn.prev");

    const next = document.querySelector(".gallery-btn.next");

    if (!slider || !track || slides.length === 0) return;

    let current = 0;

    const total = slides.length;

    function updateSlider() {

        track.style.transform =`
            translateX(-${current * 100}%)`;

    }

    function nextSlide() {

        current++;

        if (current >= total) {

            current = 0;

        }

        updateSlider();

        updateDots();

    }

    function prevSlide() {

        current--;

        if (current < 0) {

            current = total - 1;

        }

        updateSlider();

        updateDots();

    }

    next?.addEventListener("click", nextSlide);

    prev?.addEventListener("click", prevSlide);

    let autoPlay = setInterval(nextSlide, 5000);

    slider.addEventListener("mouseenter", () => {

        clearInterval(autoPlay);

    });

    slider.addEventListener("mouseleave", () => {

        autoPlay = setInterval(nextSlide, 5000);

    });

// ======================================
// Touch Swipe
// ======================================

    let startX = 0;

    slider.addEventListener("touchstart", (e) => {

        startX = e.touches[0].clientX;

    });

    slider.addEventListener("touchend", (e) => {

        const endX = e.changedTouches[0].clientX;

        const distance = startX - endX;

        if (distance > 50) {

            nextSlide();

        }

        if (distance < -50) {

            prevSlide();

        }

    });

    // ======================================
// Gallery Dots
// ======================================

    const dotsContainer = document.createElement("div");

    dotsContainer.className = "gallery-dots";

    slider.appendChild(dotsContainer);

    slides.forEach((_, index) => {

        const dot = document.createElement("button");

        dot.className = "gallery-dot";

        if(index === 0){

            dot.classList.add("active");

        }

        dot.addEventListener("click", () => {

            current = index;

            updateSlider();

            updateDots();

        });

        dotsContainer.appendChild(dot);

    });

    function updateDots(){

        const dots =

            document.querySelectorAll(".gallery-dot");

        dots.forEach((dot,i)=>{

            dot.classList.toggle(

                "active",

                i === current

            );

        });

    }

// ======================================
// Lightbox
// ======================================

    const lightbox =

        document.createElement("div");

    lightbox.className = "lightbox";

    lightbox.innerHTML =`

    

    <span class="lightbox-close">&times;</span>

    <img class="lightbox-image">

    `;

    document.body.appendChild(lightbox);

    const image =

        lightbox.querySelector(".lightbox-image");

    const close =

        lightbox.querySelector(".lightbox-close");

    slides.forEach(slide=>{

        slide.style.cursor="zoom-in";

        slide.addEventListener("click",()=>{

            image.src = slide.src;

            lightbox.classList.add("show");

        });

    });

    close.addEventListener("click",()=>{

        lightbox.classList.remove("show");

    });

    lightbox.addEventListener("click",(e)=>{

        if(e.target===lightbox){

            lightbox.classList.remove("show");

        }

    });

    updateSlider();

    updateDots();

}

// ======================================
// End gallery.js
// ======================================