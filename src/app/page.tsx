import Image from "next/image";
import Body from "./components/Body";
import Header from "./components/Header";
import Footer from "./components/footer";

export default function Home() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <header className="bg-orange-300 text-white p-0 text-center">
        <Header />
      </header>

      <main className="flex-1 flex items-center justify-center overflow-hidden">
        <Body />
      </main>

      <footer className="bg-orange-800 text-white p-0 text-center">
        <Footer />
      </footer>
    </div>
  );
}
