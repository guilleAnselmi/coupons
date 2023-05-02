import Debug from "debug";
import express from "express";
import { groupBy } from "../controllers/couponController";
import fs from "fs";
import path from "path";

const api = express.Router();
const debug = Debug("app:coupons");

api.get("/", (req, res) => {
  try {
    const tempObj = {};
    const db = JSON.parse(
      fs.readFileSync(path.join(__dirname, "../db/coupons.json"))
    );

    db.coupons.forEach((coupon) => {
      groupBy(tempObj, "promotion_type", coupon, [
        "percent-off",
        "dollar-off",
        "buy-one-get-one",
        "free-gift",
        "free-shipping",
      ]);
      groupBy(tempObj, "webshop_id", coupon);
    });

    res.status(200).json({
      couponsByType: tempObj.promotion_type,
      couponsByRetail: tempObj.webshop_id,
    });
  } catch (error) {
    debug(error)
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
});

export default api;
