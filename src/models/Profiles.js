import mongoose from "mongoose";

const { Schema } = mongoose;

const profilesSchema = new Schema({
  id: {
    type: "Number",
  },
  name: {
    type: "String",
  },
  country: {
    name: {
      type: "String",
    },
    code: {
      type: "String",
    },
  },
  company: {
    type: "String",
  },
  date: {
    type: "Date",
  },
  status: {
    type: "String",
  },
  verified: {
    type: "Boolean",
  },
  activity: {
    type: "Number",
  },
  representative: {
    name: {
      type: "String",
    },
    image: {
      type: "String",
    },
  },
  balance: {
    type: "Number",
  },
});

export default mongoose.models.Profiles || mongoose.model("Profiles", profilesSchema);