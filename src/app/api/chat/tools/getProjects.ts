
import { tool } from "ai";
import { z } from "zod";


export const getProjects = tool({
  description:
    "This tool will show a list of all projects made by Venkata Hemanth Kumar Chejarla",
  parameters: z.object({}),
  execute: async () => {
    return {
      message: "Here are all my projects! Don't hesitate to ask me more about them!"
    };
  },
});