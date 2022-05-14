const Cart = require("../models/Cart");
const { verifyToken, verifyAdmin } = require("../middlewares/verifyToken");

const router = require("express").Router();

//CREATE
router.post("/", verifyToken, async (req, res) => {
  const newCart = new Cart({
    userId: req.user._id,
    products: req.body.products,
    totalQuantity: req.body.totalQuantity,
    totalPrice: req.body.totalPrice,
  });
  try {
    const savedCart = await newCart.save();
    res.status(200).send(savedCart);
  } catch (err) {
    res.status(500).send(err);
  }
});

//UPDATE
router.put("/", verifyToken, async (req, res) => {
  try {
    const cartt = await Cart.findOneAndUpdate(
      { userId: req.user._id },
      {
        products: req.body.products,
        totalQuantity: req.body.totalQuantity,
        totalPrice: req.body.totalPrice,
      },
      { new: true }
    );
    res.status(200).send(cartt);
  } catch (err) {
    res.status(500).send(err);
  }
});

//DELETE
router.delete("/:id", [verifyToken, verifyAdmin], async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).send("Cart has been deleted...");
  } catch (err) {
    res.status(500).send(err);
  }
});

//GET USER CART
router.get("/", verifyToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    res.status(200).send(cart);
  } catch (err) {
    res.status(500).send(err);
  }
});

//GET ALL
// router.get("/", [verifyToken, verifyAdmin], async (req, res) => {
//   try {
//     const carts = await Cart.find();
//     res.status(200).json(carts);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
