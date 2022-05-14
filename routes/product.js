const { verifyToken, verifyAdmin } = require("../middlewares/verifyToken");
const { validateProduct } = require("../validation/product");
const Product = require("../models/Product");
const router = require("express").Router();

//CREATE
router.post("/create", [verifyToken, verifyAdmin], async (req, res) => {
  const { error } = validateProduct(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(201).send(savedProduct);
  } catch (err) {
    res.status(500).send(err);
  }
});

//UPDATE
router.put("/:id", [verifyToken, verifyAdmin], async (req, res) => {
  try {
    const updateProduct = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).send(updateProduct);
  } catch (err) {
    res.status(500).send(err);
  }
});

//DELETE
router.delete("/:id", [verifyToken, verifyAdmin], async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).send("Product has been deleted...");
  } catch (err) {
    res.status(500).send(err);
  }
});

//Get PRODUCT
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).send(product);
  } catch (err) {
    res.status(500).send(err);
  }
});

//GET ALL Products
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(4);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
