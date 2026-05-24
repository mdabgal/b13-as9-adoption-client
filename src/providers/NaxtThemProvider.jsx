"use client";
import { ThemeProvider } from "next-themes";

const NaxtThemProvider = ({children}) => {
    return (
        <ThemeProvider attribute="class" defaultTheme="light">
      {children}
    </ThemeProvider>
    );
};

export default NaxtThemProvider;
