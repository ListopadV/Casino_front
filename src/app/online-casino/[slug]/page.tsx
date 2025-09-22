import { OnlineCasinoPageClient } from "@/features/casinos/pages/OnlineCasinoPageClient";

interface OnlineCasinoDetailPageProps {
  params: { slug: string };
}

const OnlineCasinoDetailPage = ({ params }: OnlineCasinoDetailPageProps) => {
  const slug = params.slug;
  return <OnlineCasinoPageClient slug={slug} />;
};

export default OnlineCasinoDetailPage;
