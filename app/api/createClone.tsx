import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";
import openai from "../../lib/chatgpt";
import fs from "fs";
import path from "path";
import stream from "stream";
import { promisify } from "util";
import sharp from "sharp"; // Import sharp

const pipeline = promisify(stream.pipeline);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { cloneid, imgurl, prompt } = req.body;

      if (!cloneid || !imgurl || !prompt) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // Download the image
      const response = await fetch(imgurl);
      if (!response.ok)
        throw new Error(`Failed to fetch the image: ${response.statusText}`);

      const tempDir = "./tmp";
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
      }
      const tempPath = path.join(tempDir, `${cloneid}.png`);
      await pipeline(response.body, fs.createWriteStream(tempPath));

      // Determine the original image's size
      const originalImage = await sharp(tempPath).metadata();
      const originalImageSize = {
        width: originalImage.width,
        height: originalImage.height,
      };

      // Resize the mask to match the original image's size
      const maskPath = path.join(
        process.cwd(),
        "public",
        "images",
        "blank_empty.png"
      );
      const resizedMaskPath = path.join(tempDir, `resized_mask_${cloneid}.png`);
      await sharp(maskPath)
        .resize(originalImageSize.width, originalImageSize.height)
        .toFile(resizedMaskPath);

      // Send the image and resized mask to OpenAI for editing
      const editedImageResponse = await openai.images.edit({
        image: fs.createReadStream(tempPath),
        mask: fs.createReadStream(resizedMaskPath), // Use the resized mask
        prompt: prompt,
        user: cloneid,
        // Include other parameters as needed
      });

      // Cleanup the temporary files
      fs.unlinkSync(tempPath);
      fs.unlinkSync(resizedMaskPath);

      return res.status(200).json(editedImageResponse.data);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error processing image" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
