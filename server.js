const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000; 

app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} request made to: ${req.url}`);
    next(); 
});


app.use(express.json());


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send("My name is king.");
});


app.post('/user', (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ 
            error: "Bad Request", 
            message: "Missing data. Please provide both 'name' and 'email'." 
        });
    }

    res.status(201).send(`Hello, ${name}!`);
});


app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`User ${userId} profile`);
});


app.listen(PORT, () => {
    console.log(`Server is running and listening on port ${PORT}`);
});