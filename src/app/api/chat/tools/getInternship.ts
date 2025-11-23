import { tool } from 'ai';
import { z } from 'zod';

export const getInternship = tool({
  description:
    "Gives a summary of what kind of opportunities I'm looking for. Use this tool when the user asks about opportunities.",
  parameters: z.object({}),
  execute: async () => {
    return {
      message: `Here's what I'm looking for 👇

- 📅 **Availability**: Open to immediate opportunities
- 🌍 **Location**: Preferably **Narasaraopet** or anywhere in **India**
- 🧑‍💻 **Focus**: AI/ML, Full-stack development, Data Science, Automation
- 🛠️ **Stack**: Python, React, FastAPI, RAG, Generative AI, Agents
- 🔥 I move fast, learn faster, always looking for big challenges

📬 **Contact me**:
- Email: hemanththemanthkumar204@gmail.com
- Phone: +91 6300829223
- LinkedIn: https://www.linkedin.com/in/venkata-hemanth-kumar-chejarla724/
- GitHub: https://github.com/VenkataHemanthKumar143
- X: https://x.com/HemanthKumar724
- Instagram: https://www.instagram.com/future_star_hemanth/

Let's build cool stuff together ✌️`
    };
  },
});
