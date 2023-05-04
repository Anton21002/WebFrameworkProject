const mongoose = require("mongoose")

const dbURI = 'mongodb+srv://group4:Group4@cluster0.abip4ba.mongodb.net/group4?retryWrites=true&w=majority'
mongoose.connect(dbURI)
.then(result => console.log("Database connected"))
.catch(error => console.log(error))

const LogInSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})

const collection = new mongoose.model("Collection1", LogInSchema)

module.exports = collection


