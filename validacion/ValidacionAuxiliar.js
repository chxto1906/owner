/**
 * Created by CristianMino on 16/08/2016.
 */



var exports = module.exports = {};


/**
 * Validaciones iniciales para CI y RUC
 *
 * @param  string  $numero      CI o RUC
 * @param  integer $caracteres  Cantidad de caracteres requeridos
 *
 * @return Boolean
 *
 * @throws exception Cuando valor esta vacio, cuando no es dígito y
 * cuando no tiene cantidad requerida de caracteres
 */
exports.validarInicial= function(numero, caracteres) {
    if(numero == null || numero.length == 0 || /^\s+$/.test(numero)){
        throw "Valor no puede estar vacio";
    }
    if(isNaN(numero)){
        throw "Valor tiene que ser numerico";
    }
    if(numero.length != caracteres){
        throw "Valor ingresado debe tener "+ caracteres+" caracteres";
    }
    return true;
}

/**
 * Validación de código de provincia (dos primeros dígitos de CI/RUC)
 *
 * @param  string  $numero  Dos primeros dígitos de CI/RUC
 *
 * @return boolean
 *
 * @throws exception Cuando el código de provincia no esta entre 00 y 24
 */
exports.validarCodigoProvincia = function(numero){
    //console.log(numero);
    if(numero < 0 || numero > 24 && numero != 30){
        throw "Codigo de provincia (dos primeros digitos) no deben ser mayor a 24 ni menor a 0";
    }
    return true;
}

/**
 * Validación de tercer dígito
 *
 * Permite validad el tercer dígito del documento. Dependiendo
 * del campo tipo (tipo de identificación) se realizan las validaciones.
 * Los posibles valores del campo tipo son: cedula, ruc_natural, ruc_privada
 *
 * Para Cédulas y RUC de personas naturales el terder dígito debe
 * estar entre 0 y 5 (0,1,2,3,4,5)
 *
 * Para RUC de sociedades privadas el terder dígito debe ser
 * igual a 9.
 *
 * Para RUC de sociedades públicas el terder dígito debe ser
 * igual a 6.
 *
 * @param  string $numero  tercer dígito de CI/RUC
 * @param  string $tipo  tipo de identificador
 *
 * @return boolean
 *
 * @throws exception Cuando el tercer digito no es válido. El mensaje
 * de error depende del tipo de Idenficiación.
 */
exports.validarTercerDigito = function(numero, tipo){
    //console.log(numero);
    switch(tipo){
        case 'cedula':
            break;
        case 'ruc_natural':
            if(numero < 0 || numero > 6){
                //Tercer dígito debe ser mayor o igual a 0 y menor a 6 para cédulas y RUC de persona natural
                throw "Tercer dígito para cédula o RUC de persona natural esta incorrecto";
            }
            break;
        case 'ruc_privada':
            if(numero != 9){
                //Tercer dígito debe ser igual a 9 para sociedades privadas
                throw "Tercer dígito para sociedades privadas esta incorrecto";
            }
            break;
        case 'ruc_publica':
            if(numero != 6){
                //Tercer dígito debe ser igual a 6 para sociedades públicas
                throw "Tercer dígito para sociedades públicas esta incorrecto";
            }
            break;
        default:
            throw "Tipo de identificación no existe";
    }
    return true;
}

/**
 * Validación de código de establecimiento
 *
 * @param  string $numero  tercer dígito de CI/RUC
 *
 * @return boolean
 *
 * @throws exception Cuando el establecimiento es menor a 1
 */
exports.validarCodigoEstablecimiento = function(numero){
    if (numero < 1) {
        throw'Código de establecimiento no puede ser 0';
    }
    return true;
}

/**
 * Algoritmo Modulo10 para validar si CI y RUC de persona natural son válidos.
 *
 * Los coeficientes usados para verificar el décimo dígito de la cédula,
 * mediante el algoritmo “Módulo 10” son:  2. 1. 2. 1. 2. 1. 2. 1. 2
 *
 * Paso 1: Multiplicar cada dígito de los digitosIniciales por su respectivo
 * coeficiente.
 *
 *  Ejemplo
 *  digitosIniciales posicion 1  x 2
 *  digitosIniciales posicion 2  x 1
 *  digitosIniciales posicion 3  x 2
 *  digitosIniciales posicion 4  x 1
 *  digitosIniciales posicion 5  x 2
 *  digitosIniciales posicion 6  x 1
 *  digitosIniciales posicion 7  x 2
 *  digitosIniciales posicion 8  x 1
 *  digitosIniciales posicion 9  x 2
 *
 * Paso 2: Sí alguno de los resultados de cada multiplicación es mayor a o igual a 10,
 * se suma entre ambos dígitos de dicho resultado. Ex. 12->1+2->3
 *
 * Paso 3: Se suman los resultados y se obtiene total
 *
 * Paso 4: Divido total para 10, se guarda residuo. Se resta 10 menos el residuo.
 * El valor obtenido debe concordar con el digitoVerificador
 *
 * Nota: Cuando el residuo es cero(0) el dígito verificador debe ser 0.
 *
 * @param  string $digitosIniciales   Nueve primeros dígitos de CI/RUC
 * @param  string $digitoVerificador  Décimo dígito de CI/RUC
 *
 * @return boolean
 *
 * @throws exception Cuando los digitosIniciales no concuerdan contra
 * el código verificador.
 */
