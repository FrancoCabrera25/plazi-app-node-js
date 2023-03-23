const express = require('express');
//const routerApi = require('./routes');
const cors = require('cors');
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
} = require('./middlewares/error.handler');

const app = express();
const port = 3000;
// const whiteList = [];
// const options = {
//   origin: (origin, callback) =>{
//       if(whiteList.includes(origin)){
//         callback(null, true);
//       }else{
//         callback(new Error('acceso no permitido'));
//       }
//   }
// }
app.use(express.json());
app.use(cors());
//app.use(cors(options));

app.get('/', (req, res) => {
  res.send(`Hola mi app con node esta corriendo en el ${port}`);
});

app.get('/nueva-ruta', (req, res) => {
  res.json({
    message: 'hola nueva ruta',
  });
});

//routerApi(app);
try {
  app.use(logErrors);
  app.use(ormErrorHandler);
  app.use(boomErrorHandler);
  app.use(errorHandler);
} catch (e) {
  console.log('error load', e);
}

app.listen(port, () => {
  console.log(`app running ${port}`);
});

module.exports = app;
