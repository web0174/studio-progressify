// src/components/service-worker-registration.tsx
"use client";

import { useEffect } from 'react';

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && window.workbox !== undefined) {
       // The buildIntegrity option is enabled by default in next-pwa.
       // It's recommended to leave it on.
       const wb = window.workbox
       // Add any event listeners here.
       // For example, an event that fires when a new service worker has been installed and is waiting.
       wb.addEventListener('waiting', (event: any) => {
         console.log(
           `A new service worker has installed, but it can't activate` +
           `until all tabs running the current version have fully unloaded.`,
         );
         // Optionally prompt the user to reload.
         // wb.messageSW({ type: 'SKIP_WAITING' }); // To activate the new SW immediately
       });

       wb.addEventListener('controlling', (event: any) => {
         console.log('The service worker has taken control.');
         // At this point, reloading the page will ensure that the new service worker is used.
         // window.location.reload(); // Or prompt user
       });
       
       wb.register();
    } else if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      // Fallback for non-workbox (manual) service worker
      navigator.serviceWorker
        .register('/service-worker.js', { scope: '/' })
        .then(registration => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(error => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }, []);

  return null; // This component does not render anything
}
