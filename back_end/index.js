import { configDotenv } from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routerUser from './routes/UserRoute.js';
import router from './routes/ProductRoute.js';

configDotenv();

const app = express();
const PORT = process.env.PORT;

//middlewares
console.clear()
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log('Connected to MongoDB');
}
)       .catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});


app.get('/hi', (req, res) => {
  res.send('Hello, World!');
}
);

app.use("/users",routerUser)  //user route
app.use("/products", router); // product route




app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}
);

export default app;