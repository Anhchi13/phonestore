const express = require("express");
const router = express.Router();
const Brand = require("../models/Brand");

// CREATE
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const slug = name.toLowerCase().replace(/\s+/g, "-");

    const brand = new Brand({ name, slug });
    await brand.save();

    res.json({ message: "Brand created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL
router.get("/", async (req, res) => {
  const brands = await Brand.find();
  res.json(brands);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Brand.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

router.delete("/:id", async (req, res) => {
  await Brand.findByIdAndDelete(req.params.id);
  res.json({ message: "Brand deleted" });
});

module.exports = router;