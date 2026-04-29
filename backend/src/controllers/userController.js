const User = require("../models/userModel");

exports.createUser = (req, res) => {
    const {nome, email} = req.body;
    if (!nome || !email) {
        return res.status(400).json({ msg: "Preencha todos os campos" });
    }
    
    User.create({ nome, email })
};
