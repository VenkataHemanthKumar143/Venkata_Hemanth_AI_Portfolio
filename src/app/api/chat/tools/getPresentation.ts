import { tool } from 'ai';
import { z } from 'zod';

export const getPresentation = tool({
  description:
    'This tool returns a concise personal introduction of Venkata Hemanth Kumar. It is used to answer the question "Who are you?" or "Tell me about yourself"',
  parameters: z.object({}),
  execute: async () => {
    return {
      presentation:
        "Here is a little bit about me, you can see it above!",
        //"I'm Venkata Hemanth Kumar, a 22-year-old developer passionate about software development, AI, and machine learning. I love tackling new challenges, learning, and building innovative solutions. Beyond tech, I enjoy exploring new technologies and building AI-powered solutions.",
    };
  },
});