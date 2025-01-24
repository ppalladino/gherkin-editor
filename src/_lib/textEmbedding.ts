import OpenAI from "openai";

const apiKey = process.env.NEXT_PUBLIC_OPEN_AI_KEY;
const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true
});

export const getTextEmbedding = async (text: string) => {
    const embedding = await openai.embeddings.create({
        model: "text-embedding-3-large",
        input: text
    });
    
    const textEmbedding = embedding.data[0].embedding;
    return textEmbedding;
}