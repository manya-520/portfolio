import { Instrument_Sans } from "next/font/google";
import "@/styles/globals.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export default function App({ Component, pageProps }) {
  return (
    <div className={`${instrumentSans.className} antialiased`}>
      <Component {...pageProps} />
    </div>
  );
}
