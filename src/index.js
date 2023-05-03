import {} from "dotenv/config";
import { app } from "./app";
import Debug from "debug";
const debug = Debug("app:index");

(async () => {
  try {
    app.listen(process.env.SERVER_PORT, () => {
      debug(`servidor corriendo en puerto ${process.env.SERVER_PORT}`);
    });
  } catch (error) {
    debug(error);
  }
})();
