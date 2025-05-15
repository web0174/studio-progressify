// src/hooks/use-pwa-install-prompt.ts
"use client";

import { useState, useEffect, useCallback } from 'react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export function usePWAInstallPrompt() {
  const [installPromptEvent, setInstallPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [isAppInstalled, setIsAppInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPromptEvent(event as BeforeInstallPromptEvent);
      console.log('beforeinstallprompt event fired');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    const handleAppInstalled = () => {
      console.log('PWA installed successfully');
      setIsAppInstalled(true);
      setInstallPromptEvent(null); // Clear the prompt as it's no longer needed
    };

    window.addEventListener('appinstalled', handleAppInstalled);
    
    // Check if running in standalone mode (already installed)
    if (typeof window !== 'undefined' && window.matchMedia('(display-mode: standalone)').matches) {
      setIsAppInstalled(true);
    }


    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const clearInstallPrompt = useCallback(() => {
    setInstallPromptEvent(null);
  }, []);

  return { installPromptEvent, clearInstallPrompt, isAppInstalled };
}
