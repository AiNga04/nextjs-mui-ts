import SidebarComponent from "./components/sidebar/sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SidebarComponent>{children}</SidebarComponent>
    </>
  );
}
