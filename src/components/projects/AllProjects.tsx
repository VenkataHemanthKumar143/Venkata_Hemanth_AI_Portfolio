"use client";
import { BookCard } from "@/components/projects/BookCard";
import { data } from "@/components/projects/Data";
import { useEffect, useState } from "react";

// Color palette for book cards - less transparent backgrounds
const cardColors = [
  { cover: '#4F46E5', book: 'rgba(79, 70, 229, 0.35)' }, // Indigo - reduced transparency
  { cover: '#059669', book: 'rgba(5, 150, 105, 0.35)' }, // Emerald - reduced transparency
  { cover: '#DC2626', book: 'rgba(220, 38, 38, 0.35)' }, // Red - reduced transparency
  { cover: '#EA580C', book: 'rgba(234, 88, 12, 0.35)' }, // Orange - reduced transparency
  { cover: '#7C3AED', book: 'rgba(124, 58, 237, 0.35)' }, // Purple - reduced transparency
  { cover: '#0284C7', book: 'rgba(2, 132, 199, 0.35)' }, // Sky - reduced transparency
  { cover: '#CA8A04', book: 'rgba(202, 138, 4, 0.35)' }, // Yellow - reduced transparency
  { cover: '#BE185D', book: 'rgba(190, 24, 93, 0.35)' }, // Pink - reduced transparency
];

// Dark mode colors
const darkCardColors = [
  { cover: '#6366F1', book: '#1E1B4B' }, // Indigo
  { cover: '#10B981', book: '#064E3B' }, // Emerald
  { cover: '#EF4444', book: '#7F1D1D' }, // Red
  { cover: '#F97316', book: '#7C2D12' }, // Orange
  { cover: '#8B5CF6', book: '#4C1D95' }, // Purple
  { cover: '#0EA5E9', book: '#0C4A6E' }, // Sky
  { cover: '#EAB308', book: '#713F12' }, // Yellow
  { cover: '#EC4899', book: '#831843' }, // Pink
];

export default function AllProjects() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const colorSet = isDark ? darkCardColors : cardColors;

  return (
    <div className="w-full h-full pt-8">
      <h2 className="max-w-7xl mx-auto text-xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200 font-sans mb-8 px-4 md:px-0">
        My Projects
      </h2>
      <div className="relative w-full">
        <div className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-10 [scrollbar-width:none] custom-scrollbar">
          <div className="flex flex-row justify-start gap-4 mx-auto max-w-7xl px-4 md:px-0">
            {data.map((project, index) => {
              const colors = colorSet[index % colorSet.length];
              return (
                <div key={project.title} className="last:pr-[5%] md:last:pr-[33%]">
                  <BookCard
                    title={project.title}
                    summary={project.summary}
                    category={project.category}
                    index={index}
                    coverColor={colors.cover}
                    bookColor={colors.book}
                    link={project.link}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
