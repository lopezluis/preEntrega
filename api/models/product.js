const productos =
[
    {
        "id": 1,
        "nombre": "Leche entera 1L",
        "categoria": "Lácteos",
        "precio": 1.5,
        "stock": 120,
        "marca": "La Serenísima"
    },
    {
        "id": 2,
        "nombre": "Yogur natural 500g",
        "categoria": "Lácteos",
        "precio": 1.8,
        "stock": 80,
        "marca": "Yoplait"
    },
    {
        "id": 3,
        "nombre": "Queso gouda 250g",
        "categoria": "Lácteos",
        "precio": 3.2,
        "stock": 45,
        "marca": "SanCor"
    },
    {
        "id": 4,
        "nombre": "Manteca 200g",
        "categoria": "Lácteos",
        "precio": 2.1,
        "stock": 60,
        "marca": "Sancor"
    },
    {
        "id": 5,
        "nombre": "Pan lactal grande",
        "categoria": "Panadería",
        "precio": 2.5,
        "stock": 50,
        "marca": "Bimbo"
    },
    {
        "id": 6,
        "nombre": "Facturas / Medialunas x6",
        "categoria": "Panadería",
        "precio": 3.0,
        "stock": 30,
        "marca": "El Sol"
    },
    {
        "id": 7,
        "nombre": "Arroz integral 1kg",
        "categoria": "Almacén",
        "precio": 1.9,
        "stock": 200,
        "marca": "Gallo"
    },
    {
        "id": 8,
        "nombre": "Fideos tallarines 500g",
        "categoria": "Almacén",
        "precio": 1.2,
        "stock": 150,
        "marca": "Lucchetti"
    },
    {
        "id": 9,
        "nombre": "Aceite de girasol 1.5L",
        "categoria": "Almacén",
        "precio": 4.5,
        "stock": 90,
        "marca": "Natura"
    },
    {
        "id": 10,
        "nombre": "Puré de tomate 520g",
        "categoria": "Almacén",
        "precio": 0.9,
        "stock": 300,
        "marca": "Arcor"
    },
    {
        "id": 11,
        "nombre": "Harina de trigo 000 1kg",
        "categoria": "Almacén",
        "precio": 1.1,
        "stock": 110,
        "marca": "Blancaflor"
    },
    {
        "id": 12,
        "nombre": "Azúcar blanco 1kg",
        "categoria": "Almacén",
        "precio": 1.3,
        "stock": 140,
        "marca": "Ledesma"
    },
    {
        "id": 13,
        "nombre": "Café molido 250g",
        "categoria": "Almacén",
        "precio": 5.2,
        "stock": 75,
        "marca": "Cabrales"
    },
    {
        "id": 14,
        "nombre": "Yerba mate 1kg",
        "categoria": "Almacén",
        "precio": 3.8,
        "stock": 130,
        "marca": "Taragüi"
    },
    {
        "id": 15,
        "nombre": "Agua mineral sin gas 2L",
        "categoria": "Bebidas",
        "precio": 1.0,
        "stock": 250,
        "marca": "Eco de los Andes"
    },
    {
        "id": 16,
        "nombre": "Gaseosa de cola 2.25L",
        "categoria": "Bebidas",
        "precio": 2.8,
        "stock": 180,
        "marca": "Coca-Cola"
    },
    {
        "id": 17,
        "nombre": "Cerveza rubia en lata 473ml",
        "categoria": "Bebidas",
        "precio": 1.6,
        "stock": 400,
        "marca": "Heineken"
    },
    {
        "id": 18,
        "nombre": "Jugo de naranja 1L",
        "categoria": "Bebidas",
        "precio": 2.2,
        "stock": 95,
        "marca": "Cepita"
    },
    {
        "id": 19,
        "nombre": "Manzana red delicious x1kg",
        "categoria": "Verdulería",
        "precio": 2.4,
        "stock": 70,
        "marca": "Finca Local"
    },
    {
        "id": 20,
        "nombre": "Banana de Ecuador x1kg",
        "categoria": "Verdulería",
        "precio": 1.95,
        "stock": 85,
        "marca": "Chiquita"
    },
    {
        "id": 21,
        "nombre": "Tomate redondo x1kg",
        "categoria": "Verdulería",
        "precio": 2.1,
        "stock": 65,
        "marca": "Finca Local"
    },
    {
        "id": 22,
        "nombre": "Papa blanca x1kg",
        "categoria": "Verdulería",
        "precio": 1.2,
        "stock": 150,
        "marca": "Finca Local"
    },
    {
        "id": 23,
        "nombre": "Pechuga de pollo 1kg",
        "categoria": "Carnicería",
        "precio": 6.5,
        "stock": 40,
        "marca": "Granja del Sol"
    },
    {
        "id": 24,
        "nombre": "Carne picada vacuna 1kg",
        "categoria": "Carnicería",
        "precio": 8.9,
        "stock": 35,
        "marca": "Carnes AR"
    },
    {
        "id": 25,
        "nombre": "Filet de merluza congelado 1kg",
        "categoria": "Pescadería",
        "precio": 9.5,
        "stock": 25,
        "marca": "Mar de Plata"
    },
    {
        "id": 26,
        "nombre": "Shampoo para cabello 400ml",
        "categoria": "Perfumería",
        "precio": 4.2,
        "stock": 110,
        "marca": "Sedal"
    },
    {
        "id": 27,
        "nombre": "Jabón de tocador x3 unidades",
        "categoria": "Perfumería",
        "precio": 2.6,
        "stock": 130,
        "marca": "Rexona"
    },
    {
        "id": 28,
        "nombre": "Detergente lavavajillas 500ml",
        "categoria": "Limpieza",
        "precio": 1.75,
        "stock": 160,
        "marca": "Magistral"
    },
    {
        "id": 29,
        "nombre": "Limpiador de pisos lavanda 1L",
        "categoria": "Limpieza",
        "precio": 2.1,
        "stock": 90,
        "marca": "Poett"
    },
    {
        "id": 30,
        "nombre": "Papel higiénico hojas simples x4",
        "categoria": "Limpieza",
        "precio": 3.4,
        "stock": 105,
        "marca": "Higienol"
    }
];

