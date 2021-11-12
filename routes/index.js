const express = require('express');

const detalle = require('./detalle.router');
const documento = require('./documento.router');
const entidad = require('./entidad.router');
const tipoDocumento = require('./tipoDocumento.router');
const serie = require('./serie.router');

function routerApi(app) {
    const router = express.Router();
    app.use('/api/v1',router);
    router.use('/documentos',documento);
    // router.use('/entidades',entidad);
    // router.use('/series',serie);
    // router.use('/detalles', detalle);
    // router.use('/tipo_documentos',tipoDocumento);
}
module.exports = routerApi;