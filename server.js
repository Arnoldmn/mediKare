import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan';
import cors from 'cors'

import dotenv from 'dotenv'
import userRouter from './routes/users.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 6000
const api = process.env.API_URL

app.use(express.json())
app.use(morgan('tiny'));

app.use(cors())
app.options('*', cors())

app.get('/', (req, res, next) => {

    res.status(200).json({
        status: 'success',
        data: {
            name: 'mediKare app',
            version: '0.1.0'
        }
    });

});

app.use(`${api}/users`, userRouter)

mongoose.connect(
    process.env.DATABASE,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, err => {
        if (err) {
            console.log(err)
        } else {
            console.log("Connection to the database is ready!");
        }

    }
)

app.listen(PORT, err => {
    if (err) {
        console.log(err);
    } else {
        console.log(api)
        console.log(`Listening on port ${PORT}`);
    }
});