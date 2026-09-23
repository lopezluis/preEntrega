async function esIndiceRegistroValido (indice)
{
    const respuesta = await fetch ('https://www.luislopez.com.ar:3000/api/productos');
    const resultado = await respuesta.json();
    const productos = resultado.contenido;
    let i = 0;
    while (i < productos.length)
    {
        if (productos[i].id === indice)
        {
            return i;
        }
        i++;
    }
    return -1;
}

async function obtenerNuevoId ()
{
    async function tomarIdentificadorObjeto (objeto)
    {
        if((typeof objeto === "object") && (typeof objeto !== "undefined") && (objeto !== null) && ("id" in objeto) && !Number.isNaN(objeto.id))
        {
            return productos[i].id;
        }
        return 0;
    }

    const minimo = 31;
    let nuevoIndiceAzar, i, identificador, tamVectorProductos = productos.length;
    do
    {
        nuevoIndiceAzar = Math.floor(Math.random() * (65535 - minimo + 1)) + minimo;
        i = 0;
        identificador = await tomarIdentificadorObjeto (productos[i]);
        while ((nuevoIndiceAzar !== identificador) && (i < tamVectorProductos))
        {
            i++;
            identificador = await tomarIdentificadorObjeto (productos[i]);
        }
    }
    while (nuevoIndiceAzar === identificador);
    return nuevoIndiceAzar;
}

async function existeProductoPorNombre (nombreProducto)
{
    let i = 0;
    while (i < productos.length)
    {
        if (productos[i].nombre === nombreProducto)
        {
            return true;
        }
        i++;
    }
    return false;
}

