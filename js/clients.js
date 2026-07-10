const token = localStorage.getItem("token");

if (!token) {

    window.location.href = "login.html";

}

document.getElementById("logoutBtn").addEventListener("click", () => {

    localStorage.removeItem("token");

    window.location.href = "login.html";

});

async function loadClients(){

    try{

        const response = await fetch(

            "http://localhost:5000/api/contact",

            {

                headers:{

                    Authorization:`Bearer ${token}`

                }

            }

        );

        const result = await response.json();

        renderClients(result.data);

    }

    catch(error){

        console.error(error);

    }

}

loadClients();

function renderClients(contacts){

    const container = document.getElementById("clientsContainer");

    container.innerHTML = "";

    const clients = contacts.filter(contact =>

        contact.status === "CONTACTED" ||

        contact.status === "IN PROGRESS" ||

        contact.status === "COMPLETED"

    );

    if(clients.length === 0){

        container.innerHTML = `

<h2 style="color:#94a3b8;text-align:center;padding:60px;">

No clients yet.

</h2>

`;

        return;

    }

    clients.forEach(client=>{

        container.innerHTML += `

<div class="card">

    <div class="card-header">

        <div class="user-info">

            <div class="user-avatar">

                ${client.fullName.charAt(0).toUpperCase()}

            </div>

            <div>

                <h3>${client.fullName}</h3>

                <span class="email">

                    ${client.email}

                </span>

            </div>

        </div>

        <span class="badge contacted">

            CLIENT

        </span>

    </div>

    <div class="card-grid">

        <div class="info">

            <span>Company</span>

            <p>${client.company || "N/A"}</p>

        </div>

        <div class="info">

            <span>Service</span>

            <p>${client.service}</p>

        </div>

        <div class="info">

            <span>Status</span>

            <p>${client.status}</p>

        </div>

        <div class="info">

            <span>Joined</span>

            <p>${timeAgo(client.createdAt)}</p>

        </div>

    </div>

</div>

`;

    });

}