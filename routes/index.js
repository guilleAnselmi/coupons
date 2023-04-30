import { Router } from "express";
import coupons from "./coupons";
const router = Router();
const routes = [
  {
    path: "coupons",
    router: coupons,
  },
];

routes.forEach((route) => {
  router.use(`/${route.path}`, route.router);
});

export { routes, router };
export default router;
