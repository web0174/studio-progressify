// src/components/layout/footer.tsx
export default function Footer() {
  return (
    <footer className="border-t bg-secondary/50">
      <div className="container mx-auto flex h-16 items-center justify-center px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Progressify. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
