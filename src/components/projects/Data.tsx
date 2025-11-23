// File: data.tsx

import Image from 'next/image';
import { ChevronRight, Link } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

// --- PROJECT DATABASE ---
// This array holds the detailed information for each project.
const PROJECT_CONTENT = [
    {
    title: 'HR Assistant',
    description:
      'Built an intelligent HR Assistant application using n8n for workflow automation, ChromaDB for vector storage and semantic search, and OpenAI Models for natural language understanding. Features chunking with advanced embeddings, React frontend for user-friendly interface, and Python backend for processing.',
    techStack: [
      'n8n',
      'ChromaDB',
      'OpenAI Models',
      'React',
      'Python',
      'Workflow Automation',
      'Vector Database',
      'Chunking',
    ],
    date: '2024-2025',
    links: [
      {
        name: 'GitHub Repository',
        url: 'https://github.com/VenkataHemanthKumar143/hr-assistant',
      },
    ],
    images: [
      { src: '/projects/agroai-preview.png', alt: 'HR Assistant Application Interface' },
    ],
  },
  {
    title: 'Solar Expert',
    description:
      'Developed a Solar Expert application with Zoho CRM integration via SMTP. Features include React frontend, Python backend with OpenAI integration, and Gmail messaging for user notifications and organizational communications.',
    techStack: [
      'Zoho CRM',
      'SMTP',
      'React',
      'Python',
      'OpenAI API',
      'Gmail API',
      'Integration',
    ],
    date: '2024',
    links: [
      {
        name: 'GitHub Repository',
        url: 'https://github.com/VenkataHemanthKumar143/solar-expert',
      },
    ],
    images: [
      { src: '/projects/holohype-preview.png', alt: 'Solar Expert Application' },
    ],
  },
  {
    title: 'AvaadaWebUI',
    description:
      'Created an interactive web-based user interface similar to OpenWebUI as per Avaada\'s requirements. Developed with modern web technologies for seamless user experience and integration capabilities.',
    techStack: [
      'React',
      'TypeScript',
      'Tailwind CSS',
      'OpenWebUI',
      'REST API',
    ],
    date: '2024',
    links: [
      {
        name: 'Project Demo',
        url: 'https://github.com/VenkataHemanthKumar143/avaada-webui',
      },
    ],
    images: [
      { src: '/projects/old-portfolio-home.png', alt: 'AvaadaWebUI Interface' },
    ],
  },
  {
    title: 'Resume Analyzer',
    description:
      'Developed using Python with Flask frontend and FastAPI backend. Implemented OpenAI and machine learning techniques for intelligent resume processing and analysis. Provides comprehensive insights and recommendations.',
    techStack: [
      'Python',
      'Flask',
      'FastAPI',
      'OpenAI',
      'Machine Learning',
      'Natural Language Processing',
    ],
    date: '2024',
    links: [
      {
        name: 'GitHub Repository',
        url: 'https://github.com/VenkataHemanthKumar143/resume-analyzer',
      },
    ],
    images: [
      { src: '/projects/yt-clone-home.png', alt: 'Resume Analyzer Application' },
    ],
  },
  {
    title: 'Weather Alert',
    description:
      'Designed and implemented a comprehensive weather alert application using Python. Integrates with multiple weather providers (Tomorrow.io, Solcast, Metronomics APIs) for real-time data. Features Gradio interactive user interface and collaborative development for user-friendly experience.',
    techStack: [
      'Python',
      'Gradio',
      'Tomorrow.io API',
      'Solcast API',
      'Metronomics API',
      'Real-time Data',
      'Alert System',
    ],
    date: '2024',
    links: [
      {
        name: 'GitHub Repository',
        url: 'https://github.com/VenkataHemanthKumar143/weather-alert',
      },
    ],
    images: [
      { src: '/projects/agroai-home.png', alt: 'Weather Alert Application' },
    ],
  },
  {
    title: 'Tender Scraper',
    description:
      'Developed a tender scraping system for 4 websites using Python, Flask, and FastAPI for backend services. Implemented OpenAI for generating structured synopsis documents (DOCX) with key parameters. Used multiple fallback methods including BeautifulSoup, Selenium, and Machine Learning techniques for robust scraping.',
    techStack: [
      'Python',
      'Flask',
      'FastAPI',
      'OpenAI',
      'BeautifulSoup',
      'Selenium',
      'Machine Learning',
      'Web Scraping',
    ],
    date: '2024',
    links: [
      {
        name: 'GitHub Repository',
        url: 'https://github.com/VenkataHemanthKumar143/tender-scraper',
      },
    ],
    images: [
      { src: '/projects/agroai-result.png', alt: 'Tender Scraper Application' },
    ],
  },
  {
    title: 'Currency Converter',
    description:
      'Developed a currency conversion tool using Python with a Gradio-based user interface. Integrates real-time exchange rate data from exchangerate.host and currencyfreaks.com APIs. Updates currency rates every 60 minutes for accurate conversions.',
    techStack: [
      'Python',
      'Gradio',
      'exchangerate.host API',
      'currencyfreaks.com API',
      'Real-time Data',
    ],
    date: '2024',
    links: [
      {
        name: 'GitHub Repository',
        url: 'https://github.com/VenkataHemanthKumar143/currency-converter',
      },
    ],
    images: [
      { src: '/projects/old-portfolio-about.png', alt: 'Currency Converter Application' },
    ],
  },
  {
    title: 'Imagination Made Real - Stable Diffusion',
    description:
      'Implemented text-to-image generation using Stable Diffusion with Gradio UI and NVIDIA GPU acceleration. Achieved high-fidelity results through optimized prompts and fine-tuning. Published in IJIRT conference.',
    techStack: [
      'Stable Diffusion',
      'Gradio',
      'NVIDIA GPU',
      'CUDA',
      'Python',
      'Deep Learning',
      'Generative AI',
    ],
    date: '2024',
    links: [
      {
        name: 'Research Paper',
        url: 'https://ijirt.org/article?manuscript=175379',
      },
      {
        name: 'GitHub Repository',
        url: 'https://github.com/VenkataHemanthKumar143/stable-diffusion-text-to-image',
      },
    ],
    images: [
      { src: '/projects/ai-portfolio-chat.png', alt: 'Imagination Made Real - Stable Diffusion' },
    ],
  },
];

