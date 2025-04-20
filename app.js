const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require("cors")
const connectDB = require("./src/config/configureDB");
const seedProducts = require('./src/utils/productMockDataUpload');
const storeRoutes = require("./src/routes/storeRoutes")
const productRoutes = require("./src/routes/productRoutes")
const orderRoutes = require("./src/routes/orderRoutes")

dotenv.config();

app.use(express.json())
app.use(cors());

app.use("/api/stores",storeRoutes)
app.use("/api/products",productRoutes)
app.use("/api/orders", orderRoutes)


app.get("/",(req,res)=>{
    res.send("Yo I am running chill!")
})

connectDB().then(()=>{
    app.listen(process.env.PORT, () => {
        console.log(
          'Server is listening on Port:',
          process.env.PORT
        );
      });
}).catch((err)=>{
    console.error(err);
    process.exit(1)
})

