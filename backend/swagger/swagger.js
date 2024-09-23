const swaggerJsDoc= require('swagger-jsdoc');
const swaggerUi=require('swagger-ui-express');

const swaggerOptions={
    swaggerDefinition:{
        openapi:"3.0.0",
        info:{
            title:"Admin API",
            version:"1.0.0",
            description:"API documentation for Admin management"
        },
        servers:[{url:"http://localhost:3000/api"}]

    },
    apis:["./routes/*.js"]
}

const swaggerDocs=swaggerJsDoc(swaggerOptions);
module.exports=(app)=>{
    app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocs));
}