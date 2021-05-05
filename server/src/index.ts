import express from 'express';
import {json} from "body-parser";
import {PrepareUploadUrl} from "./routes/prepare-upload-url.route";
import {errorHandler} from "./middlewares/error-handler";
import cors from 'cors';
import {ResizeImageRoute} from "./routes/resize-image.route";

const app = express();
app.use(json())

const allowedOrigins = ['http://localhost:4200'];
const corsOptions: cors.CorsOptions = {
    origin: allowedOrigins
}
app.use(cors(corsOptions));

app.use(PrepareUploadUrl);
app.use(ResizeImageRoute);

app.use(errorHandler);

app.listen(3000, () => {
    console.log('Listening to port 3000');
});
