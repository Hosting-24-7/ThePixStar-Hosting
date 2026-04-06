async function registerUser() {
    // Input fields se data nikalna
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!username || !email || !password) {
        alert("Bhai, saari details toh bharo!");
        return;
    }

    try {
        const response = await fetch('/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Success! 1GB Free Server Allotted to " + username);
            window.location.href = "login.html"; // Login page par bhej do
        } else {
            alert("Error: " + data.message);
        }
    } catch (error) {
        console.error("Signup Error:", error);
        alert("Backend connect nahi ho raha. Replit check karo!");
    }
}
