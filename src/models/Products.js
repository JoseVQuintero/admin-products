import mongoose from "mongoose";

const { Schema } = mongoose;

const productsSchema = new Schema({
  description: {
    type: "String",
  },
  category: {
    type: "String",
  },
  subCategory: {
    type: "String",
  },
  productType: {
    type: "String",
  },
  ingramPartNumber: {
    type: "String",
  },
  vendorPartNumber: {
    type: "String",
  },
  upcCode: {
    type: "String",
  },
  vendorName: {
    type: "String",
  },
  endUserRequired: {
    type: "String",
  },
  hasDiscounts: {
    type: "String",
  },
  type: {
    type: "String",
  },
  discontinued: {
    type: "String",
  },
  newProduct: {
    type: "String",
  },
  directShip: {
    type: "String",
  },
  hasWarranty: {
    type: "String",
  },
  replacementSku: {
    type: "String",
  },
  authorizedToPurchase: {
    type: "String",
  },
  links: {
    type: ["Mixed"],
  },
});

export default mongoose.models.Products || mongoose.model("Products", productsSchema);