exports.algoritmoModulo10 = function(digitosIniciales, digitoVerificador){
    var arrayCoeficientes = [2,1,2,1,2,1,2,1,2];
    digitosIniciales = digitosIniciales.split('');

    var total = 0;

	digitosIniciales.forEach(function(value, key){
		var valorPosicion = parseInt(value * arrayCoeficientes[key]);
        if(valorPosicion >= 10){
            var valorPosicionTmp = (valorPosicion+"").split('')
            valorPosicion = parseInt(valorPosicionTmp[0]) + parseInt(valorPosicionTmp[1]);
        }
        total = total + valorPosicion;
	});
		
    /*_.each(digitosIniciales, function(value, key){
        var valorPosicion = parseInt(value * arrayCoeficientes[key]);
        if(valorPosicion >= 10){
            var valorPosicionTmp = (valorPosicion+"").split('')
            valorPosicion = parseInt(valorPosicionTmp[0]) + parseInt(valorPosicionTmp[1]);
        }
        total = total + valorPosicion;
    });*/

    // angular.forEach(digitosIniciales, function(value, key){
    //     //console.log(value + ' '+ key);
    //     var valorPosicion = parseInt(value * arrayCoeficientes[key]);
    //     if(valorPosicion >= 10){
    //         var valorPosicionTmp = (valorPosicion+"").split('')
    //         valorPosicion = parseInt(valorPosicionTmp[0]) + parseInt(valorPosicionTmp[1]);
    //     }
    //     total = total + valorPosicion;
    // });

    var residuo = total % 10;
    var resultado;
    if(residuo == 0){
        resultado = residuo;
    }else{
        resultado = 10 - residuo;
    }

    if(resultado != digitoVerificador){
        throw 'Dígitos iniciales no validan contra Dígito Idenficador';
    }
    return true;
}


/**
 * Algoritmo Modulo11 para validar RUC de sociedades privadas y públicas
 *
 * El código verificador es el decimo digito para RUC de empresas privadas
 * y el noveno dígito para RUC de empresas públicas
 *
 * Paso 1: Multiplicar cada dígito de los digitosIniciales por su respectivo
 * coeficiente.
 *
 * Para RUC privadas el coeficiente esta definido y se multiplica con las siguientes
 * posiciones del RUC:
 *
 *  Ejemplo
 *  digitosIniciales posicion 1  x 4
 *  digitosIniciales posicion 2  x 3
 *  digitosIniciales posicion 3  x 2
 *  digitosIniciales posicion 4  x 7
 *  digitosIniciales posicion 5  x 6
 *  digitosIniciales posicion 6  x 5
 *  digitosIniciales posicion 7  x 4
 *  digitosIniciales posicion 8  x 3
 *  digitosIniciales posicion 9  x 2
 *
 * Para RUC privadas el coeficiente esta definido y se multiplica con las siguientes
 * posiciones del RUC:
 *
 *  digitosIniciales posicion 1  x 3
 *  digitosIniciales posicion 2  x 2
 *  digitosIniciales posicion 3  x 7
 *  digitosIniciales posicion 4  x 6
 *  digitosIniciales posicion 5  x 5
 *  digitosIniciales posicion 6  x 4
 *  digitosIniciales posicion 7  x 3
 *  digitosIniciales posicion 8  x 2
 *
 * Paso 2: Se suman los resultados y se obtiene total
 *
 * Paso 3: Divido total para 11, se guarda residuo. Se resta 11 menos el residuo.
 * El valor obtenido debe concordar con el digitoVerificador
 *
 * Nota: Cuando el residuo es cero(0) el dígito verificador debe ser 0.
 *
 * @param  string $digitosIniciales   Nueve primeros dígitos de RUC
 * @param  string $digitoVerificador  Décimo dígito de RUC
 * @param  string $tipo Tipo de identificador
 *
 * @return boolean
 *
 * @throws exception Cuando los digitosIniciales no concuerdan contra
 * el código verificador.
 */
exports.algoritmoModulo11 = function(digitosIniciales, digitoVerificador, tipo){

    switch(tipo){
        case 'ruc_privada':
            var arrayCoeficientes = [4, 3, 2, 7, 6, 5, 4, 3, 2];
            break;
        case 'ruc_publica':
            var arrayCoeficientes = [3, 2, 7, 6, 5, 4, 3, 2];
            break;
        default:
            throw 'Tipo de indentificacion no existe';
    }

    //var arrayCoeficientes = [2,1,2,1,2,1,2,1,2];
    digitosIniciales = digitosIniciales.split('');

    var total = 0;
	
	
	digitosIniciales.forEach(function(value, key){
		var valorPosicion = parseInt(value * arrayCoeficientes[key]);
        total = total + valorPosicion;
	});

    /*_.each(digitosIniciales, function(value, key){
        var valorPosicion = parseInt(value * arrayCoeficientes[key]);
        total = total + valorPosicion;
    });*/

    // angular.forEach(digitosIniciales, function(value, key){
    //     //console.log(value + ' '+ key);
    //     var valorPosicion = parseInt(value * arrayCoeficientes[key]);
    //     /*if(valorPosicion >= 10){
    //      var valorPosicionTmp = (valorPosicion+"").split('')
    //      valorPosicion = parseInt(valorPosicionTmp[0]) + parseInt(valorPosicionTmp[1]);
    //      }*/
    //     total = total + valorPosicion;
    // });

    var residuo = total % 11;
    var resultado;
    if(residuo == 0){
        resultado = residuo;
    }else{
        resultado = 11 - residuo;
    }

    if(resultado != digitoVerificador){
        throw 'Dígitos iniciales no validan contra Dígito Idenficador';
    }
    return true;
}

exports.validarPassword = function(password){

    if(password.length < 8){
        return false;
    }
    if(password.length > 16){
        return false;
    }
    if(!/[0-9]/.test(password)){
        return false;
    }
    if(!/[a-z]/.test(password)){
        return false;
    }
    if(!/[A-Z]/.test(password)){
        return false;
    }
    if(!/[!@#$%^&*]/.test(password)) {
        return false;
    }

    return true;
};
