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
                console.log (`Modo de uso:\n\n${process.argv[0]} ${process.argv[1]} [opciones] verbo tabla[/id]\n\nDonde opciones es:\n\n-h                 muestra esta ayuda y finaliza, esta opción debe ser especificada en forma única.\n-v                 muestra la versión de la utilidad y finaliza,\n                   esta opción también debe ser especificada en forma única.\n\nLa especificación de verbo y tabla, son obligatorias:\n\nverbo              uno de los verbos estándard http, los soportados únicamente son GET, POST y DELETE.\ntabla              indica la tabla donde se debe realizar el verbo solicitado, la única soportada es 'products'.\n\nEn el caso que el verbo solicitado requiera un id donde actuar, deberá ser especificado, luego de la tabla,\nseguido sin espaciar, de una barra de día (/).\n\nEjemplos de uso:\n\n./productos -h     muestra la ayuda y finaliza.\n./productos -v     muestra la versión y finaliza.\n./productos GET products\n                   muestra todos los productos y finaliza.\n./productos GET products/5\n                   muestra el producto con id 5 y finaliza.\n./productos POST products T-Shirt-Rex 300 remeras\n./productos DELETE products/5\n                   elimina el producto con id 5 y finaliza.\n`);
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
        case 'GET':
            if ((process.argv[indiceArgumento + 1] === 'products') && (process.argv.length === 4))
            {
                let respuesta = {};
                try
                {
                    respuesta = await fetch ('https://dummyjson.com/products');
                }
                catch (error)
                {
                    console.error(`No se lograron obtener los productos desde la API. Probablemente no se encuentre operando, contacte al soporte técnico. Error: ${error.message}`);
                    process.exit (1);
                }
                if (!respuesta.ok)
                {
                    console.error(`Error, datos no obtenidos: ${respuesta.status}`);
                    process.exit(1);
                }
                const resultado = await respuesta.json();
                console.table(resultado.products.map(({ id, description }) => ({ id, description })));
            }
            else
            {
                if (((process.argv[indiceArgumento + 1]).slice(0, 9) == 'products/') && (process.argv.length === 4))
                {
                    const indiceRegistro = parseInt(process.argv[indiceArgumento + 1].slice(9), 10);
                    let respuesta = {};
                    try
                    {
                        respuesta = await fetch (`https://dummyjson.com/products/${indiceRegistro}`);
                    }
                    catch (error)
                    {
                        console.error(`No se logró obtener el producto solicitado desde la API. Probablemente no se encuentre operando, contacte al soporte técnico. Error: ${error.message}`);
                        process.exit (1);
                    }
                    if (respuesta.headers.get('content-type').includes('text/html'))
                    {
                        console.log (respuesta);
                    }
                    else
                    {
                        const producto = await respuesta.json ();
                        console.log (`id: ${producto.id}\ntitle: ${producto.title}\ndescription: ${producto.description}\ncategory: ${producto.category}\nprice: ${producto.price}\ndiscountPercentage: ${producto.discountPercentage}\nrating: ${producto.rating}\nstock: ${producto.stock}\ntags: ${producto.tags}\nweight: ${producto.weight}\ndimensions: ${producto.dimensions}\nwarrantyInformation: ${producto.warrantyInformation}\nshippingInformation: ${producto.shippingInformation}\navailabilityStatus: ${producto.availabilityStatus}\nreviews: ${producto.reviews}\nreturnPolicy: ${producto.returnPolicy}\nminimumOrderQuantity: ${producto.minimumOrderQuantity}\nmeta: ${producto.meta}\nimages: ${producto.images}\nthumbnail: ${producto.thumbnail}\n`);
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
            if ((process.argv[indiceArgumento + 1] === 'products') && (process.argv.length === 7))
            {
                let resultado = {};
                try
                {
                    resultado = await fetch
                    (
                        'https://dummyjson.com/products/',
                        {
                            method: 'POST',
                            headers:
                            {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify
                            (
                                {
                                    title: process.argv[indiceArgumento + 2],
                                    price: process.argv[indiceArgumento + 3],
                                    category: process.argv[indiceArgumento + 4]
                                }
                            )
                        }
                    );
                }
                catch (error)
                {
                    console.error(`No pudo ser consultada la API para crear el producto nuevo. Probablemente no se encuentre operando. Contacte al soporte técnico. Error: ${error.message}`);
                    process.exit (1);
                }
                const tipo = resultado.headers.get('content-type');
                if (resultado.headers.get('content-type').includes('text/html'))
                {
                    console.error("Error: El producto existe previamente u ocurrió un error al crear el producto.");
                    process.exit (1);
                }
                else
                {
                    const producto = await resultado.json ();
                    console.log (`Producto creado correctamente.\n\ntitle: ${process.argv[indiceArgumento + 2]}\nprice: ${process.argv[indiceArgumento + 3]}\ncategory: ${process.argv[indiceArgumento + 4]}\n`);
                }
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
                let resultado = {};
                try
                {
                    resultado = await fetch
                    (
                        `https://dummyjson.com/products/${indiceRegistro}`,
                        {
                            method: 'DELETE'
                        }
                    );
                }
                catch (error)
                {
                    console.error (`No se logró comunicación con la API para eliminar el producto indicado. Probáblemante la API no esté operando. Contacte al servicio técnico. Error: "${error.message}".`);
                    process.exit (1);
                }
                console.log (`El registro con identificador "${indiceRegistro}", se eliminó correctamente.\n`);
            }
            process.exit (0);
        default:
            console.error("Error: argumento pasado por línea de comandos desconocido.");
            process.exit (1);
    }
}
process.exit (0);
