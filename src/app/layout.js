import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar/navbar";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Weather Forecast",
  description:
    "Explore real-time weather updates and forecasts with this dynamic web application, meticulously crafted using the powerful 'create next app' tool. Stay informed about current conditions, track upcoming changes, and plan your activities seamlessly. Whether you're a weather enthusiast or just looking for accurate predictions, this app provides a user-friendly experience for staying ahead of the elements.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      <Script id="ga-script" strategy="lazyOnload">
        {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
      page_path: window.location.pathname,
    });
        `}
      </Script>

      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
