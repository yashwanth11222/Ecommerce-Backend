const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const Port = process.env.PORT || 3000
const userRoutes = require('./Routes/userRoutes');
const productRoutes = require('./Routes/productRoutes');
const cartRoutes = require('./Routes/cartRoutes');
const orderRoutes = require('./Routes/orderRoutes');
const ErrorHandler = require('./Middlewares/errorMiddleware');
const connectDb = require('./Config/db');

connectDb();


app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());

app.use('/user', userRoutes);
app.use('/category', productRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', orderRoutes);

const path = require("path");
app.use(express.static(path.join(__dirname, "client/build")));


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
});



app.use(ErrorHandler);

app.listen(Port, () => {
    console.log('server is running!', Port)
})
