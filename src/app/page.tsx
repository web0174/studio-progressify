import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import PWAInstallButton from '@/components/pwa-install-button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Image from 'next/image';


export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <section className="text-center py-12 md:py-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary mb-6">
            Welcome to Progressify
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-8">
            Your modern Progressive Web App, built for performance and a seamless user experience. Installable, responsive, and always up-to-date.
          </p>
          <PWAInstallButton />
        </section>

        <section className="py-12 md:py-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <Image 
                src="https://placehold.co/600x400.png" 
                alt="Abstract representation of progress" 
                width={600} 
                height={400} 
                className="rounded-lg shadow-xl"
                data-ai-hint="abstract technology"
              />
            </div>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-3xl text-primary">PWA Features</CardTitle>
                <CardDescription>Experience the benefits of a modern web application.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {[
                    { text: "Installable on your device for an app-like feel." },
                    { text: "Fully responsive design for optimal viewing on all screen sizes." },
                    { text: "Automatic update notifications when new versions are available." },
                    { text: "Basic offline capabilities for core content access." }
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-accent mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground/90">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-12 md:py-16 text-center">
            <h2 className="text-3xl font-semibold text-primary mb-4">Get Started</h2>
            <p className="text-lg text-foreground/80 mb-8 max-w-xl mx-auto">
                Explore Progressify and see how it can streamline your digital interactions. If you see an install button, try adding it to your home screen!
            </p>
            {/* You can add more CTAs or feature highlights here */}
        </section>

      </main>
      <Footer />
    </div>
  );
}
