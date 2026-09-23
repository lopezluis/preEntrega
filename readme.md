# Node.Js Pre Entrega

Finalizada la clase 4, el Jueves 3 de Septiembre de 2026, aún no sabemos mucho respecto a los requerimientos, nos dicen que lo sabremos en la clase 6. A modo de adelanto, el profesor nos mencionó que deberemos construir una aplicación empleando los json dados por:

~~~url
https://fakestoreapi.com/products
~~~

## Configuración Inicial

* Crea un directorio donde alojarás tu proyecto e incluye un archivo index.js como punto de entrada.
* Inicia Node.js y configura npm usando el comando npm init -y.
* Agrega la propiedad "type": "module" en el archivo package.json para habilitar ESModules.

Configura un script llamado start para ejecutar el programa con el comando npm run start.

## Lógica de Gestión de Productos

Con la base del proyecto lista, ahora necesitamos implementar las funcionalidades principales usando la API FakeStore. El sistema debe ser capaz de interpretar comandos ingresados en la terminal y ejecutar las siguientes acciones:

### Consultar Todos los Productos

Si ejecutas npm run start GET products, el programa debe realizar una petición asíncrona a la API y devolver la lista completa de productos en la consola.

Ejemplo: npm run start GET products

### Consultar un Producto Específico

Si ejecutas npm run start GET products/<productId>, el programa debe obtener y mostrar el producto correspondiente al productId indicado.

Ejemplo: npm run start GET products/15

### Crear un Producto Nuevo

Si ejecutas npm run start POST products <title> <price> <category>, el programa debe enviar una petición POST a la API para agregar un nuevo producto con los datos proporcionados (title, price, category) y devolver el resultado en la consola.

Ejemplo: npm run start POST products T-Shirt-Rex 300 remeras

### Eliminar un Producto

Si ejecutas npm run start DELETE products/<productId>, el programa debe enviar una petición DELETE para eliminar el producto correspondiente al productId y devolver la respuesta en la consola.

Ejemplo: npm run start DELETE products/7

### Tips de Desarrollo

* Usa process.argv para capturar y procesar los requerimientos ingresados por línea de comandos.
* Implementa fetch para interactuar con la API de FakeStore (consulta su documentación para más detalles).
* Aprovecha el uso de destructuring y spread para manipular los datos.
* Utiliza métodos de arrays y strings para separar cadenas de texto y conjuntos de información y aprovechar solo lo que necesites.

### Obtención del JSON

Primero obtendré el JSON vector de objetos con todos los productos, y lo pegaré al ejecutable localmente. En el momento que realicé la resolución de este ejercicio, la url "https://fakestoreapi.com/products", no responde, no me gustaría que el script que desarrolle, falle durante su corrección debido a que no dispongo de un JSON para resolver las peticiones del usuario. Entonces decido crear un JSON propio que será un vector de objetos, como solicita el ejercicio. El script, que utilicé, que no logró interactuar con la URL **https://fakestoreapi.com/products**, para descargar el JSON es el siguiente:

~~~javascript
#!/usr/bin/node
let response = {};
try
{
    response = await fetch('https://fakestoreapi.com/products');
}
catch (error)
{
    console.error("Error, datos no obtenidos: ", error.message);
    process.exit(1);
}
if (!response.ok)
{
    console.error(`Error, datos no obtenidos: ${response.status}`);
    process.exit(1);
}
const datos = await response.json();
console.log("JSON recibido con éxito:", datos);
process.exit(0);
~~~

### Significado de CRUD

| Letra | Operación | Significado | Método HTTP implementado por la API | Comando SQL | Descripción |
|---|---|---|---|---|---|
| C | Create | Crear | POST | INSERT | Añade un nuevo registro a la tabla. |
| R | Read | Leer / Obtener | GET | SELECT | Consulta y muestra los registros existentes, uno solo o la lista completa. |
| U | Update | Actualizar | PUT / PATCH | UPDATE | Modifica los datos de un registro ya existente. |
| D | Delete | Eliminar | DELETE | DELETE | Borra un registro permanentemente de la tabla. |

## Preguntas

La especificación de la consigna de la pre-entrega, o requerimientos del proyecto, es contradictoria o inconsistente, indica claramente "Queremos un entorno limpio y profesional", y luego solicita varios comandos:

* npm run start GET products
* npm run start GET products/15
* npm run start POST products T-Shirt-Rex 300 remeras
* npm run start DELETE products/7

Falta lo que quiero preguntar en segundo orden, por ejemplo, porque vendí una remera:

* npm run start PUT/PATCH products 5 T-Shirt-Rex 299 remeras

Estoy viendo otros problemas en los requisitos:

1. En un entorno profesional, no se le hacen requerimientos a una API por línea de comandos. La forma más coherente que encontré para escribir un software similar a algo profesional, es dividiendo el proyecto en 2 utilidades, de las cuales una es despreciable. Por un lado, la API escrita en forma profesional, que de ningún modo atiende a la línea de comandos, a no ser modificadores específicos necesarios para la ejecución inicial, de la API, o su reseteo para modificar la ejecución de la API. Al ejecutarse, queda recidente y escuchando un puerto de red, en donde recibe los requerimientos. Por otro lado, la utilidad que consume la API, que le dí categoría de despreciable, porque su único objetivo de acelerar el testeo, para evitar tener que hacer uso de "postman". Esta segunda utilidad, la escribí rápido, desprolija y poco profesional, es absolútamete reemplazable por "postman". ¿Hay algún problema que entregue solo la API y para su corrección, sea consumida via "postman", dado que en un entorno profesional una API se consume por red, incluso si se le provee seguridad a la API, se puede exponer a Internet, como corresponde?
2. Pregunta con respuesta corta, "si" o "no". ¿Por qué falta el verbo html PUT o PATCH? ¿Cómo se supone que se debería poder modificar un producto? En mi caso lo implementé, ¿hay algún problema que me haya tomado esta libertad?
3. Intercambios vía JSON: dado que el primer requerimiento es un GET products, implicaría que la API envie mucha información por red, para que la ejecución sea profesional, eficiente y única. Este intercambio es limitado, por ejemplo, a 100 kilobytes. En mi caso, no implementé paginación de red, ¿es obligatorio implementar alguna forma de paginación de red en la API, dado que se solicita un software profesional?
4. Seguridad: ¿Cuál es la mejor manera de implementarla en la API? Lo primero que se me ocurre es implementar un "POST acceso nombre-de-usuario md5-o-SHA-del-password", que me devuelva un token temporal, para poder usar en productos, y que al hacer uso de productos, reseteo la caducidad del token.
