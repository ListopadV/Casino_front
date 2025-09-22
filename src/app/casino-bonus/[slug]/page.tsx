import CasinoBonusPageClient from "@/features/bonuses/pages/CasinoBonusPageClient";

interface CasinoBonusDetailPageProps {
  params: Promise<{ slug: string }>;
}

const CasinoBonusDetailPage = async ({ params }: CasinoBonusDetailPageProps) => {
  const { slug } = await params;
  return <CasinoBonusPageClient slug={slug} />;
};

export default CasinoBonusDetailPage;