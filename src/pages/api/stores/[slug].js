import dbConnect from "@/lib/mongoose";
import Store from "@/models/Store";

export default async function handler(req, res) {
  const { slug } = req.query;

  await dbConnect();

  if (req.method !== "GET") {
    return res.status(405).json({ 
      success: false, 
      message: "Only GET method allowed" 
    });
  }

  try {
    if (!slug || typeof slug !== 'string') {
      return res.status(400).json({ 
        success: false, 
        message: "Valid slug is required" 
      });
    }

    const store = await Store.findOne({ 
      slug: slug.toLowerCase(), // Normalize slug
    });

    if (!store) {
      return res.status(404).json({ 
        success: false, 
        message: "Store not found" 
      });
    }

    res.status(200).json({ success: true, data: store });
  } catch (error) {
    console.error("Store fetch error:", error); // Add logging
    res.status(500).json({ 
      success: false, 
      message: "Server Error", 
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
}