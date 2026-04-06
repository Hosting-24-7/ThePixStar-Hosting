const axios = require('axios');

// Ye values aapke .env se aayengi
const PTERO_URL = process.env.PTERO_URL; 
const PTERO_API_KEY = process.env.PTERO_API_KEY; 

const createServer = async (userData) => {
    try {
        const response = await axios.post(`${PTERO_URL}/api/application/servers`, {
            name: `${userData.username}_Server`,
            user: userData.ptero_id, // User ID from panel
            egg: 15, // Minecraft Egg
            docker_image: "ghcr.io/pterodactyl/yolks:java_17",
            startup: "java -Xms128M -Xmx{{SERVER_MEMORY}}M -jar {{SERVER_JARFILE}}",
            limits: {
                memory: 1024, // 1GB Free Plan
                swap: 0,
                disk: 5120,
                io: 500,
                cpu: 100
            },
            deploy: { locations: [1], dedicated_ip: false, port_range: [] }
        }, {
            headers: { 'Authorization': `Bearer ${PTERO_API_KEY}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error creating server:", error);
    }
};
