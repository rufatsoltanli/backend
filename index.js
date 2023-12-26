import mongoose, { Schema } from 'mongoose';
import express from 'express';
import "dotenv/config"
// const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
    name: String,
    age: Number
});

const userModel = mongoose.model('users', userSchema);

const app = express()
app.use(express.json())
const port = process.env.PORT

app.get('/', async (req, res) => {
    try {
        const { name, age } = req.body
        const user = await userModel.find({})
        res.send(user)
    } catch (error) {
        res.send("")
    }
})


app.get('/:id', async (req, res) => {
    const { id } = req.params
    const user = await userModel.findById(id)
    res.send(user)
})

app.post('/', async (req, res) => {
    try {
        const { name, age } = req.body
        const newUser = new userModel({ name, age })
        await newUser.save()
        res.send(newUser)
    } catch (error) {
        res.send(error.message)
    }
})

app.delete('/:id', async (req, res) => {
    const { id } = req.params
    const user = await userModel.findByIdAndDelete(id)
    res.send(user)
})

app.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { name, age } = req.body
        const user = await userModel.findByIdAndUpdate(id, { name, age })
        // await user.save()
        res.send(user)
    } catch (error) {
        res.send(error.message)
    }
})

mongoose.connect(process.env.DB_ACCES_KEY)
    .then(() => console.log('Connected!'))
    .catch(err => console.log(err.message))
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
}) 