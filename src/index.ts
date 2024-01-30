import express, {NextFunction} from "express"
import cors, {CorsOptions} from "cors"
import cookieParser from "cookie-parser";
import * as mongoose from "mongoose";
import * as dotenv from 'dotenv';
import {OpenController} from "./controllers/open.controller";
const app = express();
const corsOptions:CorsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
    credentials: true,
}
dotenv.config();
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(process.env.MONGODB_URI);
app.get('/open/:date',OpenController.getNotification)
app.listen(5000, () => {
    console.log("Hello server start!")
});
export default app