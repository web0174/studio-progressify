// src/components/update-notification.tsx
"use client";

import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';

export default function UpdateNotification() {
  const { toast } = useToast();

  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      const handleControllerChange = () => {
        // This event fires when the service worker controlling this page changes.
        // This can happen when a new service worker has activated and taken control.
        console.log('New service worker has taken control.');
        toast({
          title: 'Update Available!',
          description: 'A new version of Progressify is ready.',
          duration: Infinity, // Keep toast visible until dismissed or reloaded
          action: (
            <ToastAction
              altText="Reload to update"
              onClick={() => window.location.reload()}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              Reload
            </ToastAction>
          ),
        });
      };

      navigator.serviceWorker.addEventListener('controllerchange', handleControllerChange);

      // Initial check if there's a waiting service worker
      // This can happen if skipWaiting() is not called or if the page was loaded before new SW activated
      navigator.serviceWorker.getRegistration().then(registration => {
        if (registration && registration.waiting) {
          console.log('A new service worker is waiting to activate.');
          // You might want to prompt the user to reload here as well,
          // or rely on controllerchange after skipWaiting + clients.claim
           toast({
            title: 'Update Ready!',
            description: 'A new version of Progressify will be active on next reload or after you click reload.',
            duration: Infinity, 
            action: (
              <ToastAction
                altText="Reload to update"
                onClick={() => {
                  // If there's a waiting SW, tell it to skip waiting
                  if (registration.waiting) {
                    registration.waiting.postMessage({ type: 'SKIP_WAITING' });
                  }
                  // Reloading will pick up the new SW if it has skipped waiting and claimed clients
                  window.location.reload();
                }}
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                Reload Now
              </ToastAction>
            ),
          });
        }
      });


      return () => {
        navigator.serviceWorker.removeEventListener('controllerchange', handleControllerChange);
      };
    }
  }, [toast]);

  return null; // This component only handles logic and doesn't render UI itself
}