const MAX_JSON_SIZE = 100 * 1024;

async function obtenerNuevoId ()
{
    async function tomarIdentificadorObjeto (objeto)
    {
        if((typeof objeto === "object") && (typeof objeto !== "undefined") && (objeto !== null) && ("id" in objeto) && !Number.isNaN(objeto.id))
        {
            return productos[i].id;
        }
        return 0; // Cero no es un índice de registro válido
    }

    const minimo = 31;
    let nuevoIndiceAzar, i, identificador, tamVectorProductos = productos.length;
    do
    {
        nuevoIndiceAzar = Math.floor(Math.random() * (65535 - minimo + 1)) + minimo;
        i = 0;
        identificador = await tomarIdentificadorObjeto (productos[i]);
        while ((identificador !== 0) && (nuevoIndiceAzar !== identificador) && (i < tamVectorProductos))
        {
            i++;
            identificador = await tomarIdentificadorObjeto (productos[i]);
        }
    }
    while (nuevoIndiceAzar === identificador);
    return nuevoIndiceAzar;
}

export async function existeProductoPorNombre (nombreProducto)
{
    const producto = productos.find (productoParam => productoParam.nombre === nombreProducto);
    if (producto === undefined)
    {
        return false;
    }
    return true;
}

async function esIndiceRegistroValido (indiceRegistro)
{
    let i = 0;
    while (i < productos.length)
    {
        if (productos[i].id === indiceRegistro)
        {
            return i;
        }
        i++;
    }
    return -1;
}

