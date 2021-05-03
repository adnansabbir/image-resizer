import express from 'express';
import {json} from "body-parser";
import {PrepareUploadUrl} from "./routes/prepare-upload.route";
import {errorHandler} from "./middlewares/error-handler";

const app = express();
app.use(json())

app.use(PrepareUploadUrl);

app.use(errorHandler);

app.listen(3000, () => {
    console.log('Listening to port 3000');
});
