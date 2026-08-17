const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Razorpay = require("razorpay");
const QRCode = require("qrcode");
const mongoose = require("mongoose");

const Transaction = require("./models/Transaction");
const Expense = require("./models/Expense");
const AdminUser = require("./models/AdminUser");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "bapu_seva_trust_jwt_secret_key_2026";

app.use(cors({ origin: "*" }));
app.use(express.json());

// In-Memory 2FA Session Store
const temp2FASessions = new Map();

// Default Admin Credentials (Password@123 & 2FA PIN: 849201)
const DEFAULT_ADMIN = {
  username: "admin@bapuseva.org",
  passwordPlain: "Password@123",
  twoFactorPin: "849201",
};

// MongoDB Connection
if (process.env.MONGODB_URI) {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(async () => {
      console.log("MongoDB Connected Successfully");
      // Seed default admin in MongoDB if not present
      try {
        const count = await AdminUser.countDocuments();
        if (count === 0) {
          const hash = await bcrypt.hash(DEFAULT_ADMIN.passwordPlain, 10);
          await AdminUser.create({
            username: DEFAULT_ADMIN.username,
            passwordHash: hash,
            twoFactorPin: DEFAULT_ADMIN.twoFactorPin,
            role: "SuperAdmin",
          });
          console.log("Default Admin User seeded in MongoDB.");
        }
      } catch (e) {
        console.error("Error seeding admin:", e.message);
      }
    })
    .catch((err) => console.error("MongoDB Connection Error:", err.message));
} else {
  console.log("MONGODB_URI not provided yet. Running with in-memory transaction store.");
}

// In-Memory Seed Data
let inMemoryTransactions = [
  {
    _id: "tx_101",
    donorName: "Rajesh Sharma",
    amount: 5000,
    currency: "INR",
    paymentMethod: "Razorpay Online",
    cause: "Education & School Study Kits (Bihar)",
    transactionId: "pay_Pq9812A81",
    status: "Success",
    recordedBy: "Gateway",
    date: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
  },
  {
    _id: "tx_102",
    donorName: "Anita Verma",
    amount: 10000,
    currency: "INR",
    paymentMethod: "Cash",
    cause: "Women's Skill & Tailoring Batches (Navi Mumbai)",
    transactionId: "cash_rec_88102",
    status: "Success",
    recordedBy: "Trust Staff (Manik Das)",
    date: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
  },
  {
    _id: "tx_103",
    donorName: "Dr. Vikram Sethi",
    amount: 2500,
    currency: "INR",
    paymentMethod: "Razorpay Online",
    cause: "Free Village Medical Checkup Camps",
    transactionId: "pay_Pq7719C92",
    status: "Success",
    recordedBy: "Gateway",
    date: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
  },
];

let inMemoryExpenses = [
  {
    _id: "exp_201",
    title: "500 Elementary Textbook & Stationery Kits Purchase",
    amount: 35000,
    category: "Education & Study Kits",
    location: "Gaya & Patna, Bihar",
    beneficiaryCount: 500,
    vendorOrRecipient: "Navneet Publications Ltd.",
    invoiceNumber: "INV-2025-091",
    date: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString(),
  },
  {
    _id: "exp_202",
    title: "15 Singer Sewing Machines for Women Skill Center",
    amount: 45000,
    category: "Women Skill Empowerment",
    location: "Navi Mumbai, Maharashtra",
    beneficiaryCount: 45,
    vendorOrRecipient: "Singer India Authorized Dealer",
    invoiceNumber: "INV-SNG-4412",
    date: new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString(),
  },
];

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const planCache = {};

// JWT Auth Protection Middleware
const verifyAdminToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access denied. Authentication token required." });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired session token. Please log in again." });
  }
};

// Health Check Endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    service: "Bapu Seva Trust Express Backend",
    mongoStatus: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected (In-Memory Fallback)",
  });
});

