import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "당골래",
  description: "전국 기도터를 지도와 큐레이션으로 탐색하는 플랫폼"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
