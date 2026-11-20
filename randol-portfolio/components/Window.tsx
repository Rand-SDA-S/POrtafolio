'use client';
import { motion, useDragControls } from 'framer-motion';
import { Minus, X } from 'lucide-react';
import type { ReactNode } from 'react';

type P = { title: string; z: number; offset: number; w?: number; onClose: () => void; onMin: () => void; onFocus: () => void; children: ReactNode };

export default function Window({ title, z, offset, w = 680, onClose, onMin, onFocus, children }: P) {
  const controls = useDragControls();
  return (
    <motion.section
      role="dialog" aria-label={title} className="win absolute" style={{ zIndex: z, width: w, left: 24 + offset * 28, top: 24 + offset * 28, maxWidth: '100vw' }}
      drag dragControls={controls} dragListener={false} dragMomentum={false}
      initial={{ opacity: 0, scale: 0.92, rotate: -1.5 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} exit={{ opacity: 0, scale: 0.9, y: 30 }}
      onPointerDown={onFocus}
      onKeyDown={(e) => e.key === 'Escape' && onClose()}
    >
      <div className="bar" onPointerDown={(e) => controls.start(e)}>
        <span className="display flex-1 truncate text-sm">{title}</span>
        <button onClick={onMin} aria-label={`Minimize ${title}`}><Minus size={14} /></button>
        <button className="x" onClick={onClose} aria-label={`Close ${title}`}><X size={14} /></button>
      </div>
      <div className="body">{children}</div>
    </motion.section>
  );
}
