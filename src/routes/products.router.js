import { Router } from "express";  //importar router

import {v4 as uuidv4 } from 'uuid';  //generar nuevos id

const router = Router();       //usar las funciones de express para crear rutas

let products = [];

//La ruta raíz GET / deberá listar todos los productos de la base.
router.get('/' , (req, res) => {
    res.json(products);
})

//La ruta GET /:pid deberá traer sólo el producto con el id proporcionado.
router.get('/:pid' , (req, res) => {
    const productoIdBuscado = req.params.id;
    const productoEncontrado = products.find(producto => productoEncontrado.id === productoIdBuscado );
//Validamos de que se haya encontrado algo
    if (!productoEncontrado) {
        return res.status(404).json({error: 'Producto no encontrado'});
     }
    res.json(productoEncontrado);
})

//La ruta raíz POST / deberá agregar un nuevo producto con los campos: 
//- id: Number/String (A tu elección, el id NO se manda desde body, se autogenera como lo hemos visto desde los primeros entregables, asegurando que NUNCA se repetirán los ids en el archivo.
// - title:String,
// - description:String
// - code:String
// - price:Number
// - status:Boolean
// - stock:Number
// - category:String
// - thumbnails:Array de Strings que contenga las rutas donde están almacenadas las imágenes referentes a dicho producto

router.post('/' , (req,res) => {
   const {title,description,code,price,status,stock,category} = req.body;
//Validacion de datos
if (!title || !description || !code || !price || !status || !stock || !category) {
    return res.status(400).json({error: 'Datos inválidos'}); }
//Creo un nuevo producto 
const newProduct = {
    id: uuidv4(),  // generar nuevos id
    title,
    description,
    code,
    price,
    status,
    stock,
    category
}
products.push(newProduct);  //Agrego el nuevo producto
res.status(201).json(newProduct);       //Devuelvo el nuevo producto
})

// La ruta PUT /:pid deberá tomar un producto y actualizarlo por los campos enviados desde body. NUNCA se debe actualizar 
//o eliminar el id al momento de hacer dicha actualización.

router.put('/:pid' , (req, res) => {
    const productoIdModificar = req.params.id;
    const {title,description,code,price,status,stock,category} = req.body;
    const productoIndex = products.findIndex(producto => producto.id === productoIdModificar );
//Validamos de que se haya encontrado algo
    if (productoIndex === -1) {
        return res.status(404).json({error: 'Producto no encontrado'});
     }

    products[productoIndex] = {
        ...products[productoIndex],
        title,
        description,
        code,
        price,
        status,
        stock,
        category
    }

    res.json(products[productoIndex]);
})

// ✓ La ruta DELETE /:id deberá eliminar el producto con el id indicado. 
router.delete ('/:pid' , (req, res) => {
    const productoIdEliminar = req.params.id;
    const productoIndex = products.findIndex (producto => producto.id === productoIdEliminar)

    if (productoIndex === -1) {
        return res.status(404).json({error: 'Producto no encontrado'}); }
    
    products.splice(productoIndex, 1);
        res.status(204).json({mensaje: 'Producto eliminado'})
})

export default router;