// ==========================================
// Shorsh Restaurant
// translations.js
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    initLanguage();

});

// ==========================================
// Language System
// ==========================================

function initLanguage() {

    const languageSelect = document.getElementById("language");

    if (!languageSelect) return;

    const savedLanguage =

        localStorage.getItem("language") || "ckb";

    languageSelect.value = savedLanguage;

    changeLanguage(savedLanguage);

    languageSelect.addEventListener("change", (e) => {

        const lang = e.target.value;

        localStorage.setItem("language", lang);

        changeLanguage(lang);

    });

}

// ==========================================
// Change Language
// ==========================================

function changeLanguage(language) {

    document.documentElement.lang = language;

    if (language === "ar") {

        document.documentElement.dir = "rtl";

    }

    else if (language === "ckb") {

        document.documentElement.dir = "rtl";

    }

    else {

        document.documentElement.dir = "ltr";

    }

    const elements = document.querySelectorAll(

        "[data-ckb],[data-ar],[data-en]"

    );

    elements.forEach((element) => {

        const value =

            element.getAttribute(`data-${language}`);

        if (value) {

            if (

                element.tagName === "INPUT" ||

                element.tagName === "TEXTAREA"

            ) {

                element.placeholder = value;

            }

            else {

                element.textContent = value;

            }

        }

    });

}

// ==========================================
// Update Page Information
// ==========================================

function updatePageInfo(language){

    const titles={

        ckb:"چێشتخانەی شۆڕش",

        ar:"مطعم شورش",

        en:"Shorsh Restaurant"

    };

    const descriptions={

        ckb:"باشترین خواردنی تازە و خزمەتگوزارییەکی نایاب.",

        ar:"أفضل المأكولات العربية والشرقية والغربية.",

        en:"The finest Arabic, Eastern and Western cuisine."

    };

    document.title=

        titles[language] ||

        titles.ckb;

    const meta=document.querySelector(

        'meta[name="description"]'

    );

    if(meta){

        meta.setAttribute(

            "content",

            descriptions[language]

        );

    }

}

// ==========================================
// Direction
// ==========================================

function updateDirection(language){

    if(language==="en"){

        document.documentElement.dir="ltr";

    }else{

        document.documentElement.dir="rtl";

    }

    document.body.classList.remove(

        "lang-ar",

        "lang-ckb",

        "lang-en"

    );

    document.body.classList.add(

        "lang-"+language

    );

}

// ==========================================
// Refresh Interface
// ==========================================

function refreshLanguage(language){

    changeLanguage(language);

    updatePageInfo(language);

    updateDirection(language);

}

// ==========================================
// Start Language
// ==========================================

window.addEventListener("load",()=>{

    const lang=

        localStorage.getItem("language") ||

        "ckb";

    refreshLanguage(lang);

});

// ==========================================
// Global Function
// ==========================================

window.setLanguage=function(language){

    localStorage.setItem(

        "language",

        language

    );

    const select=

        document.getElementById("language");

    if(select){

        select.value=language;

    }

    refreshLanguage(language);

};
