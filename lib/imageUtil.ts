import { moveAsync, documentDirectory, makeDirectoryAsync } from "expo-file-system";
import * as FileSystem from "expo-file-system";

/**
 * Save an image to app data under a directory named after the predicted class,
 * with the image name including the date and time.
 * 
 * @param {string} imageUri - The URI of the image to save.
 * @param {string} classification - The predicted class name.
 * @param {number} confidence - The confidence level of the prediction.
 */
export const saveClassifiedImage = async (
  imageUri: string,
  classification: string,
  confidence: number
) => {
  try {
    // Sanitize classification for directory naming
    const sanitizedClass = classification.replace(/[^a-zA-Z0-9_-]/g, "_");

    // Format confidence value
    const sanitizedConfidence = confidence.toFixed(2).replace(".", "_");

    // Generate timestamp for the file name (YYYYMMDD_HHMMSS format)
    const now = new Date();
    const timestamp = now
      .toISOString()
      .replace(/:/g, "_") // Replace ':' with '-'
      .replace(/\./g, "_") // Replace ':' with '-'
      .replace(/-/g, "_") // Replace '-' with '_'
      .replace(/T/, "-") // Replace 'T' with '_'

    // Create directory path
    const directoryPath = `${documentDirectory}images/${sanitizedClass}`;

    // Create the directory if it doesn't exist
    await makeDirectoryAsync(directoryPath, { intermediates: true });

    // Add date and time to the image name
    const filePath = `${directoryPath}/${sanitizedConfidence}-${timestamp}-1.jpg`;

    // Move the image to the destination
    await moveAsync({
      from: imageUri,
      to: filePath,
    });

    console.log("Image saved successfully:", filePath);
  } catch (error) {
    console.error("Error saving image:", error);
  }
};
