import InitColorSchemeScript from "@mui/joy/InitColorSchemeScript";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";

import { Inter } from "next/font/google";
import "./globals.css";

import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Lumiterra RJN",
  description: "Creado para Rojanelos ❤️",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning={true}>
      <body
        className={`${inter.className} max-w-screen flex min-h-screen flex-col`}
      >
        <InitColorSchemeScript />
        <CssVarsProvider defaultMode="dark">
          <CssBaseline />
          <Sidebar />
          <div className="text-wrap bg-blue-600 p-2 text-center">
            Se esta trabajando en las paginas de skills, el filtrado puede no
            funcionar correctamente
          </div>
          {children}
        </CssVarsProvider>
      </body>
    </html>
  );
}
