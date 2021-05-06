import express from 'express';
import {json} from "body-parser";
import {PrepareUploadUrl} from "./routes/prepare-upload-url.route";
import {errorHandler} from "./middlewares/error-handler";
import cors from 'cors';
import {ResizeImageRoute} from "./routes/resize-image.route";
import {BroadcastMessage} from "./routes/broadcast-message";

const app = express();
app.use(json())

app.use(cors());

app.use(PrepareUploadUrl);
app.use(ResizeImageRoute);
app.use(BroadcastMessage);

app.use(errorHandler);

app.listen(3000, () => {
    console.log('Listening to port 3000');
});
