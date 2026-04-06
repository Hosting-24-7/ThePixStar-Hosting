async function loadDashboard() {
    // Filhal hum dummy data dikha rahe hain, 
    // baad mein ise hum JWT Token se real data par connect karenge.
    const username = localStorage.getItem('username') || "Gamer";
    document.getElementById('welcomeUser').innerText = "Welcome, " + username;

    // Yahan hum Pterodactyl se real RAM usage la sakte hain
    console.log("Dashboard loaded for " + username);
}

function logout() {
    localStorage.clear();
    window.location.href = "login.html";
}

window.onload = loadDashboard;
