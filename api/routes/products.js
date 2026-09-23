import express from 'express';
import
{
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    modificarProducto,
    eliminarProducto
}
from '../controllers/productsController.js';

const router = express.Router();

router.get('/', await obtenerProductos);
router.get('/:id', await obtenerProducto);
router.post('/', await crearProducto);
router.put('/:id', await modificarProducto);
router.delete('/:id', await eliminarProducto);

export default router;
