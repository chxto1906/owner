/**
 * Created by CristianMino on 16/08/2016.
 */
'use strict';

var validacion = require('../ValidacionAuxiliar');

function validateEsteRUCPublico(di){
    try{
        validacion.validarInicial(di, 13);
        validacion.validarCodigoProvincia(parseInt(di.substring(0,2)));
        validacion.validarTercerDigito(parseInt(di.substring(2,3)),'ruc_publica');
        validacion.validarCodigoEstablecimiento(parseInt(di.substring(9,4)));
        validacion.algoritmoModulo11(di.substring(0,8), parseInt(di.substring(8,9)),'ruc_publica');
        return true;
    }catch(err){
        return err;
    }
}

module.exports = validateEsteRUCPublico;