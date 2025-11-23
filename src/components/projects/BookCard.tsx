"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface BookCardProps {
  title: string;
  summary: string;
  category: string;
  index: number;
  coverColor: string;
  bookColor: string;
  link?: {
    label: string;
    url: string;
  };
}

export const BookCard = ({ title, summary, category, index, coverColor, bookColor, link }: BookCardProps) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
        delay: 0.2 * index,
        ease: 'easeOut' as const,
      }}
      viewport={{ once: true }}
      className="book"
      style={{ backgroundColor: bookColor }}
    >
      <div className="book-content">
        <p>{summary}</p>
        {link && (
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="book-link"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="book-link-icon" />
            <span>{link.label}</span>
          </a>
        )}
      </div>
      <div 
        className="cover"
        style={{ backgroundColor: coverColor }}
      >
        <div className="cover-content">
          <span className="category">{category}</span>
          <p className="title">{title}</p>
        </div>
      </div>
    </motion.div>
  );
};

