import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';

dotenv.config();

// ============ Application ============ //

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

// ============ Run the Server ============ //

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
