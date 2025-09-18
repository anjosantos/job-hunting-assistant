import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, UIMessage } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: openai("gpt-4.1"),
    system: `You are a job hunting assistant. I need you generate a cover letter for a job application based on my resume and the job description. I may also give another cover letter for reference. Please answer with the generated cover letter only.`,
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
