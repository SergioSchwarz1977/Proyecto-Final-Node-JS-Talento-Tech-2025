import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import routeProducts from "./src/routes/products.route.js";
import routeLogin from "./src/routes/products.auth.route.js";
import {authentication } from "./src/middleware/auth.middleware.js";

const app = express();
const PORT = process.env.PORT

const corsConfig = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 204,
    exposedHeaders: ['Content-Length', 'X-Kuma-Revision'],
}
app.use(cors(corsConfig));
app.use(express.json());
app.use("/api",routeLogin);
app.use(authentication);

app.use((req,rest,next)=> {
    console.log(`Datos recibidos ${req.method} ${req.url}`);
    next();
})  

app.use("/api/",routeProducts);

app.use((req,rest,next)=>{
    rest.status(404).send("No se encontró recurso ó ruta invalida")
})

// app.listen(PORT,()=>{
//     console.log(`Servidor corriendo en puerto" , http://localhost:${PORT}`)
// })
export default app;