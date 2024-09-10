import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!, // Make sure the environment variable is set correctly
});

/**
 * Categorize an email into specific categories.
 * @param emailContent The content of the email to be categorized.
 * @returns A promise that resolves to the category of the email.
 */
export async function categorizeEmail(emailContent: string): Promise<string> {
  const prompt = `Categorize the following email into one of these categories: "Interested", "Not Interested", "More information". Email content: ${emailContent}`;

  try {
    const response = await openai.completions.create({
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 10,
    });

    return response.choices[0].text.trim();
  } catch (error) {
    console.error('Error categorizing email:', error);
    throw new Error('Failed to categorize email.');
  }
}

/**
 * Generate a reply based on the provided email content.
 * @param emailContent The content of the email to generate a reply for.
 * @returns A promise that resolves to the generated reply.
 */
export async function generateReply(emailContent: string): Promise<string> {
  const prompt = `Based on the following email content, generate an appropriate reply: ${emailContent}`;

  try {
    const response = await openai.completions.create({
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 150,
    });

    return response.choices[0].text.trim();
  } catch (error) {
    console.error('Error generating reply:', error);
    throw new Error('Failed to generate a reply.');
  }
}
