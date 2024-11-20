import Link from "next/link";
import "./globals.css";

import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"], // Add weights you need
  style: "normal",
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.className}>
      <body>
        <header className="horizontal-inline-flex bg-00509d min-h-50 pad-lr-5">
          <nav className="menu horizontal-inline-flex justify--flex-end ">
            <ul style={{ display: "flex", gap: "20px", listStyle: "none" }}>
              <li className="if-content-panel pad-lr-20">
                <Link href="/">Overview</Link>
              </li>
              <li className="if-content-panel pad-lr-20">
                <Link href="/about">Components</Link>
              </li>
              <li className="if-content-panel pad-lr-20">
                <Link href="/payment">Payment</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main className="if-base-wrapper">
        
              {children}
         
        </main>
      </body>
    </html>
  );
}
