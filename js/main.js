window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if (loader) {

        setTimeout(() => {

            loader.classList.add("hide");

        }, 1800);

    }

});

/*==========================================
PRODUCT SPOTLIGHT
==========================================*/

const productCards = document.querySelectorAll(".product-card");

productCards.forEach(card => {

    card.addEventListener("mousemove", e => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        card.style.setProperty("--x", `${x}px`);

        card.style.setProperty("--y", `${y}px`);

    });

});

/*==========================================
PRODUCT CARD TILT
==========================================*/

productCards.forEach(card => {

    card.addEventListener("mousemove", e => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        const rotateY = ((x / rect.width) - 0.5) * 10;

        const rotateX = ((y / rect.height) - 0.5) * -10;

        card.style.transform = `
            perspective(1200px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-10px)
        `;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = `
            perspective(1200px)
            rotateX(0deg)
            rotateY(0deg)
            translateY(0px)
        `;

    });

});

/*==========================================
NAVBAR SCROLL
==========================================*/

const navbar = document.getElementById("navbar");

window.addEventListener("scroll",()=>{

    if(window.scrollY>40){

        navbar.classList.add("scrolled");

    }

    else{

        navbar.classList.remove("scrolled");

    }

});

/*==========================================
ACTIVE NAVIGATION
==========================================*/

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});

/*==========================================
COUNTER ANIMATION
==========================================*/

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const target = +counter.dataset.target;

        let current = 0;

        const speed = target / 80;

        const update = () => {

            current += speed;

            if (current < target) {

                counter.textContent = Math.ceil(current);

                requestAnimationFrame(update);

            } else {

                counter.textContent = target;

                if (target === 4) counter.textContent += "+";

                if (target === 100) counter.textContent += "%";

                if (target === 24) counter.textContent += "/7";

            }

        };

        update();

        counterObserver.unobserve(counter);

    });

},{
    threshold:.5
});

counters.forEach(counter => counterObserver.observe(counter));

/*==========================================
PREMIUM SPOTLIGHT
==========================================*/


spotlightCards.forEach(card=>{

    card.addEventListener("mousemove",(e)=>{

        const rect = card.getBoundingClientRect();

        card.style.setProperty(
            "--mouse-x",
            `${e.clientX-rect.left}px`
        );

        card.style.setProperty(
            "--mouse-y",
            `${e.clientY-rect.top}px`
        );

    });

});


