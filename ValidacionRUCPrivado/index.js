/**
 * Created by CristianMino on 16/08/2016.
 */
'use strict';

var validacion = require('../ValidacionAuxiliar');

function validateEsteRUCPrivado(di){
    try{
        validacion.validarInicial(di, 13);
        validacion.validarCodigoProvincia(parseInt(di.substring(0,2)));
        validacion.validarTercerDigito(parseInt(di.substring(2,3)),'ruc_privada');
        validacion.validarCodigoEstablecimiento(parseInt(di.substring(10,3)));
        validacion.algoritmoModulo11(di.substring(0,9), parseInt(di.substring(9,10)),'ruc_privada');
        return true;
    }catch(err){
        return err;
    }
}

module.exports = validateEsteRUCPrivado;