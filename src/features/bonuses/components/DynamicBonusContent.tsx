'use client'

import robyCasinoLogo from '@/assets/son-logo.png';
import { Bonus, DetailItem, RichTextBlock, RichTextListItemChild, RichTextTextChild } from '@/shared/api/bonusesApi';
import Image from 'next/image';
import React, { useState } from 'react';

// Иконка кристалла
const DiamondIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg 
        className={className}
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="currentColor"
    >
        <path d="M12 2L2 12l10 10 10-10L12 2z" />
    </svg>
);

// Компонент звезды
const Star: React.FC<{ percentage: number }> = ({ percentage }) => {
    const gradientId = `star-gradient-${Math.random().toString(36).substring(2, 9)}`;

    return (
        <svg
            className="w-5 h-5"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <linearGradient id={gradientId}>
                    <stop offset={`${percentage}%`} stopColor="#fb923c" /> 
                    <stop offset={`${percentage}%`} stopColor="#e5e7eb" /> 
                </linearGradient>
            </defs>
            <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                fill={`url(#${gradientId})`}
                stroke="#4b5563"
                strokeWidth="0.8"
            />
        </svg>
    );
};

interface DynamicBonusContentProps {
    bonusData: Bonus; 
}

const renderRichText = (blocks: RichTextBlock[] | undefined | null) => {
    if (!blocks || blocks.length === 0) return null;
    return blocks.map((block: RichTextBlock, index: number) => {
      switch (block.type) {
        case 'paragraph':
          return (
            <p key={index}>
              {block.children.map((child: RichTextTextChild | RichTextListItemChild, i: number) => { 
                if (child.type === 'text') { 
                    return (
                        <span key={i} style={{ 
                            fontWeight: child.bold ? 'bold' : 'normal',
                            fontStyle: child.italic ? 'italic' : 'normal',
                        }}>
                            {child.text}
                        </span>
                    );
                }
                return null;
              })}
            </p>
          );
        case 'list':
            return (
                <ul key={index} className="list-disc list-inside space-y-1">
                    {block.children.map((listItem: RichTextTextChild | RichTextListItemChild, liIndex: number) => {
                        if (listItem.type === 'list-item') { 
                            return (
                                <li key={liIndex}>
                                    {listItem.children.map((child: RichTextTextChild, i: number) => ( 
                                        <span key={i} style={{ 
                                            fontWeight: child.bold ? 'bold' : 'normal',
                                            fontStyle: child.italic ? 'italic' : 'normal',
                                        }}>
                                            {child.text}
                                        </span>
                                    ))}
                                </li>
                            );
                        } else if (listItem.type === 'text') { 
                            return (
                                <li key={liIndex}>
                                     <span style={{ 
                                        fontWeight: listItem.bold ? 'bold' : 'normal',
                                        fontStyle: listItem.italic ? 'italic' : 'normal',
                                    }}>
                                        {listItem.text}
                                    </span>
                                </li>
                            );
                        }
                        return null; 
                    })}
                </ul>
            );
        case 'heading':
            const HeadingTag = `h${block.level || 1}` as keyof React.JSX.IntrinsicElements;
            return <HeadingTag key={index}>{block.children.map((child: RichTextTextChild | RichTextListItemChild, i: number) => {
                if (child.type === 'text') {
                    return (
                        <span key={i} style={{ 
                            fontWeight: child.bold ? 'bold' : 'normal',
                            fontStyle: child.italic ? 'italic' : 'normal',
                        }}>
                            {child.text}
                        </span>
                    );
                }
                return null;
            })}</HeadingTag>;
        default:
          return (
            <p key={index}>
                {block.children?.map((child: RichTextTextChild | RichTextListItemChild, i: number) => {
                    if (child.type === 'text') {
                        return (
                            <span key={i} style={{ 
                                fontWeight: child.bold ? 'bold' : 'normal',
                                fontStyle: child.italic ? 'italic' : 'normal',
                            }}>
                                {child.text}
                            </span>
                        );
                    }
                    return null;
                })}
            </p>
          );
      }
    });
  };

