import "@/styles/globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import TransitionOverlay from "@/components/TransitionOverlay";

export const metadata = {
  title: "Social Whistles Studio",
  description: "Stories built in motion.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <SmoothScrollProvider>
          <TransitionOverlay />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
