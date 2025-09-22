import { OnlineCasinoPageClient } from "@/features/casinos/pages/OnlineCasinoPageClient";

interface OnlineCasinoDetailPageProps {
  params: Promise<{ slug: string }>;
}

const OnlineCasinoDetailPage = async ({ params }: OnlineCasinoDetailPageProps) => {
  const { slug } = await params;
  return <OnlineCasinoPageClient slug={slug} />;
};

export default OnlineCasinoDetailPage;
