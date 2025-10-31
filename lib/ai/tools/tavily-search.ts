import { tool } from "ai";
import { z } from "zod";

export const tavilySearch = tool({
    description: "Search the web for current information using Tavily API. Use this tool to answer questions that require up-to-date information, fact-checking, or external data beyond your knowledge base.",
    inputSchema: z.object({
        query: z.string().describe("The search query to send to Tavily API."),
    }),
    execute: async ({ query }) => {
        const tavilyApiKey = process.env.TAVILY_API_KEY;

        if (!tavilyApiKey) {
            return {
                error: "Tavily API key is not configured. Please set TAVILY_API_KEY in your .env file.",
            };
        }

        try {
            const response = await fetch("https://api.tavily.com/search", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    api_key: tavilyApiKey,
                    query,
                    search_depth: "basic", // or "advanced"
                    include_answer: true,
                    include_raw_content: false,
                    max_results: 5,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                return { error: `Tavily API error: ${response.status} - ${errorData.message || response.statusText}` };
            }

            const data = await response.json();
            return data;
        } catch (error: any) {
            return { error: `Failed to perform Tavily search: ${error.message}` };
        }
    },
});
