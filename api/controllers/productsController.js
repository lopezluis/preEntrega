import
{
    existeNombreProductoPreviamente,
    listarProductos,
    buscarProducto,
    agregarProducto,
    actualizarProducto,
    borrarProducto
}
from '../services/productsService.js';

const MAX_JSON_SIZE = 100 * 1024;

export async function obtenerProductos (request, response)
{
    try
    {
        const productos = await listarProductos ();
        if (productos.status == 200)
        {
            const json = JSON.stringify(productos);
            const cantidadBytesMemoria = Buffer.byteLength(json, 'utf8');
            if (cantidadBytesMemoria > MAX_JSON_SIZE)
            {
                const saltoDeLinea = String.fromCharCode (10);
                return response.status(413).type('text/html').send(`<!doctype html>${saltoDeLinea}<html lang="es-AR">${saltoDeLinea}<head>${saltoDeLinea}<meta charset="utf-8">${saltoDeLinea}</head>${saltoDeLinea}<body>${saltoDeLinea}<h1>413 Content Too Large</h1>${saltoDeLinea}<p>La respuesta supera el límite de 100 KB.</p>${saltoDeLinea}</body>${saltoDeLinea}</html>${saltoDeLinea}`);
            }
            process.stdout.write('.');
            response.status(200).type('application/json').send(json);
        }
    }
    catch (error)
    {
        console.error(error.message);
        const saltoDeLinea = String.fromCharCode (10);
        response.status(500).type('text/html').send(`<!doctype html>${saltoDeLinea}<html lang="es-AR">${saltoDeLinea}<head>${saltoDeLinea}<meta charset="utf-8">${saltoDeLinea}</head>${saltoDeLinea}<body>${saltoDeLinea}<h1>500 Internal Server Error</h1>${saltoDeLinea}<p>${error.message}</p>${saltoDeLinea}</body>${saltoDeLinea}</html>${saltoDeLinea}`);
    }
}

export async function obtenerProducto (request, response)
{
    const id = Number (request.params.id);
    const producto = await buscarProducto (id);
    if (!producto)
    {
        const saltoDeLinea = String.fromCharCode (10);
        response.status(404).type('text/html').send(`<!doctype html>${saltoDeLinea}<html lang="es-AR">${saltoDeLinea}<head>${saltoDeLinea}<meta charset="utf-8">${saltoDeLinea}</head>${saltoDeLinea}<body>${saltoDeLinea}<h1>404 Not Found</h1>${saltoDeLinea}<p>El producto solicitado no existe en este servidor.</p>${saltoDeLinea}</body>${saltoDeLinea}</html>${saltoDeLinea}`);
        return;
    }
    process.stdout.write('.');
    response.status(200).type('application/json').send(JSON.stringify(producto));
}

export async function crearProducto (request, response)
{
    const
    {
        nombre,
        categoria,
        precio,
        stock,
        marca
    } = request.body;
    //console.log (`Nombre: ${nombre}\nCategoría: ${categoria}\nPrecio: ${precio}\nStock: ${stock}\nMarca: ${marca}`);
    if (!nombre || !categoria || precio === undefined || stock === undefined || !marca )
    {
        const saltoDeLinea = String.fromCharCode(10);
        response.status(400).type('text/html').send(`<!doctype html>${saltoDeLinea}<html lang="es-AR">${saltoDeLinea}<head>${saltoDeLinea}<meta charset="utf-8">${saltoDeLinea}</head>${saltoDeLinea}<body>${saltoDeLinea}<h1>400 Bad Request</h1>${saltoDeLinea}<p>Faltan datos para la creación del nuevo producto.</p>${saltoDeLinea}</body>${saltoDeLinea}</html>${saltoDeLinea}`);
        return;
    }
    //console.log (`Existe previamente: ${await existeNombreProductoPreviamente(nombre)}`);
    if (await existeNombreProductoPreviamente(nombre))
    {
        const saltoDeLinea = String.fromCharCode(10);
        response.status(400).type('text/html').send(`<!doctype html>${saltoDeLinea}<html lang="es-AR">${saltoDeLinea}<head>${saltoDeLinea}<meta charset="utf-8">${saltoDeLinea}</head>${saltoDeLinea}<body>${saltoDeLinea}<h1>400 Bad Request</h1>${saltoDeLinea}<p>Existe previamente un producto con el nombre dado.</p>${saltoDeLinea}</body>${saltoDeLinea}</html>${saltoDeLinea}`);
        return;
    }
    const producto = await agregarProducto (nombre, categoria, precio, stock, marca);
    if (producto === null)
    {
        //console.log(`agregarProducto devuelve nulo`);
        const saltoDeLinea = String.fromCharCode(10);
        response.status(400).type('text/html').send(`<!doctype html>${saltoDeLinea}<html lang="es-AR">${saltoDeLinea}<head>${saltoDeLinea}<meta charset="utf-8">${saltoDeLinea}</head>${saltoDeLinea}<body>${saltoDeLinea}<h1>400 Bad Request</h1>${saltoDeLinea}<p>Se produjo un error al agregar el producto nuevo a la colección.</p>${saltoDeLinea}</body>${saltoDeLinea}</html>${saltoDeLinea}`);
        return;
    }
    //console.log(`agregarProducto agregó = Nombre: ${producto.nombre}\n                         Categoría: ${producto.categoria}\n                         Precio: ${producto.precio}\n                         Stock: ${producto.stock}\n                         Marca: ${producto.marca}`);
    process.stdout.write('.');
    response.status(201).type('application/json').send(JSON.stringify(producto));
}

