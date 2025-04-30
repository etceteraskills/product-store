import myExpress from 'express';
import dotenv from 'dotenv';
import path from 'path';  //Deployment
import { connectDB } from './Config/db.js';
import ProductRoutes from "./routes/product.route.js";

dotenv.config();

const app = myExpress();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve(); //Deployment


app.use(myExpress.json());

app.use('/api/products', ProductRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(myExpress.static(path.join(__dirname, '/frontend/dist'))); //Deployment
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html")); //Deployment
    });
}

console.log(process.env.NODE_ENV); //Deployment


app.listen(PORT, () => {
    connectDB();
    console.log('Server is running on http://localhost:' + PORT);
});






