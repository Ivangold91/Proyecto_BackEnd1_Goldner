import { Router } from "express";  //importar router

import {v4 as uuidv4 } from 'uuid';  //generar nuevos id

const router = Router();       //usar las funciones de express para crear rutas

let cart = [];

//La ruta GET /:pid deberá traer sólo el producto con el id proporcionado del carrito.
router.get('/:cid' , (req, res) => {
    const productoIdBuscado = req.params.id;
    const productoEncontrado = cart.find(producto => productoEncontrado.id === productoIdBuscado );
//Validamos de que se haya encontrado algo
    if (!productoEncontrado) {
        return res.status(404).json({error: 'Producto no encontrado'});
     }
    res.json(productoEncontrado);
})


//La ruta raíz POST / deberá crear un nuevo carrito con la siguiente estructura:
//  Id:Number/String (A tu elección, de igual manera como con los productos, 
//  debes asegurar que nunca se dupliquen los ids y que este se autogenere).
//  products: Array que contendrá objetos que representen cada producto

router.post('/' , (req,res) => {
   const {product} = req.body;
//Validacion de datos
if (!product) {
    return res.status(400).json({error: 'Datos inválidos'}); }
//Creo un nuevo producto 
const newCart = {
    id: uuidv4(),  // generar nuevos id
    product
}
cart.push(newCart);  //Agrego el nuevo producto al carrito
res.status(201).json(newCart);       //Devuelvo el nuevo carrito
})


//La ruta POST  /:cid/product/:pid deberá agregar el producto al arreglo “products” del carrito seleccionado, 
//agregándose como un objeto bajo el siguiente formato:
//product: SÓLO DEBE CONTENER EL ID DEL PRODUCTO (Es crucial que no agregues el producto completo).

// router.post('/cid/product/:pid' , (req,res) => {
//     const {product,quantity} = req.body;
 
//     //Validacion de datos
//  if (!product) {
//      return res.status(400).json({error: 'Datos inválidos'}); }
//  //Creo un nuevo producto 
//  const addProduct = {
//      product,  
//      quantity
//  }
//  cart.push(addProduct);  //Agrego el producto al carrrito
//  res.status(201).json(addProduct);       //Devuelvo el nuevo producto en el carrito
//  })

export default router;