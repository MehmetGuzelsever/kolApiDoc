const express     =require("express");
const cors        =require("cors");
const helmet      =require("helmet");
const morgan      =require("morgan");
const swaggerUi   =require("swagger-ui-express");
const swaggerTool =require("swagger-tools");
const yaml        =require("yamljs");
const port        ="8080";


//Swagger Config Yaml File
const swaggerDoc = yaml.load('./swagger.yaml');

//Express App
const app = express();

//Middlewares Using
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());


//Swagger.io Serve
app.use('/docs',swaggerUi.serve, swaggerUi.setup(swaggerDoc));

//Server
app.listen(port,function(err){
    if(err){ console.log("Server Disconnected!!!"); }
    console.log("Server Connected");
})



//Swagger-tool Serve
/*swaggerTool.initializeMiddleware(swaggerDoc,function(middleware){
 
    app.use(middleware.swaggerValidator());
    
    app.use(middleware.swaggerUi());

    //Server
    app.listen(port,function(err){
    if(err){ console.log("Server Disconnected!!!"); }
    console.log("Server Connected");
})
})
*/
