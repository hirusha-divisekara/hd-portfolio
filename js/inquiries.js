const token = localStorage.getItem("token");

if(!token){

    window.location.href="login.html";

}

let contacts = [];

let currentFilter = "ALL";

let searchText = "";

let lastInquiryCount = 0;
let isFirstLoad = true;

async function loadContacts() {

    const token = localStorage.getItem("token");

const response = await fetch(
    "http://localhost:5000/api/contact",
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
);

    const result = await response.json();

    contacts = result.data;

    const hasNewInquiry = contacts.length > lastInquiryCount;

if (!isFirstLoad && hasNewInquiry) {

    showToast(
        "📥 New Inquiry",
        `${contacts[0].fullName} sent a new inquiry.`
    );

}

lastInquiryCount = contacts.length;
isFirstLoad = false;

applyFilters();

animateCounter(

    "totalCount",

    contacts.length

);

animateCounter(

    "newCount",

    contacts.filter(c=>c.status==="NEW").length

);

const today = new Date().toDateString();

animateCounter(

    "todayCount",

    contacts.filter(c=>

        new Date(c.createdAt).toDateString()===today

    ).length

);

updateAnalytics();

const newCount = contacts.filter(

    c => c.status === "NEW"

).length;

const badge = document.getElementById("notificationCount");

badge.textContent = newCount;

badge.style.display = newCount > 0 ? "flex" : "none";

updateRecentActivity();

}

function renderContacts(data) {

    const container = document.getElementById("inquiries");

    container.innerHTML = "";

    data.forEach(contact => {

        container.innerHTML += `

<div class="card">

    <div class="card-header">

        <div class="user-info">

            <div class="user-avatar">

                ${contact.fullName.charAt(0).toUpperCase()}

            </div>

            <div>

                <h3>${contact.fullName}</h3>

                <span class="email">

                    ${contact.email}

                </span>

            </div>

        </div>

        <span class="badge ${contact.status.toLowerCase().replace(/\s/g,'-')}">

    ${contact.status}

</span>

    </div>

    <div class="card-grid">

        <div class="info">

            <span>Company</span>

            <p>${contact.company || "N/A"}</p>

        </div>

        <div class="info">

            <span>Service</span>

            <p>${contact.service}</p>

        </div>

        <div class="info">

            <span>Budget</span>

            <p>${contact.budget}</p>

        </div>

        <div class="info">

            <span>Submitted</span>

           <p>${timeAgo(contact.createdAt)}</p>

        </div>

    </div>

    <div class="message-preview">

        ${contact.message}

    </div>

    <div class="card-footer">

    <div class="actions">

        <button
            class="action-btn"
            onclick="openDrawer('${contact.id}')"
        >

            View

        </button>

        <button
            class="action-btn danger"
            onclick="confirmDelete('${contact.id}')"
        >

            Delete

        </button>

    </div>

</div>

`;

    });

}

document.getElementById("searchInput").addEventListener("input",(e)=>{

    searchText = e.target.value.toLowerCase();

    applyFilters();

});

loadContacts();

document.querySelectorAll(".filter-btn").forEach(button=>{

    button.addEventListener("click",()=>{

        document.querySelector(".filter-btn.active")
            .classList.remove("active");

        button.classList.add("active");

        currentFilter = button.dataset.filter;

        applyFilters();

    });

});

/*==========================================
DETAIL DRAWER
==========================================*/

function openDrawer(id) {

    const contact = contacts.find(c => c.id === id);

    if (!contact) return;

    const body = document.getElementById("drawerBody");

    body.innerHTML = `

<div class="drawer-profile">

    <div class="drawer-avatar">

        ${contact.fullName.charAt(0).toUpperCase()}

    </div>

    <h2>${contact.fullName}</h2>

    <p>${contact.service}</p>

    <span class="drawer-status">

        ${contact.status}

    </span>

</div>

<div class="drawer-section">

    <label>Status</label>

    <select id="statusSelect" class="status-select">

        <option value="NEW" ${
            contact.status === "NEW" ? "selected" : ""
        }>NEW</option>

        <option value="CONTACTED" ${
            contact.status === "CONTACTED" ? "selected" : ""
        }>CONTACTED</option>

        <option value="IN PROGRESS" ${
            contact.status === "IN PROGRESS" ? "selected" : ""
        }>IN PROGRESS</option>

        <option value="COMPLETED" ${
            contact.status === "COMPLETED" ? "selected" : ""
        }>COMPLETED</option>

        <option value="ARCHIVED" ${
            contact.status === "ARCHIVED" ? "selected" : ""
        }>ARCHIVED</option>

    </select>

</div>

<div class="drawer-actions">

    <button
        class="action-btn"
        onclick="saveStatus('${contact.id}')"
    >

        Save Changes

    </button>

    <button
        class="action-btn danger"
        onclick="confirmDelete('${contact.id}')"
    >

        Delete Inquiry

    </button>

</div>

`;

    document.getElementById("detailDrawer").classList.add("show");
    document.getElementById("drawerOverlay").classList.add("show");

}

