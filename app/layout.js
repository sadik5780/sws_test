import "@/styles/globals.css";
import { Instrument_Serif, Space_Grotesk } from "next/font/google";
import CameraFrame from "@/components/CameraFrame";
import Leader from "@/components/Leader";

// Self-hosted at build time by next/font/google — no third-party runtime
// requests, matching the production-monitor system's own "no third parties"
// posture.
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-serif",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-sans",
});

const DESCRIPTION =
  "Social Whistles Studio is a boutique digital video production studio and creative agency in Mumbai — advertising films, TVCs, brand films and platform-first digital video.";

export const metadata = {
  metadataBase: new URL("https://socialwhistles.studio"),
  title: {
    default: "Social Whistles Studio — Film production, Mumbai",
    template: "%s — Social Whistles Studio",
  },
  description: DESCRIPTION,
  openGraph: {
    title: "Social Whistles Studio — Film production, Mumbai",
    description: DESCRIPTION,
    url: "https://socialwhistles.studio",
    siteName: "Social Whistles Studio",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <Leader />
        <CameraFrame />
        {children}
      </body>
    </html>
  );
}
