import "@/styles/globals.css";
import { Providers } from "./providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
    <body className="bg-gray-50 dark:bg-zinc-900" key="body">
        <Providers>{children}</Providers>
    </body>
    </html>

  );
}
