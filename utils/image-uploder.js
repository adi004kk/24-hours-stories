import { put } from "@vercel/blob";

export const uploadToVercelBlob = async (file) => {
    const blob = await put(`stories/${Date.now()}_${file.name}`, file, {
        access: "public",
    });
    return blob.url;
};