// AUTH 1: Step 1 Credential Login (Returns 2FA Session Challenge)
app.post("/api/admin/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required." });
    }

    let isValid = false;
    let twoFactorPin = DEFAULT_ADMIN.twoFactorPin;

    if (mongoose.connection.readyState === 1) {
      const user = await AdminUser.findOne({ username });
      if (user) {
        isValid = await bcrypt.compare(password, user.passwordHash);
        twoFactorPin = user.twoFactorPin;
      }
    } else {
      if (username === DEFAULT_ADMIN.username && password === DEFAULT_ADMIN.passwordPlain) {
        isValid = true;
      }
    }

    if (!isValid) {
      return res.status(401).json({ error: "Invalid username or password." });
    }

    // Generate 2FA Challenge Session ID
    const tempSessionId = crypto.randomBytes(16).toString("hex");
    temp2FASessions.set(tempSessionId, {
      username,
      twoFactorPin,
      createdAt: Date.now(),
    });

    res.json({
      require2FA: true,
      tempSessionId,
      message: "Credentials verified. Please enter your 6-digit 2FA Security PIN.",
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Authentication failed." });
  }
});

// AUTH 2: Step 2 2FA PIN Verification (Issues Signed JWT Token)
app.post("/api/admin/verify-2fa", (req, res) => {
  try {
    const { tempSessionId, pin } = req.body;

    if (!tempSessionId || !pin) {
      return res.status(400).json({ error: "Session ID and 2FA PIN code are required." });
    }

    const session = temp2FASessions.get(tempSessionId);
    if (!session) {
      return res.status(401).json({ error: "2FA session expired. Please log in again." });
    }

    // Validate 2FA PIN (Matches 849201 or stored PIN)
    if (String(pin).trim() !== String(session.twoFactorPin).trim()) {
      return res.status(401).json({ error: "Invalid 2FA Security PIN code." });
    }

    // Clean up session & issue JWT Token
    temp2FASessions.delete(tempSessionId);

    const token = jwt.sign(
      { username: session.username, role: "SuperAdmin" },
      JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({
      success: true,
      message: "2FA Authentication Successful!",
      adminToken: token,
      user: { username: session.username, role: "SuperAdmin" },
    });
  } catch (error) {
    console.error("2FA Verification error:", error);
    res.status(500).json({ error: "2FA Verification failed." });
  }
});

// AUTH 3: Check Active Admin Session Token
app.get("/api/admin/me", verifyAdminToken, (req, res) => {
  res.json({ success: true, user: req.admin });
});

// 1. Create One-Time Payment Order
app.post("/api/payment/create-order", async (req, res) => {
  try {
    const { amount, currency = "INR", cause, donorName, donorEmail, donorPan } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid donation amount" });
    }

    const options = {
      amount: Math.round(amount * 100),
      currency: currency,
      receipt: `receipt_bst_${Date.now()}`,
      notes: {
        cause: cause || "General Fund",
        donorName: donorName || "Anonymous",
        donorEmail: donorEmail || "",
        donorPan: donorPan || "",
      },
    };

    const order = await razorpay.orders.create(options);

    res.json({
      orderId: order.id,
      currency: order.currency,
      amount: order.amount,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ error: error.message || "Failed to create payment order" });
  }
});