const DynamicBonusContent: React.FC<DynamicBonusContentProps> = ({ bonusData }) => {

    console.log(bonusData);
    const [activeTab, setActiveTab] = useState('general');
    const rating = bonusData.Rating_Num || 0; 
    const totalStars = 10; 
    const roundedRating = Math.round(rating * 2) / 2;
    const fullStars = Math.floor(roundedRating);
    const hasHalfStar = roundedRating % 1 !== 0;

    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || '';
    const casinoLogoUrl = bonusData.Logo?.url ? `${strapiUrl}${bonusData.Logo.url}` : robyCasinoLogo.src;
    
    return (
        <main>
            <div className="bg-slate-300">
                <div className="container max-w-screen-xl mx-auto py-8 lg-py-12 px-4 flex flex-col gap-8">
                    {/* БЛОК 1: Основная информация о казино */}
                    <section className="flex flex-col sm:flex-row gap-6">
                        <div className="relative w-full sm:w-56 flex-shrink-0">
                            <figure style={{ backgroundColor: '#000000' }} className="w-full aspect-square rounded-lg border flex items-center justify-center">
                                <Image
                                    alt={`${bonusData.Name} logo`}
                                    className="max-w-[90%] max-h-[90%]"
                                    src={casinoLogoUrl} 
                                    width={300} 
                                    height={100} 
                                    style={{ objectFit: 'contain' }}
                                />
                            </figure>
                            {bonusData.Is_new && <span className="absolute -top-2 -left-2 badge badge-md bg-green-500 p-2 text-white font-semibold border-none">NEW</span>}
                        </div>

                        <div className="flex flex-col gap-4 justify-center text-black w-full">
                            <div className="flex flex-col gap-2">
                                <h1 className="text-3xl font-bold">{bonusData.Name}</h1> 
                                
                                <div className="flex items-center gap-1.5 select-none">
                                    <div className="flex items-center">
                                        {[...Array(totalStars)].map((_, i) => {
                                            let percentage = 0;
                                            if (i < fullStars) {
                                                percentage = 100;
                                            } else if (i === fullStars && hasHalfStar) {
                                                percentage = 50;
                                            }
                                            return <Star key={i} percentage={percentage} />;
                                        })}
                                    </div>
                                    <span className="text-sm font-semibold text-gray-700">{rating}/10</span> 
                                </div>
                            </div>
                            <a className="w-full sm:w-80 flex flex-col text-center border border-dashed border-gray-300 rounded-md group transition-all py-3 bg-gray-50 hover:border-blue-500" href={bonusData.Welcome_cash_link || '#'} target="_blank" rel="noopener noreferrer">
                                <span className="text-sm text-gray-600">Welcome Pack</span>
                                <p className="text-lg font-bold text-center text-black">{bonusData.Welcome_pack || 'N/A'}</p> 
                            </a>
                            <a href={bonusData.Welcome_cash_link || '#'} rel="noopener noreferrer" target="_blank" 
                               className="btn bg-red-600 hover:bg-red-700 text-white border-none w-full sm:w-80 text-lg h-12 rounded-none flex items-center justify-center">
                                Visit casino
                            </a>
                        </div>
                    </section>
                    {/* БЛОК 2: "What we like / don't like" */}
                    <section className="bg-white p-6 rounded-lg shadow-md grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-800">
                        <div>
                            <h2 className="text-xl mb-2 font-bold text-black">What we like</h2>
                            {renderRichText(bonusData.What_we_like)} 
                        </div>
                        <div>
                            <h2 className="text-xl mb-2 font-bold text-black">What we don&apos;t like</h2>
                            {renderRichText(bonusData.What_we_dont_like)} 
                        </div>
                    </section>

                    {/* БЛОК 3:  БЛОК С ТАБАМИ */}
                    <section className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex space-x-2">
                            <button 
                                onClick={() => setActiveTab('general')}
                                className={`px-4 py-1.5 text-sm rounded-lg transition-all ${activeTab === 'general' ? 'bg-white font-semibold text-gray-900 border border-gray-200 shadow-sm' : 'bg-transparent font-medium text-gray-500'}`}
                            >
                                General
                            </button>
                            <button 
                                onClick={() => setActiveTab('payments')}
                                className={`px-4 py-1.5 text-sm rounded-lg transition-all ${activeTab === 'payments' ? 'bg-white font-semibold text-gray-900 border border-gray-200 shadow-sm' : 'bg-transparent font-medium text-gray-500'}`}
                            >
                                Payments
                            </button>
                            <button 
                                onClick={() => setActiveTab('games')}
                                className={`px-4 py-1.5 text-sm rounded-lg transition-all ${activeTab === 'games' ? 'bg-white font-semibold text-gray-900 border border-gray-200 shadow-sm' : 'bg-transparent font-medium text-gray-500'}`}
                            >
                                Games
                            </button>
                        </div>

                        {/* Контент, который меняется в зависимости от активной вкладки */}
                        <div className="mt-6">
                            {activeTab === 'general' && bonusData.General && bonusData.General.length > 0 && (
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {bonusData.General.map((item: DetailItem) => (
                                        <li key={item.id} className="flex items-start space-x-3">
                                            <DiamondIcon className="w-4 h-4 text-sky-500 mt-1 flex-shrink-0" />
                                            <div className="min-w-0">
                                                <h3 className="font-bold text-black">{item.Name}:</h3>
                                                <p className="text-gray-700 break-words">{item.Description}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {activeTab === 'payments' && bonusData.Payment_info && bonusData.Payment_info.length > 0 && (
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                     {bonusData.Payment_info.map((item: DetailItem) => (
                                        <li key={item.id} className="flex items-start space-x-3">
                                            <DiamondIcon className="w-4 h-4 text-sky-500 mt-1 flex-shrink-0" />
                                            <div className="min-w-0">
                                                <h3 className="font-bold text-black">{item.Name}:</h3>
                                                <p className="text-gray-700 break-words">{item.Description}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {activeTab === 'games' && bonusData.Games_info && bonusData.Games_info.length > 0 && (
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                     {bonusData.Games_info.map((item: DetailItem) => (
                                        <li key={item.id} className="flex items-start space-x-3">
                                            <DiamondIcon className="w-4 h-4 text-sky-500 mt-1 flex-shrink-0" />
                                            <div className="min-w-0">
                                                <h3 className="font-bold text-black">{item.Name}:</h3>
                                                <p className="text-gray-700 break-words">{item.Description}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                             {/* Обработка случая, если данных для вкладки нет */}
                            {activeTab === 'general' && (!bonusData.General || bonusData.General.length === 0) && (
                                <p className="text-gray-700">No general information available.</p>
                            )}
                            {activeTab === 'payments' && (!bonusData.Payment_info || bonusData.Payment_info.length === 0) && (
                                <p className="text-gray-700">No payment information available.</p>
                            )}
                            {activeTab === 'games' && (!bonusData.Games_info || bonusData.Games_info.length === 0) && (
                                <p className="text-gray-700">No games information available.</p>
                            )}
                        </div>
                    </section>
                </div>
            </div>

            {/* ОСТАЛЬНАЯ ЧАСТЬ СТРАНИЦЫ НА СВЕТЛОМ ФОНЕ */}
            <div className="bg-gray-100">
                <div className="container max-w-screen-xl mx-auto py-8 lg-py-12 px-4 flex flex-col gap-8">
                    
                        <div className="prose max-w-none text-gray-800">
                            <h2 className='text-black'><b>About {bonusData.Name}</b></h2>
                            {renderRichText(bonusData.About_casino)} 
                        </div>
                    

                    {/* </SimilarCasinos >  */}
                </div>
            </div>
        </main>
    );
};

export default DynamicBonusContent;