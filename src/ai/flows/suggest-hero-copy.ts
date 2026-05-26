'use server';
/**
 * @fileOverview A Genkit flow that suggests compelling hero section headlines and subheadings
 *               based on provided service descriptions.
 *
 * - suggestHeroCopy - A function that handles the hero copy suggestion process.
 * - SuggestHeroCopyInput - The input type for the suggestHeroCopy function.
 * - SuggestHeroCopyOutput - The return type for the suggestHeroCopy function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestHeroCopyInputSchema = z.object({
  services: z.array(z.object({
    title: z.string().describe('The title of the service.'),
    description: z.string().describe('A detailed description of the service.'),
  })).describe('A list of services provided by the company, including their titles and descriptions.'),
});
export type SuggestHeroCopyInput = z.infer<typeof SuggestHeroCopyInputSchema>;

const SuggestHeroCopyOutputSchema = z.object({
  headline: z.string().describe('A compelling and engaging headline for the hero section.'),
  subheading: z.string().describe('A catchy and informative subheading that complements the headline.'),
});
export type SuggestHeroCopyOutput = z.infer<typeof SuggestHeroCopyOutputSchema>;

export async function suggestHeroCopy(input: SuggestHeroCopyInput): Promise<SuggestHeroCopyOutput> {
  return suggestHeroCopyFlow(input);
}

const suggestHeroCopyPrompt = ai.definePrompt({
  name: 'suggestHeroCopyPrompt',
  input: {schema: SuggestHeroCopyInputSchema},
  output: {schema: SuggestHeroCopyOutputSchema},
  prompt: `You are an expert copywriter specialized in creating engaging marketing content for website hero sections.
The website has a professional, modern, and clean aesthetic, using vibrant blues and indigos, with clear typography.
Based on the following list of services, suggest a compelling headline and a catchy subheading for the company's website hero section.
The content should be engaging, introductory, concise, and reflect the core offerings of the company, aligning with the modern and professional brand image.

Services provided by the company:
{{#each services}}
- Title: {{{title}}}
  Description: {{{description}}}
{{/each}}

Please provide only the headline and subheading in a JSON format.`,
});

const suggestHeroCopyFlow = ai.defineFlow(
  {
    name: 'suggestHeroCopyFlow',
    inputSchema: SuggestHeroCopyInputSchema,
    outputSchema: SuggestHeroCopyOutputSchema,
  },
  async (input) => {
    const {output} = await suggestHeroCopyPrompt(input);
    return output!;
  },
);
