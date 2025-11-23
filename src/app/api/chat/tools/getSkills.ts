import { tool } from 'ai';
import { z } from 'zod';

export const getSkills = tool({
  description:
    'This tool show a list of my skills.',
  parameters: z.object({}),
  execute: async () => {
    return { message: "You can see all my skills above." };
  },
});