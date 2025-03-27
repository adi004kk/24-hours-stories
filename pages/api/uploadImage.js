import { put } from "@vercel/blob";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { file } = req.body;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const blob = await put(`uploads/${Date.now()}.jpg`, file, {
      access: "public",
    });
    res.status(201).json({ imageUrl: blob.url });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
