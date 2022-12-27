const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    admins: {
      type: Array,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Admin", adminSchema);
