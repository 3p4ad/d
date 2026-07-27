// ======================================
// Shorsh Restaurant
// menu.js
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    initMenuFilter();

    initMenuSearch();

});

// ======================================
// Menu Filter
// ======================================

function initMenuFilter() {

    const buttons = document.querySelectorAll(".filter-btn");

    const cards = document.querySelectorAll(".food-card");

    if (!buttons.length || !cards.length) return;

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            buttons.forEach(btn => {

                btn.classList.remove("active");

            });

            button.classList.add("active");

            const category = button.dataset.filter;

            cards.forEach(card => {

                if (

                    category === "all" ||

                    card.dataset.category === category

                ) {

                    card.style.display = "block";

                }

                else {

                    card.style.display = "none";

                }

            });

        });

    });

}

// ======================================
// Menu Search
// ======================================

function initMenuSearch() {

    const search =

        document.getElementById("menuSearch");

    if (!search) return;

    search.addEventListener("keyup", () => {

        const value =

            search.value.toLowerCase();

        const cards =

            document.querySelectorAll(".food-card");

        cards.forEach(card => {

            const title =

                card.querySelector("h3")

                .textContent

                .toLowerCase();

            if (

                title.includes(value)

            ) {

                card.style.display = "block";

            }

            else {

                card.style.display = "none";

            }

        });

    });

}

// ======================================
// Sort Menu
// ======================================

function sortMenu(type){

    const grid =

        document.querySelector(".menu-grid");

    if(!grid) return;

    const cards =

        [...grid.querySelectorAll(".food-card")];

    cards.sort((a,b)=>{

        const priceA = parseFloat(

            a.querySelector(".price")

            .textContent.replace("$","")

        );

        const priceB = parseFloat(

            b.querySelector(".price")

            .textContent.replace("$","")

        );

        const nameA =

            a.querySelector("h3")

            .textContent.toLowerCase();

        const nameB =

            b.querySelector("h3")

            .textContent.toLowerCase();

        switch(type){

            case "price-low":

                return priceA-priceB;

            case "price-high":

                return priceB-priceA;

            case "name":

                return nameA.localeCompare(nameB);

            default:

                return 0;

        }

    });

    cards.forEach(card=>{

        grid.appendChild(card);

    });

}

// ======================================
// Results Counter
// ======================================

function updateResults(){

    const cards =

        document.querySelectorAll(".food-card");

    const counter =

        document.getElementById("resultsCount");

    if(!counter) return;

    let total = 0;

    cards.forEach(card=>{

        if(card.style.display !== "none"){

            total++;

        }

    });

    counter.textContent = total;

}

// ======================================
// Animation
// ======================================

function animateCards(){

    document

    .querySelectorAll(".food-card")

    .forEach((card,index)=>{

        card.style.opacity="0";

        card.style.transform=

        "translateY(25px)";

        setTimeout(()=>{

            card.style.transition=".4s";

            card.style.opacity="1";

            card.style.transform=

            "translateY(0)";

        },index*60);

    });

}

// ======================================
// Start Animation
// ======================================

window.addEventListener(

    "load",

    ()=>{

        animateCards();

        updateResults();

    }

);

// ======================================
// Sort Select
// ======================================

const sortSelect =

document.getElementById("sortMenu");

if(sortSelect){

    sortSelect.addEventListener(

        "change",

        function(){

            sortMenu(this.value);

            updateResults();

        }

    );

}

// ======================================
// End menu.js
// ======================================