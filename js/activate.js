const activateBtn = document.getElementById("activateBtn");

activateBtn.addEventListener("click", () => {

    const company = document.getElementById("company").value.trim();

    const license = document.getElementById("license").value.trim();

    if (!company || !license) {

        alert("Please enter your company name and license key.");

        return;

    }

    // Temporary demo validation
    if (license === "HDBS-2026-DEMO") {

        localStorage.setItem("licensed", "true");

        localStorage.setItem("companyName", company);

        localStorage.setItem("licenseKey", license);

        alert("HD Business Suite activated successfully!");

        window.location.href = "login.html";

    } else {

        alert("Invalid license key.");

    }

});