// 2. Create Recurring Monthly Subscription Order
app.post("/api/payment/create-subscription", async (req, res) => {
  try {
    const { amount, cause, donorName, donorEmail } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid subscription amount" });
    }

    const planAmountPaise = Math.round(amount * 100);
    let planId = planCache[planAmountPaise];

    if (!planId) {
      const plan = await razorpay.plans.create({
        period: "monthly",
        interval: 1,
        item: {
          name: `BST Monthly Support ₹${amount}`,
          amount: planAmountPaise,
          currency: "INR",
          description: `Monthly recurring donation towards ${cause || "General Fund"}`,
        },
      });
      planId = plan.id;
      planCache[planAmountPaise] = planId;
    }

    const subscription = await razorpay.subscriptions.create({
      plan_id: planId,
      total_count: 12,
      quantity: 1,
      customer_notify: 1,
      notes: {
        cause: cause || "General Fund",
        donorName: donorName || "Anonymous",
        donorEmail: donorEmail || "",
      },
    });

    res.json({
      subscriptionId: subscription.id,
      amount: planAmountPaise,
      currency: "INR",
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Error creating Razorpay subscription:", error);
    res.status(500).json({ error: error.message || "Failed to create monthly subscription" });
  }
});

// 3. Verify One-Time Payment Signature & Record Inflow
app.post("/api/payment/verify-signature", async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, donorName, amount, cause, donorEmail } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: "Missing payment parameters for verification" });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;
    const generatedSignature = crypto
      .createHmac("sha256", secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, error: "Payment verification failed" });
    }

    const recordData = {
      donorName: donorName || "Generous Donor",
      amount: Number(amount) || 1000,
      currency: "INR",
      paymentMethod: "Razorpay Online",
      cause: cause || "General Fund",
      transactionId: razorpay_payment_id,
      orderId: razorpay_order_id,
      donorEmail: donorEmail || "",
      status: "Success",
      recordedBy: "Razorpay Gateway",
      date: new Date(),
    };

    if (mongoose.connection.readyState === 1) {
      await Transaction.create(recordData);
    } else {
      inMemoryTransactions.unshift({ _id: `tx_${Date.now()}`, ...recordData });
    }

    res.json({
      success: true,
      message: "Payment verified and recorded successfully",
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
    });
  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({ error: error.message || "Verification error" });
  }
});

// 4. Verify Subscription Signature & Record Inflow
app.post("/api/payment/verify-subscription", async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_subscription_id, razorpay_signature, donorName, amount, cause } = req.body;

    if (!razorpay_payment_id || !razorpay_subscription_id || !razorpay_signature) {
      return res.status(400).json({ error: "Missing subscription verification parameters" });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;
    const generatedSignature = crypto
      .createHmac("sha256", secret)
      .update(`${razorpay_payment_id}|${razorpay_subscription_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, error: "Subscription signature verification failed" });
    }

    const recordData = {
      donorName: donorName || "Monthly Donor",
      amount: Number(amount) || 1000,
      currency: "INR",
      paymentMethod: "Razorpay Subscription",
      cause: cause || "Monthly Recurring Fund",
      transactionId: razorpay_payment_id,
      orderId: razorpay_subscription_id,
      status: "Success",
      recordedBy: "Razorpay Subscriptions",
      date: new Date(),
    };

    if (mongoose.connection.readyState === 1) {
      await Transaction.create(recordData);
    } else {
      inMemoryTransactions.unshift({ _id: `tx_${Date.now()}`, ...recordData });
    }

    res.json({
      success: true,
      message: "Subscription payment verified and recorded successfully",
      paymentId: razorpay_payment_id,
      subscriptionId: razorpay_subscription_id,
    });
  } catch (error) {
    console.error("Subscription verification error:", error);
    res.status(500).json({ error: error.message || "Subscription verification error" });
  }
});

// 5. Generate Server-Side Base64 PNG UPI QR Code
app.post("/api/payment/create-qr", async (req, res) => {
  try {
    const { amount = 2500, cause = "General Fund" } = req.body;
    const upiUri = `upi://pay?pa=bapuseva@upi&pn=Bapu%20Seva%20Trust&am=${amount}&cu=INR&tn=${encodeURIComponent("Donation towards " + cause)}`;

    const qrDataUrl = await QRCode.toDataURL(upiUri, {
      width: 260,
      margin: 2,
      color: {
        dark: "#166534",
        light: "#FFFFFF",
      },
    });

    res.json({
      qrCodeUrl: qrDataUrl,
      upiId: "bapuseva@upi",
      amount,
      currency: "INR",
    });
  } catch (error) {
    console.error("QR Generation error:", error);
    res.status(500).json({ error: "Failed to generate server-side QR Code" });
  }
});

