import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import { router } from './src/routes/routes.js';
dotenv.config();

const port = parseInt(process.env.SERVER_PORT) || 3000;
const host = "RENDER" in process.env ? `0.0.0.0` : `0.0.0.0`;

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  res.send({ message: 'im healthy' });
});

app.use('/api', router);

app.listen(port, host, () => console.log('listening on port', port));