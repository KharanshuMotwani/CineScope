export default function Footer() {
  return (
    <footer className="border-t border-border/60 mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} CineScope. All rights reserved.</p>
        <p className="opacity-80">Built with React + Tailwind</p>
      </div>
    </footer>
  );
}
