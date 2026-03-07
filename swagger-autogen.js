// swagger-autogen.js
import swaggerAutogen from "swagger-autogen";

const  doc = {
    info: {
        title: 'REST API',
        description: 'Auto-generated Swagger doc',
    },
    host: 'localhost:5000',
    Schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./app.js'];

swaggerAutogen()(outputFile, endpointsFiles, doc);