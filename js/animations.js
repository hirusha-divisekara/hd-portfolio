/*==========================================
SCROLL REVEAL
==========================================*/

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:.15
});

document.querySelectorAll(

    ".section-header,\
    .service-block,\
    .products-grid,\
    .why-grid,\
    .testimonial-grid,\
    .contact-wrapper,\
    .footer-top"

).forEach(el=>{

    el.classList.add("hidden");

    observer.observe(el);

});

/*==========================================
SECTION REVEALS
==========================================*/

const revealObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:.15
});

/* Section headers */

document.querySelectorAll(".section-header").forEach(el=>{

    el.classList.add("hidden");

    revealObserver.observe(el);

});

/* Stagger cards */

document.querySelectorAll(

".product-card, .why-card, .feature, .testimonial-card"

).forEach(el=>{

    el.classList.add("stagger");

    revealObserver.observe(el);

});

/* Large blocks */

document.querySelectorAll(

".service-block, .contact-wrapper, .footer-top"

).forEach(el=>{

    el.classList.add("hidden");

    revealObserver.observe(el);

});