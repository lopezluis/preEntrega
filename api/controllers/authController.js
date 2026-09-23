let authentication = {};

export async function isAuthenticated(user)
{
    if ((user == 'Luis') && ((new Date()) < authentication.fin))
    {
        return true;
    }
    return false;
}

export async function authenticate(user, password)
{
    // Aquí, se debería consultar una base de datos o servicio externo de autenticación,
    // para esta proyecto de pre-entrega muy básico, solo hago un "if",
    // quitándole sentido a que esté dentro de un "try ... catch"
    if ((parametros.usuario == 'Luis') && (parametros.contrasena == 'adb0f239ee4befb768b025bf767736dc8f977e3b80ec1b98542e1b5b7d94257da9081c47cd55045d2b56688cc7be984abd92b5b34307fa9327f49fcf0b396b04'))
    {
        authentication = {"usuario": parametros.usuario, "fin": new Date((new Date()).getTime() + 5 * 60 * 1000)};
        return true;
    }
    return false;
}
