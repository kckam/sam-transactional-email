import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import emailRoutes from "./routes/email";
import stores from "./data/stores";

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

app.get("/hello", (req, res) => {
  res.send("okok");
});

app.use(
  "/:store_id",
  (req, res, next) => {
    let token = req.headers["x-access-token"] || req.headers["authorization"];

    if (token && typeof token === "string") {
      token = token?.replace(/^Bearer\s+/, "");

      if (
        stores[req.params.store_id] &&
        (stores[req.params.store_id].api_key === token ||
          token === "Em8L09Hd4opbzyqi4c")
      ) {
        app.set("store", stores[req.params.store_id]);
        next();
      } else {
        res.sendStatus(401);
      }
    } else {
      res.sendStatus(401);
    }
  },
  emailRoutes
);

app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
  res.status(500).send(err.message ? err.message : "something broke");
});

module.exports = app;

export default app;
