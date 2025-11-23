
import { tool } from "ai";
import { z } from "zod";


export const getSports = tool({
  description:
    "This tool will show some photos of me enjoying sports and activities",
  parameters: z.object({}),
  execute: async () => {
    return { message: "Here are some pictures of me enjoying various activities!" };
  },
});