// --- COMPONENT & INTERFACE DEFINITIONS ---
// Define interface for project prop
interface ProjectProps {
  title: string;
}

// This component dynamically renders the project details
const ProjectContent = ({ project }: { project: ProjectProps }) => {
  // Find the matching project data from the database
  const projectData = PROJECT_CONTENT.find((p) => p.title === project.title);

  if (!projectData) {
    return <div>Project details not available</div>;
  }

  return (
    <div className="space-y-10">
      {/* Header section with description */}
      <div className="rounded-3xl bg-[#F5F5F7] p-8 dark:bg-[#1D1D1F]">
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
            <span>{projectData.date}</span>
          </div>

          <p className="text-secondary-foreground font-sans text-base leading-relaxed md:text-lg">
            {projectData.description}
          </p>

          {/* Tech stack */}
          <div className="pt-4">
            <h3 className="mb-3 text-sm tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {projectData.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="rounded-full bg-neutral-200 px-3 py-1 text-sm text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Links section */}
      {projectData.links && projectData.links.length > 0 && (
        <div className="mb-24">
          <div className="px-6 mb-4 flex items-center gap-2">
            <h3 className="text-sm tracking-wide text-neutral-500 dark:text-neutral-400">
              Links
            </h3>
            <Link className="text-muted-foreground w-4" />
          </div>
          <Separator className="my-4" />
          <div className="space-y-3">
            {projectData.links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-[#F5F5F7] flex items-center justify-between rounded-xl p-4 transition-colors hover:bg-[#E5E5E7] dark:bg-neutral-800 dark:hover:bg-neutral-700"
              >
                <span className="font-light capitalize">{link.name}</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Images gallery */}
      {projectData.images && projectData.images.length > 0 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {projectData.images.map((image, index) => (
              <div
                key={index}
                className="relative aspect-video overflow-hidden rounded-2xl"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// --- MAIN DATA EXPORT ---
// This is the data used by your main portfolio page.
export const data = [
  {
    category: 'Generative AI',
    title: 'Imagination Made Real - Stable Diffusion',
    summary: 'Implemented text-to-image generation using Stable Diffusion with Gradio UI and NVIDIA GPU acceleration. Published in IJIRT.',
    link: {
      label: 'View on IJIRT',
      url: 'https://ijirt.org/article?manuscript=175379',
    },
    content: (
      <ProjectContent project={{ title: 'Imagination Made Real - Stable Diffusion' }} />
    ),
  },
   {
    category: 'Automation & AI',
    title: 'HR Assistant',
    summary: 'Built an HR Assistant application as a solo project using n8n for workflow automation, ChromaDB for vector storage and Chunking with OpenAI Models, React frontend, and Python backend.',
    content: (
      <ProjectContent project={{ title: 'HR Assistant' }} />
    ),
  },
  {
    category: 'Full-Stack & AI',
    title: 'Solar Expert',
    summary: 'Developed a Solar Expert application with Zoho CRM integration via SMTP, React frontend, Python backend, OpenAPI, and Gmail Message to user and Org.',
    content: (
      <ProjectContent project={{ title: 'Solar Expert' }} />
    ),
  },
  {
    category: 'Web Development',
    title: 'AvaadaWebUI',
    summary: 'Created as per Avaada\'s requirements, developed similar to OpenWebUI for an interactive web-based user interface.',
    content: (
      <ProjectContent project={{ title: 'AvaadaWebUI' }} />
    ),
  },
  {
    category: 'AI & Backend',
    title: 'Resume Analyzer',
    summary: 'Developed using Python with a frontend and login page integrated via Flask and FastAPI. Implemented OpenAI and machine learning techniques for intelligent processing.',
    content: (
      <ProjectContent project={{ title: 'Resume Analyzer' }} />
    ),
  },
  {
    category: 'APIs & Real-time',
    title: 'Weather Alert',
    summary: 'Designed and implemented a weather alert application using Python, integrating interactive user interfaces developed with Gradio. Leveraged Tomorrow.io, Solcast, and Metromatics APIs to provide real-time weather data and alerts. Collaborated on developing user-friendly features.',
    content: (
      <ProjectContent project={{ title: 'Weather Alert' }} />
    ),
  },
  {
    category: 'Web Scraping & AI',
    title: 'Tender Scraper',
    summary: 'Developed a tender scraping system for 4 websites using Python with Flask and FastAPI for the frontend. Used OpenAI to generate structured synopsis documents (DOCX) with key parameters. Applied multiple fallback methods for scraping using BeautifulSoup, Selenium, and Machine Learning Techniques.',
    content: (
      <ProjectContent project={{ title: 'Tender Scraper' }} />
    ),
  },
  {
    category: 'APIs & Tools',
    title: 'Currency Converter',
    summary: 'Developed a currency conversion using Python with a Gradio-based user interface. Integrated real-time exchange rate data every 60 minutes through the exchangerate.host and currencyfreaks.com APIs for accurate currency conversions.',
    content: (
      <ProjectContent project={{ title: 'Currency Converter' }} />
    ),
  },
];
