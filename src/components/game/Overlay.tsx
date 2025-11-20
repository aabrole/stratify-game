'use client';

import React, { ReactNode } from 'react';

interface OverlayProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function Overlay({ isOpen, onClose, children }: OverlayProps) {
  if (!isOpen) return null;

  return (
    <div className="overlay" onClick={onClose}>
      <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
