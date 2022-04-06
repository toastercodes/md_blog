import dotenv from "dotenv";
import express from "express";
import methodOverride from "method-override";
import morgan from "morgan";
import path from "path";

import db from "./db";
import routes from "./routes";

dotenv.config();

const app = express();
const port = process.env.PORT;
const dbUri = process.env.DB_URI;

app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(methodOverride("_method"));

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs");

app.listen(port, () => {
    db(dbUri as string);
    routes(app);
    console.log(`Server started at http://localhost:${port}`);
});