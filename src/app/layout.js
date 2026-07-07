import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

  export const metadata = {
     title: "QuickTask — Simple Task Manager",
     description: "Manage your tasks with a clean Kanban board. Free up to 3 tasks, unlock unlimited with a one-time $5 payment.",
   };

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
     <body className="flex flex-col min-h-screen font-sans relative">
        <Navbar />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
