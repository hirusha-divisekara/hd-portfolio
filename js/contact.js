const contactForm = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");

const toast = document.getElementById("toast");
const toastTitle = document.getElementById("toastTitle");
const toastMessage = document.getElementById("toastMessage");

function showToast(title, message) {

    toastTitle.textContent = title;

    toastMessage.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 4000);

}

contactForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    const formData = {

        fullName: document.getElementById("fullName").value.trim(),

        email: document.getElementById("email").value.trim(),

        company: document.getElementById("company").value.trim(),

        service: document.getElementById("service").value,

        budget: document.getElementById("budget").value,

        message: document.getElementById("message").value.trim()

    };

    try {

        const response = await fetch("https://hd-portfolio-production.up.railway.app/api/contact", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(formData)

        });

        const result = await response.json();

        if (result.success) {

            showToast(

    "Inquiry Sent",

    "Thank you! I'll get back to you within 24 hours."

);

            contactForm.reset();

        }

        else {

            showToast(

    "Submission Failed",

    result.message || "Something went wrong."

);

        }

    }

    catch (error) {

        console.error(error);

        showToast(

    "Connection Error",

    "Unable to connect to the server."

);

    }

    finally {

        submitBtn.disabled = false;

        submitBtn.textContent = "Send Inquiry";

    }

});