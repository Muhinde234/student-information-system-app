const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
 const cors = require('cors');
 const swaggerUi = require('swagger-ui-express');
const swagger = require('./swagger.json');
const dotenv= require('dotenv');
dotenv.config();
const connection = process.env.MONGODB_URI ;
const PORT = process.env.PORT ;
const app = express();
const errorHandling = require('./Middleware/errorHandler');


 app.use(cors({
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
}));
app.use(express.json());
app.use(cookieParser());


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagger));

mongoose.connect(connection)
.then(() => {
    app.listen(PORT, () => {
        console.log("Mongo DB connected....");
        console.log(`Server running on ${PORT} ...`);
        console.log(`swagger is on http://localhost:5000/api-docs `)
    });
})
.catch((err) => console.log(err));
app.use(errorHandling);





