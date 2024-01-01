const api = require("./api");
const apiAccount = require("./apiAccount");
const apiCar = require("./apiCar");
const apiService = require("./dichvu");
const errorHandler = require("../middleware/errorHandle");
let useRouter = (app) => {
  app.use("/api/v2", apiAccount);
  app.use("/api/v1", api);
  app.use("/api/car", apiCar);
  app.use("/api/service", apiService);
  app.use(errorHandler);
};
module.exports = useRouter;
