import { BottomTabBar } from "@/components/layout/bottom-tab-bar";

export default function PublicLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto flex min-h-screen w-full max-w-screen-md flex-col px-4 pb-24 pt-6">
        {children}
      </main>
      <BottomTabBar />
    </div>
  );
}
