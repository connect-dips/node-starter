import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from 'morgan'
import logger from './logger/logger'
import config from './config/config'
import dbConnect from './db/connect'
import routers from './src/routers';

const port = config.port;
dbConnect();

logger.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev", { "stream": logger.stream }));

routers(app);

app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            title: 'error'
        });
    });
}

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
    });
});



app.listen(port, () => {
    logger.info('server started - ', port);
});
