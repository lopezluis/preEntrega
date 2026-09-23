import
{
    existeProductoPorNombre,
    obtenerTodos,
    obtenerPorId,
    crear,
    modificar,
    eliminar
}
from '../models/product.js';

export async function existeNombreProductoPreviamente (nombre)
{
    return await existeProductoPorNombre (nombre);
}

export async function listarProductos ()
{
    const productos = await obtenerTodos ();
    if (productos == null)
    {
        return {"status": 500, "error": "El modelo no responde los productos.", "contenido": null};
    }
    return {"status": 200, "error": null, "contenido": productos};
}

export async function buscarProducto (id)
{
    return await obtenerPorId (id);
}

export async function agregarProducto (nombre, categoria, precio, stock, marca)
{
    return await crear (nombre, categoria, precio, stock, marca);
}

export async function actualizarProducto (id, nombre, categoria, precio, stock, marca)
{
    return await modificar (id, nombre, categoria, precio, stock, marca);
}

export async function borrarProducto (id)
{
    return await eliminar (id);
}
