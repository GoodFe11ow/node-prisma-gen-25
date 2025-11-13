import express from 'express';
import bookRoutes from './routes/book.routes.js'

const app  = express();

const PORT = 3001;

app.get('/welcome', (request, response)=> {
    response.send("welcome to the server!");
});

app.use( '/api/v1', bookRoutes);

app.listen(PORT, ()=> {
    console.log(`server is running on http://localhost:${PORT}`)
});