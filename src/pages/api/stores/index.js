// src/pages/api/stores/index.js
import dbConnect from "@/lib/mongoose";
import Store from "@/models/Store";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const stores = await Store.find({});
      res.status(200).json({ success: true, stores });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  } else {
    res.status(405).json({ message: "Only GET allowed" });
  }
}
