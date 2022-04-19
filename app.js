require('dotenv').config();


const express = require('express');
const app = express();

const connectDB = require('./db/connect')

const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h1>Store API</h1>')
});

app.use(notFoundMiddleware)
app.use(errorMiddleware)

const port = process.env.PORT || 8000
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`server is listening on port ${port}...`));
    } catch (error) {
        console.log(error);
    }
};

start();