// 6. PROTECTED: Record Manual Cash / Offline Donation (Requires JWT Auth Token)
app.post("/api/payment/record-cash", verifyAdminToken, async (req, res) => {
  try {
    const { donorName, amount, cause, donorEmail, donorPan, notes } = req.body;

    if (!donorName || !amount || amount <= 0) {
      return res.status(400).json({ error: "Donor Name and valid Amount are required." });
    }

    const cashRecord = {
      donorName,
      amount: Number(amount),
      currency: "INR",
      paymentMethod: "Cash",
      cause: cause || "General Fund",
      transactionId: `cash_rec_${Date.now()}`,
      donorEmail: donorEmail || "",
      donorPan: donorPan || "",
      status: "Success",
      recordedBy: `Staff Admin (${req.admin.username})`,
      date: new Date(),
    };

    let result;
    if (mongoose.connection.readyState === 1) {
      result = await Transaction.create(cashRecord);
    } else {
      result = { _id: `tx_cash_${Date.now()}`, ...cashRecord };
      inMemoryTransactions.unshift(result);
    }

    res.json({
      success: true,
      message: "Cash donation recorded successfully into public transparency ledger.",
      record: result,
    });
  } catch (error) {
    console.error("Error recording cash donation:", error);
    res.status(500).json({ error: error.message || "Failed to record cash donation" });
  }
});

// 7. Get Financial Transparency Feed & Summary (Public View-Only)
app.get("/api/payment/transactions", async (req, res) => {
  try {
    let rawTransactions = [];
    let expenses = [];

    if (mongoose.connection.readyState === 1) {
      // 1. Fetch from 'transactions' collection
      rawTransactions = await Transaction.find().lean();
      expenses = await Expense.find().lean();

      // 2. Scan for any custom collections created manually (e.g. cashregisters, donations, cash)
      try {
        const collections = await mongoose.connection.db.listCollections().toArray();
        for (const col of collections) {
          const colName = col.name.toLowerCase();
          if (
            colName !== "transactions" &&
            colName !== "expenses" &&
            colName !== "adminusers" &&
            !colName.startsWith("system.")
          ) {
            const extraDocs = await mongoose.connection.db.collection(col.name).find().toArray();
            rawTransactions = [...rawTransactions, ...extraDocs];
          }
        }
      } catch (colErr) {
        console.error("Collection scanning notice:", colErr.message);
      }
    } else {
      rawTransactions = inMemoryTransactions;
      expenses = inMemoryExpenses;
    }

    // 3. Normalize all transaction fields (handles alternate field names like 'name', 'cashAmount', etc.)
    const transactions = rawTransactions
      .map((t) => {
        const amt = Number(t.amount || t.cashAmount || t.value || t.total || t.rupees || 0);
        return {
          _id: t._id ? t._id.toString() : `tx_${Date.now()}_${Math.random()}`,
          donorName: t.donorName || t.name || t.donor || t.nameOfDonor || "Anonymous Donor",
          amount: amt,
          currency: t.currency || "INR",
          paymentMethod: t.paymentMethod || t.paymentType || t.method || "Cash",
          cause: t.cause || t.purpose || t.reason || "General Fund & Where Needed Most",
          transactionId: t.transactionId || (t._id ? t._id.toString() : `rec_${Date.now()}`),
          donorEmail: t.donorEmail || t.email || "",
          donorPan: t.donorPan || t.pan || "",
          status: t.status || "Success",
          recordedBy: t.recordedBy || "MongoDB Direct Entry",
          date: t.date ? new Date(t.date) : t.createdAt ? new Date(t.createdAt) : new Date(),
        };
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    const totalInflow = transactions.reduce((sum, item) => sum + (item.amount || 0), 0);
    const totalOutflow = expenses.reduce((sum, item) => sum + (item.amount || 0), 0);
    const netBalance = totalInflow - totalOutflow;

    res.json({
      summary: {
        totalInflow,
        totalOutflow,
        netBalance,
        donorCount: transactions.length,
        expenseCount: expenses.length,
      },
      transactions,
      expenses,
    });
  } catch (error) {
    console.error("Error fetching financial transparency feed:", error);
    res.status(500).json({ error: "Failed to fetch financial transparency feed" });
  }
});

app.listen(PORT, () => {
  console.log(`Bapu Seva Trust Backend running on http://localhost:${PORT}`);
});
