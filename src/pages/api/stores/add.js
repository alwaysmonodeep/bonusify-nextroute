// src/pages/api/stores/add.js
import dbConnect from "@/lib/mongoose";
import Store from "@/models/Store";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
  try {
    const store = await Store.create(req.body);
    return res.status(201).json({ success: true, store });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
      error: err.errors || null,
    });
  }
}
