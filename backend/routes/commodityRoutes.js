const express = require("express");

const router = express.Router();
const authController = require("../controller/authController");
const commodityController = require("../controller/commodityController");

// Public routes
router.get("/browse", commodityController.getProducts);
router.get("/browse/:id", commodityController.getProduct);

router.use(authController.protect);
// Protected sell routes
router.post("/sell", commodityController.createProduct);
router.get("/sell", commodityController.getProductsToSell);

// Protected buy routes
router.get("/buy", commodityController.getPurchasedProducts);
router.patch("/buy/:id", commodityController.buyProduct);

module.exports = router;
