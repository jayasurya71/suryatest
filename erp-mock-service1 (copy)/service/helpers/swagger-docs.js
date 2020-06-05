const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    swaggerDefinition: {
        info: {
            title: '',
            description: ''
        },
        tags: [
        ]
    },
    basePath: '/api',
    produces: [
        'application/json'
    ],
    // Path to the controller files swagger-definitions.js
    apis: [`${__dirname}/../controller/*.js`],
};

function getSwaggerSpecs() {
    const spec = swaggerJSDoc(options);
    const definitions = spec.paths.definitions;
    delete spec.paths.definitions;
    spec.definitions = definitions;
    return spec;
}

// Swagger
const swaggerSpec = getSwaggerSpecs();

function initSwagger(app) {
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, false, { validatorUrl: null }));
}

module.exports = { initSwagger };
