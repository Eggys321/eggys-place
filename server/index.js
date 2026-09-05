import dotenv from "dotenv";
dotenv.config()

import express from "express";
import { connect } from "./config/db.js";
import productRoute from "./routes/productRoute.js";
import authRoute from "./routes/authRoute.js";
import orderRoute from "./routes/OrderRoute.js";
import userRoute from "./routes/userRoute.js";
import cors from "cors"
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";

const app = express();

app.use(helmet());

// only allow the configured client origin(s) to call the API; falls back to
// allowing all origins (with a warning) so local/dev setups keep working even
// if CLIENT_ORIGIN hasn't been set yet.
const allowedOrigins = process.env.CLIENT_ORIGIN?.split(",").map((origin) => origin.trim());
if (!allowedOrigins) {
    console.log("CLIENT_ORIGIN is not set - allowing requests from any origin. Set CLIENT_ORIGIN in server/.env to restrict this.");
}
app.use(cors({ origin: allowedOrigins || true }));

app.use(express.json());
app.use(mongoSanitize());

// slow down brute-force attempts against auth endpoints specifically
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 30,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, errMsg: "Too many attempts, please try again later" },
});

const port = process.env.PORT || 4040;

// api routes
app.use("/api/product", productRoute);
app.use("/api/auth", authLimiter, authRoute);
app.use("/api/order", orderRoute);
app.use("/api/user", userRoute);



app.get("/",(req,res)=>{
    res.status(200).json({success:true, message:"server is live"})
})


app.use((req,res)=>{
    res.status(404).json({success:false,errMsg:"route not found"})
})

// centralized error handler - catches anything thrown/rejected outside a
// controller's own try/catch instead of leaking a stack trace to the client
app.use((err,req,res,next)=>{
    console.error(err);
    res.status(err.status || 500).json({success:false,errMsg:"Something went wrong on the server"})
})

connect()
.then( ( )=>{
    try {
        app.listen(port,()=>{
            console.log(`http://localhost:${port}`);
        })
    } catch (error) {
        console.log("can not connect to server" + error.message);
    }
})
.catch((error)=>{
    console.log("invalid database connection" + error.message);

})
