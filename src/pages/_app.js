import { Inter, Instrument_Sans } from "next/font/google";
import "@/styles/globals.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-instrument-sans",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

export default function App({ Component, pageProps }) {
  return (
    <div
      className={`${instrumentSans.variable} ${inter.variable} ${instrumentSans.className} antialiased`}
    >
      <Component {...pageProps} />
    </div>
  );
}
