import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[hsl(230_15%_9%)] via-[hsl(230_15%_10%)] to-[hsl(230_15%_8%)] text-foreground">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
