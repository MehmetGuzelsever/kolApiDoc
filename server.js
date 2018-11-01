const express     =require("express");
const cors        =require("cors");
const helmet      =require("helmet");
const morgan      =require("morgan");
const swaggerTool =require("swagger-tools");
const resolve     =require("json-refs").resolveRefs;
const YAML        =require("js-yaml");
const fs          =require("fs");
const port        =3000;


//Express App
const app = express();

//Middlewares Using
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());

   var root = YAML.safeLoad(fs.readFileSync("./index.yaml").toString());
   var options = {
     filter        : ['relative', 'remote'],
     loaderOptions : {
       processContent : function (res, callback) {
         callback(null, YAML.safeLoad(res.text));
       }
     }
   };

resolve(root,options).then(function(results){
    const swaggerDoc = results.resolved;
    //console.log(YAML.dump(swaggerDoc))
    swaggerTool.initializeMiddleware(swaggerDoc,function(middleware){
        
        app.use(middleware.swaggerUi());
    
        //Server
        app.listen(port,function(err){
        if(err){ console.log("Server Disconnected!!!"); }
        console.log("Server Connected");
    })
    })
})

