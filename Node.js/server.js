app.post('/api/admin/upgrade', (req, res) => {
    const { adminPass, serverId, newRam } = req.body;

    if (adminPass === process.env.ADMIN_PASS) {
        // Yahan Pterodactyl API ko 'PATCH' request jayegi RAM update karne ke liye
        // 4GB = 4096, 8GB = 8192
        res.send({ message: `Server ${serverId} upgraded to ${newRam}MB successfully!` });
    } else {
        res.status(401).send({ error: "Ghalat Admin Password!" });
    }
});