export async function obtenerTodos()
{
    const stringJSON = JSON.stringify(productos);
    const cantidadBytesJSON = Buffer.byteLength(stringJSON, 'utf8');
    if (cantidadBytesJSON >= MAX_JSON_SIZE)
    {
        return null;
    }
    // El new Response intenta simular a una respuesta real de la función fetch,
    // por tal motivo, luego se hace el "if (respuesta.status == 200) { return respuesta.body; }",
    // como si fuera luego de un fetch, en caso que la respuesta sea exitosa se devolverá el "JSON.stringify(productos)",
    // caso contrario se devuelve null.
    const respuesta = new Response
    (
        productos,
        {
            status: 200,
            headers:
            {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }
    );
    if ((respuesta.status == 200) && (respuesta.headers.get('Content-Type')?.includes('application/json')))
    {
        return productos;
    }
    return null;
}

export async function obtenerPorId(id)
{
    return productos.find(producto => producto.id === id);
}

export async function crear(nombreParam, categoriaParam, precioParam, stockParam, marcaParam)
{
    if ((typeof nombreParam !== 'string') || (nombreParam.trim() === '') ||
        (typeof categoriaParam !== 'string') || (categoriaParam.trim() === '') ||
        (typeof marcaParam !== 'string') || (marcaParam.trim() === ''))
    {
        //console.log ('Falla 1');
        return null;
    }
    if (!nombreParam, !categoriaParam, !marcaParam)
    {
        //console.log ('Falla 2');
        return null;
    }
    if (await existeProductoPorNombre (nombreParam))
    {
        //console.log ('Falla 3');
        return null;
    }
    const numPrecioParam = Number(precioParam);
    const numStockParam = Number(stockParam);
    if ((typeof numPrecioParam !== 'number') || !Number.isFinite(numPrecioParam) ||
        (typeof numStockParam !== 'number') || !Number.isFinite(numStockParam))
    {
        //console.log (`Falla 4: ${typeof precioParam}, ${Number.isFinite(precioParam)}, ${typeof stockParam} y ${Number.isFinite(stockParam)}.`);
        return null;
    }
    const producto =
    {
        id: await obtenerNuevoId (),
        nombre: nombreParam,
        categoria: categoriaParam,
        precio: numPrecioParam,
        stock: numStockParam,
        marca: marcaParam
    };
    productos.push(producto);
    //console.log (`Producto agregado: { "id": "${producto.id}", "nombre": "${producto.nombre}, "categoria": "${producto.categoria}", "precio": "${producto.precio}", "stock": "${producto.stock}", "marca": "${producto.marca}" }`);
    return producto;
}

export async function modificar(idParam, nombreParam, categoriaParam, precioParam, stockParam, marcaParam)
{
    if ((typeof nombreParam !== 'string') || (nombreParam.trim() === '') ||
        (typeof categoriaParam !== 'string') || (categoriaParam.trim() === '') ||
        (typeof marcaParam !== 'string') || (marcaParam.trim() === ''))
    {
        return null;
    }
    if (!nombreParam, !categoriaParam, !marcaParam)
    {
        return null;
    }
    const numPrecioParam = Number(precioParam);
    const numStockParam = Number(stockParam);
    if ((typeof numPrecioParam !== 'number') || !Number.isFinite(numPrecioParam) ||
        (typeof numStockParam !== 'number') || !Number.isFinite(numStockParam))
    {
        return null;
    }
    if (await existeProductoPorNombre (nombreParam))
    {
        let i = 0;
        while (i < productos.length)
        {
            if (productos[i].nombre === nombreParam)
            {
                break;
            }
            i++;
        }
        if (productos[i].id !== idParam)
        {
            return null;
        }
    }
    const producto = productos.find(p => p.id === idParam);
    if (producto)
    {
        producto["nombre"] = nombreParam;
        producto["categoria"] = categoriaParam;
        producto["precio"] = numPrecioParam;
        producto["stock"] = numStockParam;
        producto["marca"] = marcaParam;
    }
    return producto;
}

export async function eliminar(id)
{
    const indice = productos.findIndex
    (
        producto => producto.id === id
    );
    if (indice === -1)
    {
        return false;
    }
    productos.splice(indice, 1);
    return true;
}
