const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const Product = require("./models/Product");

mongoose.connect("mongodb://127.0.0.1:27017/your_database");

async function cleanup() {

  const uploadsPath = path.join(__dirname, "uploads");

  const files = fs.readdirSync(uploadsPath);

  const products = await Product.find();

  const usedImages = products.map(p => {
    if (!p.image) return null;
    return p.image.replace("/uploads/", "");
  });

  files.forEach(file => {

    if (!usedImages.includes(file)) {

      const filePath = path.join(uploadsPath, file);

      fs.unlinkSync(filePath);

      console.log("Deleted:", file);

    }

  });

  console.log("Cleanup done");
  process.exit();

}

cleanup();