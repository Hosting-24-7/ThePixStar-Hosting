const axios = require('axios');

const PTERO_URL = "https://your-panel-url.com";
const PTERO_API_KEY = "ptlc_your_application_api_key";

const pteroClient = axios.create({
    baseURL: `${PTERO_URL}/api/application`,
    headers: {
        'Authorization': `Bearer ${PTERO_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

// Naya Free Server Create Karne Ka Function (1GB RAM)
async function createFreeServer(userId, username) {
    try {
        const response = await pteroClient.post('/servers', {
            name: `${username}_Server`,
            user: userId, // Pterodactyl User ID
            egg: 15, // Minecraft Egg ID (Check your panel)
            docker_image: "ghcr.io/pterodactyl/yolks:java_17",
            startup: "java -Xms128M -Xmx{{SERVER_MEMORY}}M -jar {{SERVER_JARFILE}}",
            limits: {
                memory: 1024, // 1GB
                swap: 0,
                disk: 5120, // 5GB
                io: 500,
                cpu: 100
            },
            feature_limits: { databases: 0, backups: 1 },
            deploy: { locations: [1], dedicated_ip: false, port_range: [] }
        });
        return response.data;
    } catch (error) {
        console.error("Ptero Error:", error.response.data);
    }
              }
