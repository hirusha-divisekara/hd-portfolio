function updateClock(){

    const now = new Date();

    const clock = document.getElementById("liveClock");
    const currentDate = document.getElementById("currentDate");
    const welcomeText = document.getElementById("welcomeText");

    if(clock){

        clock.textContent = now.toLocaleTimeString([],{
            hour:"2-digit",
            minute:"2-digit"
        });

    }

    if(currentDate){

        currentDate.textContent = now.toLocaleDateString([],{
            weekday:"long",
            year:"numeric",
            month:"long",
            day:"numeric"
        });

    }

    if(welcomeText){

        const hour = now.getHours();

        let greeting = "Good Evening";

        if(hour < 12){

            greeting = "Good Morning";

        }

        else if(hour < 18){

            greeting = "Good Afternoon";

        }

        welcomeText.textContent = greeting;

    }

}

updateClock();

setInterval(updateClock,1000);

function showToast(title,message){

    const toast=document.getElementById("adminToast");

    document.getElementById("adminToastTitle").textContent=title;

    document.getElementById("adminToastMessage").textContent=message;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },3500);

}

function animateCounter(elementId, target){

    const element = document.getElementById(elementId);

    const duration = 800;

    const start = Number(element.textContent) || 0;

    const increment = (target - start) / (duration / 16);

    let current = start;

    const timer = setInterval(()=>{

        current += increment;

        if(
            (increment > 0 && current >= target) ||
            (increment < 0 && current <= target)
        ){

            current = target;

            clearInterval(timer);

        }

        element.textContent = Math.round(current);

    },16);

}

/*==========================================
RELATIVE TIME
==========================================*/

function timeAgo(dateString){

    const seconds = Math.floor(

        (new Date() - new Date(dateString)) / 1000

    );

    if(seconds < 60){

        return "Just now";

    }

    const minutes = Math.floor(seconds / 60);

    if(minutes < 60){

        return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;

    }

    const hours = Math.floor(minutes / 60);

    if(hours < 24){

        return `${hours} hour${hours !== 1 ? "s" : ""} ago`;

    }

    const days = Math.floor(hours / 24);

    if(days === 1){

        return "Yesterday";

    }

    if(days < 7){

        return `${days} days ago`;

    }

    const weeks = Math.floor(days / 7);

    if(weeks < 5){

        return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;

    }

    const months = Math.floor(days / 30);

    if(months < 12){

        return `${months} month${months !== 1 ? "s" : ""} ago`;

    }

    const years = Math.floor(days / 365);

    return `${years} year${years !== 1 ? "s" : ""} ago`;

}

/*==========================================
ACTIVE SIDEBAR
==========================================*/

const currentPage = window.location.pathname
    .split("/")
    .pop()
    .replace(".html", "");

document.querySelectorAll(".sidebar-nav a").forEach(link => {

    if (link.dataset.page === currentPage) {

        link.classList.add("active");

    }

});