import Header from "./_components/Header";

import "@/app/_styles/globals.css";
import { Josefin_Sans } from "next/font/google";
const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});
console.log(josefin);

export const metadata = {
  title: {
    template: "%s Golden Leaf Spa",
    default: "Welcome / Golden Leaf Spa",
  },
  description:
    "Nestled among glowing autumn trees and bathed in golden sunlight, Golden Leaf Spa is a sanctuary of warmth, calm, and natural renewal. Inspired by nature’s soothing rhythms, our spa blends earthy textures, soft candlelight, and tranquil water elements to create a deeply restorative experience.",
};

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} bg-primary-950 text-primary-100 min-h-screen flex flex-col relative`}
      >
        <Header />
        <div className="flex-1 px-8 py-12 ">
          <main className="max-w-7xl mx-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}

export default RootLayout;
