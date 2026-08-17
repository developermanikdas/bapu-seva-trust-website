const mongoose = require("mongoose");

const AdminUserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    twoFactorPin: { type: String, required: true, default: "849201" },
    role: { type: String, default: "SuperAdmin" },
    lastLogin: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.models.AdminUser || mongoose.model("AdminUser", AdminUserSchema);
