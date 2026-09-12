const express = require("express");
const router = express.Router();
const {addProduct, getAllProducts, getProductById, deleteProduct} = require("../controllers/productController");

router.post("/add", addProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.delete("/:id", deleteProduct);

module.exports = router;