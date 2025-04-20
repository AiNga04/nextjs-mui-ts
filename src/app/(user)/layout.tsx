import { Metadata } from "next";
import AppHeader from "@/components/header/app.header";
import AppFooter from "@/components/footer/app.footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppHeader />
      <main>{children}</main>
      <AppFooter />
    </>
  );
}
