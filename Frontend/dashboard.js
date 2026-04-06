function loadDashboard() {
    // LocalStorage se user ka naam uthana
    const username = localStorage.getItem('username') || "Gamer";
    console.log("Dashboard loaded for: " + username);
    
    // Aap yahan real API calls add kar sakte hain status check karne ke liye
}

function logout() {
    localStorage.clear();
    window.location.href = "login.html";
}

window.onload = loadDashboard;
