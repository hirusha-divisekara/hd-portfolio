const token = localStorage.getItem("token");

if (!token) {

    window.location.href = "login.html";

}

document.getElementById("logoutBtn").addEventListener("click", () => {

    localStorage.removeItem("token");

    window.location.href = "login.html";

});

async function loadDashboard() {

    const token = localStorage.getItem("token");

    try {

        const response = await fetch(
            "http://localhost:5000/api/contact",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const result = await response.json();

        console.log(result);

        const contacts = result.data;

        updateDashboard(contacts);

    }

    catch (error) {

        console.error(error);

    }

}

loadDashboard();

setInterval(loadDashboard, 10000);

function updateDashboard(contacts) {

    const today = new Date().toDateString();

    animateCounter(
        "totalCount",
        contacts.length
    );

    animateCounter(
        "newCount",
        contacts.filter(c => c.status === "NEW").length
    );

    animateCounter(
        "todayCount",
        contacts.filter(
            c => new Date(c.createdAt).toDateString() === today
        ).length
    );

    updateAnalytics(contacts);

    updateRecentActivity(contacts);

    updateNotificationBadge(contacts);

}

function updateAnalytics(contacts) {

    if (contacts.length === 0) {

        document.getElementById("topService").textContent = "--";

        document.getElementById("latestInquiryName").textContent = "--";

        document.getElementById("latestInquiryService").textContent = "--";

        document.getElementById("latestInquiryTime").textContent = "--";

        return;

    }

    const services = {};

    contacts.forEach(contact => {

        services[contact.service] =
            (services[contact.service] || 0) + 1;

    });

    const mostRequested = Object.keys(services).reduce((a, b) =>

        services[a] > services[b] ? a : b

    );

    document.getElementById("topService").textContent =
        mostRequested;

    const latest = contacts[0];

    document.getElementById("latestInquiryName").textContent =
        latest.fullName;

    document.getElementById("latestInquiryService").textContent =
        latest.service;

    document.getElementById("latestInquiryTime").textContent =
        timeAgo(latest.createdAt);

}

function updateRecentActivity(contacts) {

    const container = document.getElementById("activityList");

    container.innerHTML = "";

    contacts.slice(0, 5).forEach(contact => {

        container.innerHTML += `

<div class="activity-item">

    <div>

        <div class="activity-name">

            ${contact.fullName}

        </div>

        <small>

            Submitted a ${contact.service} inquiry

        </small>

    </div>

    <div class="activity-time">

        ${timeAgo(contact.createdAt)}

    </div>

</div>

`;

    });

}

function updateNotificationBadge(contacts) {

    const badge = document.getElementById("notificationCount");

    const newCount = contacts.filter(
        c => c.status === "NEW"
    ).length;

    badge.textContent = newCount;

    badge.style.display = newCount > 0
        ? "flex"
        : "none";

}