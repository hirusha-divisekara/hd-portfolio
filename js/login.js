const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const username = document.getElementById("username").value;

    const password = document.getElementById("password").value;

    const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        }
    );

    const result = await response.json();

    if(result.success){

        localStorage.setItem("token", result.token);

        localStorage.setItem(
            "admin",
            JSON.stringify(result.admin)
        );

        window.location.href="admin.html";

    }else{

        showError(result.message);

    }

});

function showError(message){

    let error = document.getElementById("loginError");

    if(!error){

        error = document.createElement("div");

        error.id = "loginError";

        error.style.marginTop = "18px";
        error.style.padding = "14px";
        error.style.borderRadius = "12px";
        error.style.background = "rgba(239,68,68,.15)";
        error.style.color = "#ef4444";
        error.style.textAlign = "center";
        error.style.fontWeight = "600";

        document.querySelector(".login-card").appendChild(error);

    }

    error.textContent = message;
}