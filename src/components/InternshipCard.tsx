'use client';

import { motion } from 'framer-motion';
import { Code2, Globe, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';

const InternshipCard = () => {
  const openMail = () => {
    window.open('mailto:hemanththemanthkumar2004@gmail.com', '_blank');
  };
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-accent/80 dark:bg-accent/90 mx-auto mt-8 w-full max-w-4xl rounded-3xl px-6 py-8 font-sans sm:px-10 md:px-16 md:py-12"
    >
      {/* Header */}
      <div className="mb-6 flex flex-col items-center sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          {/* Avatar placeholder */}
          <div className="bg-muted h-16 w-16 overflow-hidden rounded-full shadow-md">
            <img
              src="/my_Image.jpg"
              alt="Venkata Hemanth Kumar's avatar"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-foreground text-2xl font-semibold">
              Venkata Hemanth Kumar
            </h2>
            <p className="text-muted-foreground text-sm">
              Internship Application
            </p>
          </div>
        </div>

        {/* Live badge */}
        <div className="mt-4 flex items-center gap-2 sm:mt-0">
          <span className="flex items-center gap-1 rounded-full border border-green-500 px-3 py-0.5 text-sm font-medium text-green-500">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </span>
            Live
          </span>
        </div>
      </div>

      {/* Internship Info */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="flex items-start gap-3">
          <MapPin className="h-5 w-5 text-blue-600" />
          <div>
            <p className="text-foreground text-sm font-medium">Present Location</p>
            <p className="text-muted-foreground text-sm">
              Noida, Delhi NCR
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Globe className="mt-1 h-5 w-5 text-green-500" />
          <div>
            <p className="text-foreground text-sm font-medium">Location</p>
            <p className="text-muted-foreground text-sm">
              Narasaraopet, Andhra Pradesh
            </p>
          </div>
        </div>

        {/* Tech stack */}
        <div className="flex items-start gap-3 sm:col-span-2">
          <Code2 className="mt-1 h-5 w-5 text-purple-500" />
          <div className="w-full">
            <p className="text-foreground text-sm font-medium">Tech stack</p>
            <div className="text-muted-foreground grid grid-cols-1 gap-y-1 text-sm sm:grid-cols-2">
              <ul className="decoration-none list-disc pl-4">
                <li>Python, FastAPI, Flask, Django</li>
                <li>React, Next.js, JavaScript</li>
                <li>OpenAI, AI Agents, RAG, GenAI</li>
                <li>ChromaDB, Vector DBs, SQL</li>
                
                <li>OpenAI, Mistral, Claude</li>
                <li>Prompt engineering, fine-tuning</li>
              </ul>
              <ul className="list-disc pl-4">
                <li>n8n, Retool, CrewAI, Automation</li>
                <li>ML & DL, Data Science</li>
                <li>Linux, AWS, Server Deployment</li>
                <li>Hugging Face Transformers</li>
                <li>TensorFlow, PyTorch</li>
                <li>LangChain + AI agent workflows</li>
                <li>
                  <a
                    href="/chat?query=What%20are%20your%20skills%3F%20Give%20me%20a%20list%20of%20your%20soft%20and%20hard%20skills."
                    className="cursor-pointer items-center text-blue-500 underline"
                  >
                    See more
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* What I bring */}
      <div className="mt-10">
        <p className="text-foreground mb-2 text-lg font-semibold">
          Professional Summary
        </p>
        <p className="text-foreground text-sm">
          Graduated engineering student currently working as a Developer in the AI Team at Avaada Electro, with strong skills in Python, Flask, FastAPI, React, API integration and Linux. <br /> 
          Experienced in developing web applications and automating processes to improve efficiency. <br /> 
          Real-world AI dev experience with hands-on projects like HR Assistant, Solar Expert, and AI-powered automation tools.
        </p>
      </div>

      {/* Goal */}
      <div className="mt-8">
        <p className="text-foreground mb-2 text-lg font-semibold">Goal</p>
        <p className="text-foreground text-sm">
          Join a bold, innovative team building AI-powered tools that matter. I want to leverage my experience in AI, ML, and full-stack development to contribute to impactful projects. I'm fast, flexible, and passionate about building solutions that make a difference. Ready to learn, grow, and deliver results! 🔥
        </p>
      </div>

      {/* Contact button */}
      <div className="mt-10 flex justify-center">
        <button
          onClick={openMail}
          className="cursor-pointer rounded-full bg-black px-6 py-3 font-semibold text-white transition-colors duration-300 hover:bg-zinc-800"
        >
          Contact me
        </button>
      </div>
    </motion.div>
  );
};

export default InternshipCard;
