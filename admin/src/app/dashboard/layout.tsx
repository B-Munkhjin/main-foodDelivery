import { AdminSideBar } from "@/app/Components/SideBar";
import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Link } from "lucide-react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <SidebarProvider>
        <AdminSideBar />
        <main>{children}</main>
      </SidebarProvider>
    </div>
  );
}
