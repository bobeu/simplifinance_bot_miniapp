import OpenAi from 'openai';

export const openAIConfig = {
    apiKey: process.env.OPENAI_API_KEY,
    model: "gpt-4o-mini"
};

export const client = new OpenAi();