export async function modificarProducto(request, response)
{
    //console.log ('modificarProducto de productsController invocado.');
    //console.log (`Idenfificador de registro a modificar requerido: ${request.params.id}`);
    const id = Number (request.params.id);
    const
    {
        nombre,
        categoria,
        precio,
        stock,
        marca
    } = request.body;
    //console.log (`Producto a modificar = { "id": ${id}, "nombre": "${nombre}", "categoria": "${categoria}", "precio": ${precio}, "stock": ${stock}, "marca": "${marca}" }`);
    const prodCheq = await buscarProducto (id);
    if ((prodCheq.nombre === nombre) && (prodCheq.categoria === categoria) && (prodCheq.precio === precio) && (prodCheq.stock === stock) && (prodCheq.marca === marca))
    {
        const saltoDeLinea = String.fromCharCode(10);
        response.status(404).type('text/html').send(`<!doctype html>${saltoDeLinea}<html lang="es-AR">${saltoDeLinea}<head>${saltoDeLinea}<meta charset="utf-8">${saltoDeLinea}</head>${saltoDeLinea}<body>${saltoDeLinea}<h1>400 Bad Request</h1>${saltoDeLinea}<p>Las modificaciones indicadas al producto no modifican nada, no hay nada para hacer.</p>${saltoDeLinea}</body>${saltoDeLinea}</html>${saltoDeLinea}`);
        return;
    }
    const producto = await actualizarProducto (id, nombre, categoria, precio, stock, marca);
    if (producto == null)
    {
        const saltoDeLinea = String.fromCharCode(10);
        response.status(404).type('text/html').send(`<!doctype html>${saltoDeLinea}<html lang="es-AR">${saltoDeLinea}<head>${saltoDeLinea}<meta charset="utf-8">${saltoDeLinea}</head>${saltoDeLinea}<body>${saltoDeLinea}<h1>400 Bad Request</h1>${saltoDeLinea}<p>El producto que se desea modificar, no fue encontrado en la colección de productos.</p>${saltoDeLinea}</body>${saltoDeLinea}</html>${saltoDeLinea}`);
        return;
    }
    process.stdout.write('.');
    response.status(200).type('application/json').send(JSON.stringify(producto));
}

export async function eliminarProducto(request, response)
{
    const id = Number(request.params.id);
    const eliminado = await borrarProducto(id);
    if (!eliminado)
    {
        const saltoDeLinea = String.fromCharCode(10);
        response.status(404).type('text/html').send(`<!doctype html>${saltoDeLinea}<html lang="es-AR">${saltoDeLinea}<head>${saltoDeLinea}<meta charset="utf-8">${saltoDeLinea}</head>${saltoDeLinea}<body>${saltoDeLinea}<h1>400 Bad Request</h1>${saltoDeLinea}<p>El producto que se desea eliminar, no fue encontrado en la colección de productos.</p>${saltoDeLinea}</body>${saltoDeLinea}</html>${saltoDeLinea}`);
        return;
    }
    process.stdout.write('.');
    response.status(204).end();
}
