interface SiteDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function SiteDetailPage({ params }: SiteDetailPageProps) {
  const { id } = await params;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">기도터 상세</h1>
      <p className="text-sm text-muted">선택한 기도터 ID: {id}</p>
    </div>
  );
}