console.log ('Gestión de Productos.\n');
if (process.argv.length === 2)
{
    console.error("Error: Debe especificar por parámetro la acción que necesita.");
    process.exit (1);
}
const indiceArgumento = 2;
while (indiceArgumento < process.argv.length)
{
    switch (process.argv[indiceArgumento])
    {
        case '-h':
            if (process.argv.length === 3)
            {
                console.log (`Modo de uso:\n\n${process.argv[0]} ${process.argv[1]} [opciones] verbo tabla[/id]\n\nDonde opciones es:\n\n-h                 muestra esta ayuda y finaliza, esta opción debe ser especificada en forma única.\n-v                 muestra la versión de la utilidad y finaliza,\n                   esta opción también debe ser especificada en forma única.\n-a usuario password\n                   autentica al usuario en la API y finaliza, "usuario" es el nombre de usuario en texto plano normal,\n                   y el "password" debe ser expresado en hash sha512, esta opción debe ser especificada en forma única.\n\nLa especificación de verbo y tabla, son obligatorias:\n\nverbo              uno de los verbos estándard http, los soportados únicamente son GET, POST y DELETE.\ntabla              indica la tabla donde se debe realizar el verbo solicitado, la única soportada es 'products'.\n\nEn el caso que el verbo solicitado requiera un id donde actuar, deberá ser especificado, luego de la tabla,\nseguido sin espaciar, de una barra de día (/).\n\nEjemplos de uso:\n\n./productos -h     muestra la ayuda y finaliza.\n./productos -v     muestra la versión y finaliza.\n./productos -a Luis \$(echo -n "López" | sha512sum | sed -En "s/^([0-9a-f]+) .*/\\1/p")\n                   autentica al usuario "Luis", con su password "López".\n./productos GET products\n                   muestra todos los productos y finaliza.\n./productos GET products/5\n                   muestra el producto con id 5 y finaliza.\n./productos POST products Dulce\\ de\\ membrillo\\ 500\\ grs. Almacén 1.8 23 Dulciora\n                   agrega el producto especificado y finaliza.\n./productos POST products Yogurt\\ bebible\\ frutilla\\ 1L Lácteos 2.5 85 La\\ Serenísima\n                   otro ejemplo del agregado de un producto nuevo.\n./productos DELETE products/5\n                   elimina el producto con id 5 y finaliza.\n`);
                process.exit (0);
            }
            console.error("Error: ayuda se debe invocar como único parámetro.");
            process.exit (1);
        case '-v':
            if (process.argv.length === 3)
            {
                console.log ('Versión: 1.0.0.');
                process.exit (0);
            }
            console.error("Error: versión se debe invocar como único parámetro.");
            process.exit (1);
        case '-a':
            if (process.argv.length === 5)
            {
                const usuario = process.argv[indiceArgumento + 1];
                const password = process.argv[indiceArgumento + 2];
                const autenticado = fetch
                (
                    'https://www.luislopez.com.ar:3000/api/access',
                 {
                     method: 'POST',
                     headers:
                     {
                         'Content-Type': 'application/json'
                     },
                     body: JSON.stringify
                     (
                         {
                             usuario: usuario,
                             password: password
                         }
                     )
                 }
                );
                if (autenticado)
                {
                    console.log ('Te has autenticado en la API con éxito.');
                    process.exit (0);
                }
                console.error("Error: El usuario y/o el password, especifido luego de la opción \"-a\" son incorrectos.");
                process.exit (1);
            }
            console.error("Error: debe especificar luego de \"-a\" el usuario y el password.");
            process.exit (1);
        case 'GET':
            if ((process.argv[indiceArgumento + 1] === 'products') && (process.argv.length === 4))
            {
                const respuesta = await fetch ('https://www.luislopez.com.ar:3000/api/productos');
                const resultado = await respuesta.json();
                console.table(resultado.contenido);
            }
            else
            {
                if (((process.argv[indiceArgumento + 1]).slice(0, 9) == 'products/') && (process.argv.length === 4))
                {
                    const indiceRegistro = parseInt(process.argv[indiceArgumento + 1].slice(9), 10);
                    const respuesta = await fetch (`https://www.luislopez.com.ar:3000/api/productos/${indiceRegistro}`);
                    if (respuesta.headers.get('content-type').includes('text/html'))
                    {
                        console.log (respuesta);
                    }
                    else
                    {
                        const producto = await respuesta.json ();
                        console.log (`Producto: ${producto.nombre}\nCategoria: ${producto.categoria}\nPrecio: ${producto.precio}\nStock: ${producto.stock}\nMarca: ${producto.marca}`);
                    }
                }
                else
                {
                    console.error("Error: nombre de la tabla especificado, corresponde a una tabla inexistente, o el índice dado no correponde a un registro válido.");
                    process.exit (1);
                }
            }
            process.exit (0);
        case 'POST':
            if ((process.argv[indiceArgumento + 1] === 'products') && (process.argv.length === 9))
            {
                if ((process.argv[indiceArgumento + 4] === null) || (process.argv[indiceArgumento + 4].trim() === '') || !Number.isFinite(Number(process.argv[indiceArgumento + 4])))
                {
                    console.error("Error: El valor dado para el precio es incorrecto.");
                    process.exit (1);
                }
                if ((process.argv[indiceArgumento + 5] === null) || (process.argv[indiceArgumento + 5].trim() === '') || !Number.isFinite(Number(process.argv[indiceArgumento + 5])))
                {
                    console.error("Error: El valor dado para el stock es incorrecto.");
                    process.exit (1);
                }
                let resultado = await fetch
                (
                    'https://www.luislopez.com.ar:3000/api/productos',
                    {
                        method: 'POST',
                        headers:
                        {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify
                        (
                            {
                                nombre: process.argv[indiceArgumento + 2],
                                categoria: process.argv[indiceArgumento + 3],
                                precio: process.argv[indiceArgumento + 4],
                                stock: process.argv[indiceArgumento + 5],
                                marca: process.argv[indiceArgumento + 6]
                            }
                        )
                    }
                );
                const tipo = resultado.headers.get('content-type');
                if (resultado.headers.get('content-type').includes('text/html'))
                {
                    console.error("Error: El producto existe previamente u ocurrió un error al crear el producto.");
                    process.exit (1);
                }
                else
                {
                    const producto = await resultado.json ();
                    console.log (`Producto creado correctamente.\n\nProducto: ${producto.nombre}\nCategoria: ${producto.categoria}\nPrecio: ${producto.precio}\nStock: ${producto.stock}\nMarca: ${producto.marca}\n`);
                    resultado = await fetch ('https://www.luislopez.com.ar:3000/api/productos');
                    const listaProductos = await resultado.json();
                    console.table(listaProductos.contenido);
                }
            }
            else
            {
                console.error("Error: Parámetros adicionales inentendibles.");
                process.exit (1);
            }
            process.exit (0);
        case 'PUT':
            if (((process.argv[indiceArgumento + 1]).slice(0, 9) == 'products/') && (process.argv.length === 9))
            {
                const numPrecio = Number(process.argv[indiceArgumento + 4]);
                if ((process.argv[indiceArgumento + 4] === null) || (process.argv[indiceArgumento + 4].trim() === '') || !Number.isFinite(numPrecio))
                {
                    console.error("Error: El valor dado para el precio es incorrecto.");
                    process.exit (1);
                }
                const numStock = Number(process.argv[indiceArgumento + 5]);
                if ((process.argv[indiceArgumento + 5] === null) || (process.argv[indiceArgumento + 5].trim() === '') || !Number.isFinite(numStock))
                {
                    console.error("Error: El valor dado para el stock es incorrecto.");
                    process.exit (1);
                }
                const indiceRegistro = parseInt(process.argv[indiceArgumento + 1].slice(9), 10);
                let resultado = await fetch (`https://www.luislopez.com.ar:3000/api/productos/${indiceRegistro}`);
                if (resultado.headers.get('content-type').includes('text/html'))
                {
                    console.error("Error: El producto indicado a modificar no existe.");
                    process.exit (1);
                }
                const producto = await resultado.json ();
                //console.log(`Tipo de nombre original: ${typeof producto.nombre}, tipo nombre dado: ${typeof process.argv[indiceArgumento + 2]}, valor original: ${producto.nombre}, valor dado: ${process.argv[indiceArgumento + 2]}, son iguales: ${producto.nombre === process.argv[indiceArgumento + 2]}.`);
                // El siguiente chequeo pasa al API
                //if ((producto.nombre === process.argv[indiceArgumento + 2]) && (producto.categoria === process.argv[indiceArgumento + 3]) && (producto.precio === numPrecio) && (producto.stock === numStock) && (producto.marca === process.argv[indiceArgumento + 6]))
                //{
                //    console.error("Error: Las modificaciones indicadas al producto no modifican nada, no hay nada para hacer.");
                //    process.exit (1);
                //}
                resultado = await fetch
                (
                    `https://www.luislopez.com.ar:3000/api/productos/${indiceRegistro}`,
                    {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify
                        (
                            {
                                id: indiceRegistro,
                                nombre: process.argv[indiceArgumento + 2],
                                categoria: process.argv[indiceArgumento + 3],
                                precio: numPrecio,
                                stock: numStock,
                                marca: process.argv[indiceArgumento + 6]
                            }
                        )
                    }
                );
                const respuesta = await fetch (`https://www.luislopez.com.ar:3000/api/productos/${indiceRegistro}`);
                if (respuesta.headers.get('content-type').includes('text/html'))
                {
                    console.log (respuesta);
                }
                else
                {
                    const producto = await respuesta.json ();
                    console.log (`Producto modificado correctamente.\n\nProducto: ${producto.nombre}\nCategoria: ${producto.categoria}\nPrecio: ${producto.precio}\nStock: ${producto.stock}\nMarca: ${producto.marca}`);
                }
                resultado = await fetch ('https://www.luislopez.com.ar:3000/api/productos');
                const listaProductos = await resultado.json();
                console.table(listaProductos.contenido);
            }
            else
            {
                console.error("Error: Parámetros adicionales inentendibles.");
                process.exit (1);
            }
            process.exit (0);
        case 'DELETE':
            if (((process.argv[indiceArgumento + 1]).slice(0, 9) === 'products/') && (process.argv.length === 4))
            {
                const indiceRegistro = parseInt(process.argv[indiceArgumento + 1].slice(9), 10);
                const indiceVector = await esIndiceRegistroValido(indiceRegistro);
                if (indiceVector === -1)
                {
                    console.error (`El registro con identificador "${indiceRegistro}", no existe.`);
                    process.exit (1);
                }
                let resultado = await fetch
                (
                    `https://www.luislopez.com.ar:3000/api/productos/${indiceRegistro}`,
                    {
                        method: 'DELETE'
                    }
                );
                if (await esIndiceRegistroValido (indiceRegistro) == -1)
                {
                    console.log (`El registro con identificador "${indiceRegistro}", se eliminó correctamente.\n`);
                }
                else
                {
                    console.error (`Se produjo un error al eliminar el registro con identificador "${indiceRegistro}".`);
                    process.exit (1);
                }
                const respuesta = await fetch ('https://www.luislopez.com.ar:3000/api/productos');
                const jsonTodoV = await respuesta.json();
                const productos = jsonTodoV.contenido;
                console.table(productos);
            }
            process.exit (0);
        default:
            console.error("Error: argumento pasado por línea de comandos desconocido.");
            process.exit (1);
    }
}
process.exit (0);
