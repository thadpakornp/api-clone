const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;

const { body, validationResult } = require('express-validator');

const User = require('./models/user');

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:MTMGUVfAawW8tJc9@cluster0.gnzu8cq.mongodb.net/?retryWrites=true&w=majority');

app.post('/register', body('username').not().isEmpty(), body('password').isLength({min: 6, max: 20}), body('yourname').not().isEmpty(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'error', errors: errors.array() });
    }

    const payload = req.body;
    const user = new User(payload);
    await user.save();
    
    return res.status(200).json({ message: 'success', data: user });
});

// app.get("/user", async (req, res) => {
//     const users = await User.find();
//     res.send(users);
// });

//get user by id
// app.get("/user/:id", async (req, res) => {
//     const id = req.params.id;
//     const user = await User.findById(id);
//     res.send(user);
// });

app.listen(port, () => {
    console.log("Example app listening at http://localhost:" + port);
});
