const express = require("express");
const app = express();
const morgan = require("morgan");
const adminRoute = require("./routers/adminRoutes");
const clientRoute = require("./routers/clientRoutes");
const productsRoute = require("./routers/productsRoute");

app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,authorization,Accept-Language,X-Requested-With');


    if (req.method === 'OPTIONS') {
        res.setHeader("Access-Control-Allow-Methods", '*');
        // res.header("Access-Control-Allow-Methods",'Put,Post,Patch,Delete,Get,put');
        return res.status(200).json({});
    }

    next();

});

app.use('/api/admins' , adminRoute);
app.use('/api/products' , productsRoute);
app.use('/api/clients' , clientRoute);



app.use((req, res, next) => {
    const error = new Error('not found');
    error.status = 404;
    console.log(error);
    next(error);

})

app.use((error, req, res, next) => {

    res.status(error.status || 500);
    //if(error)	throw error;
    console.log(error)
    if (error.status == 404)
        res.json({
            error: {
                message: `not found 404`
            }

        });
    // console.log(error);

    else
        res.json({
            error: {
                massage: "App Crashing ",
                err: error.massage
            }
        });

})
module.exports = app;