function closeDrawer(){

    document.getElementById("detailDrawer").classList.remove("show");

    document.getElementById("drawerOverlay").classList.remove("show");

}

document.getElementById("closeDrawer").onclick = closeDrawer;

document.getElementById("drawerOverlay").onclick = closeDrawer;

let deleteId = null;

function confirmDelete(id){

    deleteId = id;

    document
        .getElementById("deleteModal")
        .classList.add("show");

}

document
.getElementById("cancelDelete")
.onclick = () => {

    document
        .getElementById("deleteModal")
        .classList.remove("show");

};

document
.getElementById("confirmDelete")
.onclick = async () => {

    const token = localStorage.getItem("token");

    try{

        const response = await fetch(

            `http://localhost:5000/api/contact/${deleteId}`,

            {

                method:"DELETE",

                headers:{

                    Authorization:`Bearer ${token}`

                }

            }

        );

        const result = await response.json();

        if(result.success){

            document
                .getElementById("deleteModal")
                .classList.remove("show");

            closeDrawer();

            await loadContacts();

            showToast(

                "Inquiry Deleted",

                "The inquiry has been deleted successfully."

            );

        }

    }

    catch(error){

        console.error(error);

    }

};

async function saveStatus(id){

    const status = document.getElementById("statusSelect").value;

    const token = localStorage.getItem("token");

    try{

        const response = await fetch(

            `http://localhost:5000/api/contact/${id}/status`,

            {

                method:"PATCH",

                headers:{

                    "Content-Type":"application/json",

                    Authorization:`Bearer ${token}`

                },

                body:JSON.stringify({

                    status

                })

            }

        );

        const result = await response.json();

        if(result.success){

            closeDrawer();

            await loadContacts();

            showToast(

    "Status Updated",

    "The inquiry status has been updated."

);

        }

        else{

            showToast(

    "Operation Failed",

    result.message

);

        }

    }

    catch(error){

        console.error(error);

       showToast(

    "Error",

    "Unable to update status."

);

    }

}

/*==========================================
LIVE REFRESH
==========================================*/

setInterval(async () => {

    try {

        await loadContacts();

    } catch (error) {

        console.error("Live refresh failed:", error);

    }

}, 10000);

/*==========================================
ANALYTICS
==========================================*/

function updateAnalytics(){

    if (contacts.length === 0) {

    document.getElementById("topService").textContent = "--";

    document.getElementById("latestInquiryName").textContent = "--";

    document.getElementById("latestInquiryService").textContent = "--";

    document.getElementById("latestInquiryTime").textContent = "--";

    return;

}

    // Most requested service
    const services = {};

    contacts.forEach(contact=>{

        services[contact.service] =
            (services[contact.service] || 0) + 1;

    });

    const mostRequested = Object.keys(services).reduce(

        (a,b)=>

        services[a] > services[b] ? a : b

    );

    document.getElementById("topService").textContent =
        mostRequested;

    // Latest inquiry

    const latest = contacts[0];

document.getElementById("latestInquiryName").textContent =
    latest.fullName;

document.getElementById("latestInquiryService").textContent =
    latest.service;

document.getElementById("latestInquiryTime").textContent =
    timeAgo(latest.createdAt);

}

function applyFilters(){

    let filtered = [...contacts];

    if(currentFilter !== "ALL"){

        filtered = filtered.filter(contact=>

            contact.status === currentFilter

        );

    }

    if(searchText){

        filtered = filtered.filter(contact=>

            contact.fullName.toLowerCase().includes(searchText) ||

            contact.email.toLowerCase().includes(searchText) ||

            (contact.company || "").toLowerCase().includes(searchText) ||

            contact.service.toLowerCase().includes(searchText)

        );

    }

    renderContacts(filtered);

}

function updateRecentActivity(){

    const container = document.getElementById("activityList");

    container.innerHTML = "";

    contacts.slice(0,5).forEach(contact=>{

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

document.getElementById("logoutBtn").addEventListener("click",()=>{

    localStorage.removeItem("token");

    window.location.href="login.html";

});