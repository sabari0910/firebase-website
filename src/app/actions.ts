"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

const uploadSchema = z.object({
  name: z.string().min(1, "Image name is required."),
  imageUrl: z.string().url("Please enter a valid URL."),
  tags: z.array(z.string()).min(1, "At least one tag is required."),
  userId: z.string(),
});

export async function uploadImageAction(data: {
  name: string;
  imageUrl: string;
  tags: string[];
  userId: string;
}) {
  const validationResult = uploadSchema.safeParse(data);

  if (!validationResult.success) {
    return {
      success: false,
      error: validationResult.error.flatten().fieldErrors,
    };
  }

  // In a real application, you would save this data to your database (e.g., Firestore).
  console.log("Image data to be saved:", validationResult.data);
  
  // For demonstration, we'll just return success.
  const newImage = {
    ...validationResult.data,
  };
  
  // Revalidate the home page to show the new image.
  // This works with optimistic updates on the client for a better UX.
  revalidatePath("/");

  return { success: true, data: newImage };
}
