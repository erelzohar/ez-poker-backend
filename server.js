global.config = require(process.env.NODE_ENV === "production" ? "./config-prod.json" : "./config-dev.json");
const express = require("express");
const socket = require("socket.io");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const expressRateLimit = require("express-rate-limit");
const server = express();
const sanitize = require("./middlewares/sanitize");
const usersController = require("./controllers/users-controller");
const authController = require("./controllers/auth-controller");

server.use(express.json());
server.use("/api", expressRateLimit({
    windowMs: 1000, // 1 second
    max: 20, // limit each IP to 5 requests per windowMs
    message: "Are You a Hacker?"
}));
// server.use(cookie());
server.use(sanitize);
server.use(cors({ origin: "*" }));
server.use(fileUpload());

server.use("/api/users", usersController);
server.use("/api/auth", authController);

const products = [
    {
        name: "TV",
        stock: 9
    },
    {
        name: "Iphone",
        stock: 26
    },
    {
        name: "Laptop",
        stock: 12
    },
    {
        name: "PS5",
        stock: 45
    },
];

function addProduct(productName) { // gets only product name as string
    const index = products.findIndex(p => p.name === productName);
    if (index >= 0) {
        products[index].stock++;
        return console.log(products[index]);
    };
    products.push({ name: productName, stock: 1 });
    console.log(products);
}

function removeFromStock(productName, numberToRemove) {
    const index = products.findIndex(p => p.name === productName);
    if (index >= 0) {
        if (numberToRemove > products[index].stock) {
            console.log(`You had only ${products[index].stock} units.`);
            products[index].stock = 0;
        }
        else {
            products[index].stock -= numberToRemove;
        }
        console.log(products[index]);
    }
    else {
        console.log("Not found.");
    }
}

function getStockData(){
    products.forEach(p => console.log('Product : ' + p.name + ',  Stock : ' + p.stock));
}

const port = process.env.PORT || 3001;
server.listen(port, () => console.log("Listening..."));