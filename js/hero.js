/* ==========================================
HERO TYPING EFFECT
========================================== */

const typingText = document.getElementById("typing-text");

if (typingText) {

    const words = [

        "Building Premium Digital Experiences",

        "Developing Smart Business Solutions",

        "Creating Powerful Billing Systems",

        "Designing Modern Web Applications",

        "Engineering AI Powered Products"

    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {

        const currentWord = words[wordIndex];

        if (!deleting) {

            typingText.textContent = currentWord.substring(0, charIndex + 1);

            charIndex++;

            if (charIndex === currentWord.length) {

                deleting = true;

                setTimeout(typeEffect, 1800);

                return;

            }

        } else {

            typingText.textContent = currentWord.substring(0, charIndex - 1);

            charIndex--;

            if (charIndex === 0) {

                deleting = false;

                wordIndex++;

                if (wordIndex >= words.length) {

                    wordIndex = 0;

                }

            }

        }

        setTimeout(typeEffect, deleting ? 35 : 70);

    }

    typeEffect();

}

/*==========================================
HERO PARALLAX
==========================================*/

const hero = document.getElementById("hero");

if(hero){

    const cards = document.querySelectorAll(".floating-card");

    hero.addEventListener("mousemove",(e)=>{

        const rect = hero.getBoundingClientRect();

        const x = (e.clientX - rect.left) / rect.width - 0.5;

        const y = (e.clientY - rect.top) / rect.height - 0.5;

        cards.forEach((card,index)=>{

            const strength = (index + 1) * 18;

            card.style.transform = `
                translate(${x * strength}px, ${y * strength}px)
            `;

        });

    });

    hero.addEventListener("mouseleave",()=>{

        cards.forEach(card=>{

            card.style.transform="translate(0,0)";

        });

    });

}