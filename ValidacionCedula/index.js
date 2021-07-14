/**
 * Created by CristianMino on 16/08/2016.
 */
'use strict';

var validacion = require('../ValidacionAuxiliar');

function validateEstaCedula(di){
    try{
        validacion.validarInicial(di, 10);
        validacion.validarCodigoProvincia(parseInt(di.substring(0,2)));
        validacion.validarTercerDigito(parseInt(di.substring(2,3)),'cedula');
        validacion.algoritmoModulo10(di.substring(0,9), parseInt(di.substring(9,10)));
        return true;
    }catch(err){
        return err;
    }
}

module.exports = validateEstaCedula;