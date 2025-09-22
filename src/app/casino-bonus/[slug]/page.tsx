import CasinoBonusPageClient from "@/features/bonuses/pages/CasinoBonusPageClient";

interface CasinoBonusDetailPageProps {
  params: { slug: string };
}

const CasinoBonusDetailPage = ({ params }: CasinoBonusDetailPageProps) => {
  const slug = params.slug;
  return <CasinoBonusPageClient slug={slug} />;
};

export default CasinoBonusDetailPage;