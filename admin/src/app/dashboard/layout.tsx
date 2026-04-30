import { AdminSideBar } from "@/app/Components/SideBar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AdminSideBar />
      <SidebarInset className="w-full min-w-0">{children}</SidebarInset>
    </SidebarProvider>
  );
}
