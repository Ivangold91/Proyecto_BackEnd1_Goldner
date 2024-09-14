import express from "express";

import cartsRouter from "./routes/carts.router.js";
import productsRouter from "./routes/products.router.js";

const app = express();

//Inicializar el servidor
app.listen(8080, () => { console.log("Listening on PORT 8080");})
// server.on("error", error => console.log(`Error en servidor ${error}`))

//Middlewares para analizar el cuerpo de las solicitudes
app.use(express.json());
app.use(express.urlencoded({extended:true}))

//Implementar los routers que creamos
app.use('/api/carts', cartsRouter);
app.use('/api/products', productsRouter);


