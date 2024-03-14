const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Budget API',
        description: 'Budgeting API with User Management'
    },
    host: 'localhost:3000',
    schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);