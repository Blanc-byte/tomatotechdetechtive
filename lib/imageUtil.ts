import { moveAsync, documentDirectory, makeDirectoryAsync } from "expo-file-system";
import * as FileSystem from "expo-file-system";

/**
 * Save an image to app data under a directory named after the predicted class.
 * 
 * @param {string} imageUri - The URI of the image to save.
 * @param {string} predictedClass - The predicted class name.
 * @param {number} confidence - The confidence level of the prediction.
 */
export const saveClassifiedImage = async (
    imageUri: string,
    classification: string,
    confidence: number
  ) => {
    try {
      const sanitizedClass = classification.replace(/[^a-zA-Z0-9_-]/g, "_"); // Sanitize classification
      const sanitizedConfidence = confidence.toFixed(2).replace(".", "_"); // Sanitize confidence
      const directoryPath = `${documentDirectory}images/${sanitizedClass}`;
  
      // Create the directory if it doesn't exist
      await makeDirectoryAsync(directoryPath, { intermediates: true });
  
      const filePath = `${directoryPath}/${sanitizedConfidence}.jpg`;
  
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
