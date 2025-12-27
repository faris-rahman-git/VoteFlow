import express from "express";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import nocache from "nocache";
import { BASE_ROUTE } from "./presentation/constants/routesConstants";

import pollRoute from "./presentation/express/routers/pollRoute";
import { errorHandler } from "./presentation/express/middlewares/errorHandler";

const app = express();
app.use(nocache());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(morgan("dev"));

// Rate Limiter
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // limit each IP to 100 requests
});
app.use(limiter);

// API Routes
app.use(BASE_ROUTE + "/poll", pollRoute);

app.use(errorHandler);

export default app;
