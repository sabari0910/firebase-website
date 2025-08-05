'use server';

/**
 * @fileOverview A flow that suggests relevant tags for images using AI.
 *
 * - suggestImageTags - A function that suggests tags for an image.
 * - SuggestImageTagsInput - The input type for the suggestImageTags function.
 * - SuggestImageTagsOutput - The return type for the suggestImageTags function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestImageTagsInputSchema = z.object({
  imageUrl: z.string().describe('The URL of the image to suggest tags for.'),
  imageCaption: z.string().optional().describe('Optional caption describing the image.'),
});
export type SuggestImageTagsInput = z.infer<typeof SuggestImageTagsInputSchema>;

const SuggestImageTagsOutputSchema = z.object({
  tags: z.array(z.string()).describe('An array of suggested tags for the image.'),
});
export type SuggestImageTagsOutput = z.infer<typeof SuggestImageTagsOutputSchema>;

export async function suggestImageTags(input: SuggestImageTagsInput): Promise<SuggestImageTagsOutput> {
  return suggestImageTagsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestImageTagsPrompt',
  input: {schema: SuggestImageTagsInputSchema},
  output: {schema: SuggestImageTagsOutputSchema},
  prompt: `You are an expert image tag suggestion AI.

  Given an image URL and optional caption, you will suggest relevant tags for the image.
  Return ONLY an array of tags. Each tag must be a single word or short phrase.

  Image URL: {{{imageUrl}}}
  Caption: {{{imageCaption}}}
  `,
});

const suggestImageTagsFlow = ai.defineFlow(
  {
    name: 'suggestImageTagsFlow',
    inputSchema: SuggestImageTagsInputSchema,
    outputSchema: SuggestImageTagsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
