const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    donorName: { type: String, default: "Anonymous Donor" },
    amount: { type: Number, default: 0 },
    currency: { type: String, default: "INR" },
    paymentMethod: { type: String, default: "Cash" },
    cause: { type: String, default: "General Fund & Where Needed Most" },
    transactionId: { type: String },
    orderId: { type: String },
    donorEmail: { type: String },
    donorPan: { type: String },
    status: { type: String, default: "Success" },
    recordedBy: { type: String, default: "System" },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true, strict: false }
);

module.exports = mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema);
