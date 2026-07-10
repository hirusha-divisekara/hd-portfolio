document.addEventListener("DOMContentLoaded", () => {

    const menu = document.getElementById("menuToggle");

    const nav = document.querySelector(".nav-links");

    if(menu){

        menu.addEventListener("click",()=>{

            nav.classList.toggle("active");

            menu.innerHTML =

            nav.classList.contains("active")

            ? "✕"

            : "☰";

        });

    }

});