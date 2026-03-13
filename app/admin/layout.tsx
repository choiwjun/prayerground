import { AdminLayout } from "@/components/admin/admin-layout";

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AdminLayout>{children}</AdminLayout>;
}
