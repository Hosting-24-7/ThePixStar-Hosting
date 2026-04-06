async function registerUser() {
    const username = document.getElementById('user').value; // HTML id check karein
    const email = document.getElementById('email').value;
    const password = document.getElementById('pass').value;

    try {
        const response = await fetch('/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });

        const result = await response.json();

        if (response.ok) {
            alert("Registration Successful! 1GB Server Allotted.");
            localStorage.setItem('username', username); // Dashboard pe naam dikhane ke liye
            window.location.href = "dashboard.html"; // Seedha dashboard pe bhej dega
        } else {
            alert("Error: " + result.message);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Backend se connection nahi ho paa raha!");
    }
}
