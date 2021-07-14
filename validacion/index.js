/**
 * Created by CristianMino on 16/08/2016.
 */

'use strict';

var validacion = require('./ValidacionAuxiliar');

var exports = module.exports = {};

exports.validarCedula = function validacionCedula(di){
    try{
        validacion.validarInicial(di, 10);
        validacion.validarCodigoProvincia(parseInt(di.substring(0,2)));
        validacion.validarTercerDigito(parseInt(di.substring(2,3)),'cedula');
        validacion.algoritmoModulo10(di.substring(0,9), parseInt(di.substring(9,10)));
        return true;
    }catch(err){
        return err;
    }
};

exports.validarRUCNatural = function validateEsteRUCNatural(di){
    try{
        validacion.validarInicial(di, 13);
        validacion.validarCodigoProvincia(parseInt(di.substring(0,2)));
        validacion.validarTercerDigito(parseInt(di.substring(2,3)),'ruc_natural');
        validacion.algoritmoModulo10(di.substring(0,9), parseInt(di.substring(9,10)));
        return true;
    }catch(err){
        return err;
    }
};


exports.validarRUCPrivado = function validateEsteRUCPrivado(di){
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
};

exports.validarRUCPublico = function validateEsteRUCPublico(di){
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
};

exports.validarPassword = function validarPassword(password){
    try{

        return validacion.validarPassword(password);
    }catch(err){
        return err;
    }
};
