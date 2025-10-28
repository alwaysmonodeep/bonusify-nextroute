import dbConnect from "@/lib/mongoose"; // ✅ only if configured
// adjust based on actual folder structure

export default async function handler(req, res) {
  await dbConnect();
  res.status(200).json({ status: "success", message: "MongoDB connected" });
}
