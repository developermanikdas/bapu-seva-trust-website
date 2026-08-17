const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    category: {
      type: String,
      enum: ["Education & Study Kits", "Women Skill Empowerment", "Environmental Green Drive", "Healthcare & Medical Camps", "Administrative & Operations"],
      required: true,
    },
    location: { type: String, default: "Bihar & Delhi" },
    beneficiaryCount: { type: Number, default: 0 },
    vendorOrRecipient: { type: String },
    invoiceNumber: { type: String },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Expense || mongoose.model("Expense", ExpenseSchema);
