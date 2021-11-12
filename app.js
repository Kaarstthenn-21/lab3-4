const express = require('express');
const documentRouter = require('./routes/documento.router')
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const exhbs = require('express-handlebars');
const path = require('path');
const {
    logErrors,
    errorHandler,
    boomErrorHandler,
    ormErrorHandler,
} = require('./middlewares/error.handler');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));
app.use(morgan('tiny'));
require('dotenv/config');
const connection = process.env.CONNECTION_STRING
mongoose.connect(`${connection}`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Database Connection is ready ... :)');
    })
    .catch((err) => {
        console.log(err)
    })

const whitelist = ['http://localhost:8080', 'https://myapp.co'];
const options = {
    origin: (origin, callback) => {
        if (whitelist.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('no permitido'));
        }
    },
};
app.set('views', path.join(__dirname,'views'));
app.engine('.hbs',exhbs({
    defaultLayout: 'main',
    layoutsDir:path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname: '.hbs'
}));
app.set('view engine','.hbs');
app.get('/api/v1/',(req,res,next)=>{
    res.render('index');
})
app.get('/',(req,res,next)=>{
    res.render('index');
})
app.use(cors(options));
app.use(documentRouter)
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
})