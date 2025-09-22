import { OnlineCasino } from '@/features/main/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface SimilarCasinoCardProps {
  casino: OnlineCasino;
}

const SimilarCasinoCard: React.FC<SimilarCasinoCardProps> = ({ casino }) => {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || '';
  const logoUrl = casino.Logo?.url ? `${strapiUrl}${casino.Logo.url}` : '';
  const reviewUrl = `/online-casino/${casino.slug}`;

  return (
    <li className="relative card card-compact bg-gray-200 border border-gray-300 transition-all select-none shadow rounded-md">
      <Link href={reviewUrl}>
        <figure 
          style={{ backgroundColor: '#000000' }} 
          className="aspect-video rounded-xl border-2 border-base-200 flex items-center justify-center p-2"
        >
          {logoUrl ? (
            <Image
              alt={`${casino.Name} logo`}
              loading="lazy"
              className="max-w-[95%] max-h-[95%] transition-transform object-contain"
              draggable="false"
              src={logoUrl}
              width={300}
              height={150}
              style={{ objectFit: 'contain' }}
            />
          ) : (
            <div className="text-gray-500 text-sm">No Logo</div>
          )}
        </figure>
      </Link>
      
      <div className="card-body flex flex-col text-black p-4">
        <div>
          <Link href={reviewUrl} className="card-title text-base md:text-lg mb-1 items-center">
            <span className="hover:underline">{casino.Name}</span>
            {casino.Is_new && (
              <span className="badge py-1 px-3 ml-2 rounded-full bg-gray-600 border-none text-white text-sm">
                new
              </span>
            )}
          </Link>
          
          {casino.Welcome_pack && (
            <Link href={reviewUrl} className="w-full flex flex-col my-2 text-center border border-current border-dashed rounded-md pt-1 group transition-all hover:scale-105">
              <span className="text-sm opacity-75">Welcome Pack</span>
              <p className="text-lg font-semibold text-center mb-1 mx-2 leading-tight">
                {casino.Welcome_pack}
              </p>
            </Link>
          )}
        </div>

        <Link 
          href={reviewUrl} 
          className="btn btn-sm w-full mt-1 bg-transparent hover:bg-gray-300 text-black border border-black rounded-md flex justify-center"
        >
          View review
        </Link>
      </div>
      
      {casino.Rating_Num && (
        <div className="absolute right-2 top-2 sm:right-4 sm:top-4 badge rounded-md bg-gray-800/75 border-none text-xs flex items-center gap-1.5 text-white py-1 px-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-500">
            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007z" clipRule="evenodd" />
          </svg>
          {casino.Rating_Num}/10
        </div>
      )}
    </li>
  );
};

interface SimilarCasinosSectionProps {
  similarCasinos: OnlineCasino[];
  currentCasinoName: string;
}

export const SimilarCasinosSection: React.FC<SimilarCasinosSectionProps> = ({ 
  similarCasinos, 
  currentCasinoName 
}) => {
  // Если нет похожих казино, не показываем секцию
  if (!similarCasinos || similarCasinos.length === 0) {
    return null;
  }

  // Ограничиваем до 4 казино
  const limitedCasinos = similarCasinos.slice(0, 4);

  return (
    <section className="pb-8 lg:pb-20 px-4">
      <div className="container max-w-screen-xl pb-6">
        <span className="group inline-flex items-center gap-3">
          <h2 className="text-3xl font-bold underline-offset-8 decoration-dashed text-black">
            Similar to {currentCasinoName}
          </h2>
        </span>
      </div>
      
      <ul className="container max-w-screen-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {limitedCasinos.map((casino) => (
          <SimilarCasinoCard key={casino.id} casino={casino} />
        ))}
      </ul>
    </section>
  );
};

export default SimilarCasinosSection;
