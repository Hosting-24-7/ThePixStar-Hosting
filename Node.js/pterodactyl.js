const axios = require('axios');

// Ye values aapke .env se aayengi
const PTERO_URL = process.env.PTERO_URL;
const PTERO_API_KEY = process.env.PTERO_API_KEY;

const createServer = async (userData) => {
    try {
        const response = await axios.post(`${PTERO_URL}/api/application/servers`, {
            name: `${userData.username}_Server`,
            user: userData.ptero_id, // User ID from Pterodactyl panel
            egg: 15, // Minecraft Egg ID (Check your panel)
            docker_image: "ghcr.io/pterodactyl/yolks:java_17",
            startup: "java -Xms128M -Xmx{{SERVER_MEMORY}}M -jar {{SERVER_JARFILE}}",
            limits: {
                memory: 1024, // 1GB Free Plan
                swap: 0,
                disk: 5120, // 5GB Disk Space
                io: 500,
                cpu: 100
            },
            feature_limits: {
                databases: 0,
                backups: 1
            },
            deploy: {
                locations: [1],
                dedicated_ip: false,
                port_range: []
            }
        }, {
            headers: {
                'Authorization': `Bearer ${PTERO_API_KEY}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        // Detailed error logging
        console.error("Ptero Error:", error.response ? error.response.data : error.message);
        throw error;
    }
};

module.exports = { createServer };
