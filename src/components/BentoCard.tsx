import React from 'react';

interface BentoCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function BentoCard({ title, children, className = '', id }: BentoCardProps) {
  return (
    <div id={id} className={`bg-card rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-border p-5 flex flex-col overflow-hidden ${className}`}>
      {title && <h3 className="text-[14px] font-semibold text-text-sub mb-3 uppercase tracking-[0.05em] flex justify-between items-center">{title}</h3>}
      {children}
    </div>
  );
}
