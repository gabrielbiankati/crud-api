const express = require("express")
const mongoose = require('mongoose');

const app = express()
app.use(express.json())
const port = 3000

const User = mongoose.model('User', {
    firstName: String,
    lastName: String,
    age: Number
});

app.get('/', async function (req, res) {
    const users = await User.find()
    res.send(users)
})

app.delete("/:id", async function (req, res) {
    const user = await User.findByIdAndDelete(req.params.id)
    return res.send(user)
})


app.put("/:id", async function (req, res) {
    const user = await User.findByIdAndUpdate(req.params.id, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age
    })
    return res.send(user)
})

app.post("/", async function (req, res) {
    const user1 = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age
    })

    await user1.save()
    return res.send(user1)
})

app.listen(port, function () {

    mongoose.connect('mongodb+srv://gabrielbs:Qu3PHFOkCnvn1jP6@crud-api.9vsxi.mongodb.net/?retryWrites=true&w=majority&appName=crud-api');
    console.log('app running')
})