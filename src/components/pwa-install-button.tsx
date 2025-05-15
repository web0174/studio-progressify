// src/components/pwa-install-button.tsx
"use client";

import { usePWAInstallPrompt } from '@/hooks/use-pwa-install-prompt';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function PWAInstallButton() {
  const { installPromptEvent, clearInstallPrompt, isAppInstalled } = usePWAInstallPrompt();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Component must be mounted to access installPromptEvent from context
    if (installPromptEvent && !isAppInstalled) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [installPromptEvent, isAppInstalled]);


  const handleInstallClick = async () => {
    if (!installPromptEvent) {
      return;
    }
    try {
      await installPromptEvent.prompt();
      const { outcome } = await installPromptEvent.userChoice;
      if (outcome === 'accepted') {
        console.log('User accepted the PWA installation');
      } else {
        console.log('User dismissed the PWA installation');
      }
    } catch (error) {
      console.error('Error during PWA installation prompt:', error);
    }
    clearInstallPrompt(); // Clear the event after prompting
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Button
      onClick={handleInstallClick}
      variant="default"
      className="bg-primary hover:bg-primary/90 text-primary-foreground"
      aria-label="Install Progressify App"
    >
      <Download className="mr-2 h-5 w-5" />
      Install App
    </Button>
  );
}
