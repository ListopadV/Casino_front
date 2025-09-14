import React, { useState } from 'react';
import Image from 'next/image';

import { SimilarCasinos } from './SimilarCasinos';
import robyCasinoLogo from '@/assets/roby-casino-logo.jpg';

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


const RobyCasinoContent: React.FC = () => {
    // Состояние для отслеживания активной вкладки
    const [activeTab, setActiveTab] = useState('general');
    
    const rating = 8.6;
    const totalBlocks = 10;
    const filledBlocks = Math.floor(rating);

    return (
        <main>
            <div className="bg-slate-300">
                <div className="container max-w-screen-xl mx-auto py-8 lg-py-12 px-4 flex flex-col gap-8">
                    
                    {/* БЛОК 1: Основная информация о казино */}
                    <section className="flex flex-col sm:flex-row gap-6">
                        <div className="relative w-full sm:w-56 flex-shrink-0">
                            <figure style={{ backgroundColor: '#000000' }} className="w-full aspect-square rounded-lg border flex items-center justify-center">
                                <Image
                                    alt="Roby Casino logo"
                                    className="max-w-[90%] max-h-[90%]"
                                    src={robyCasinoLogo}
                                />
                            </figure>
                            <span className="absolute -top-2 -left-2 badge badge-md bg-green-500 p-2 text-white font-semibold border-none">NEW</span>
                        </div>

                        <div className="flex flex-col gap-4 justify-center text-black w-full">
                            <div className="flex flex-col gap-2">
                                <h1 className="text-3xl font-bold">Roby Casino</h1>
                                
                                <div className="flex items-center gap-1.5 select-none">
                                    <div className="flex items-center">
                                        {[...Array(totalBlocks)].map((_, i) => (
                                            <svg 
                                                key={i} 
                                                className={`w-5 h-5 ${i < filledBlocks ? 'text-orange-400' : 'text-gray-300'}`}
                                                fill="currentColor" 
                                                viewBox="0 0 20 20" 
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                            </svg>
                                        ))}
                                    </div>
                                    <span className="text-sm font-semibold text-gray-700">{rating}/10</span>
                                </div>
                            </div>

                            <a className="w-full sm:w-80 flex flex-col text-center border border-dashed border-gray-300 rounded-md group transition-all py-3 bg-gray-50 hover:border-blue-500" href="#">
                                <span className="text-sm text-gray-600">Welcome Pack</span>
                                <p className="text-lg font-bold text-center text-black">250% up to 2500 EUR + 250 FS</p>
                            </a>

                            <a href="#" rel="noopener noreferrer" target="_blank" 
                               className="btn bg-red-600 hover:bg-red-700 text-white border-none w-full sm:w-80 text-lg h-12 rounded-none flex items-center justify-center">
                                Visit casino
                            </a>
                        </div>
                    </section>
                    
                    {/* БЛОК 2: "What we like / don't like" */}
                    <section className="bg-white p-6 rounded-lg shadow-md grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-800">
                        <div>
                            <h2 className="text-xl mb-2 font-bold text-black">What we like</h2>
                            <ul className="list-disc list-inside space-y-1">
                                <li>Generous welcome pack</li>
                                <li>Large & great selection of games</li>
                                <li>Low minimal deposit</li>
                                <li>24/7 Support</li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="text-xl mb-2 font-bold text-black">What we don&apos;t like</h2>
                            <ul className="list-disc list-inside space-y-1">
                                <li>No withdrawals on the weekend</li>
                                <li>Slow withdrawals</li>
                            </ul>
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
                            {activeTab === 'general' && (
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <li className="flex items-start space-x-3">
                                        <DiamondIcon className="w-4 h-4 text-sky-500 mt-1 flex-shrink-0" />
                                        <div>
                                            <h3 className="font-bold text-black">Languages:</h3>
                                            <p className="text-gray-700">English, German, Finnish, Hungarian, Norwegian, Polish, Portuguese, Spanish, Czech, Italian</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start space-x-3">
                                        <DiamondIcon className="w-4 h-4 text-sky-500 mt-1 flex-shrink-0" />
                                        <div>
                                            <h3 className="font-bold text-black">License:</h3>
                                            <p className="text-gray-700">Anjouan</p>
                                        </div>
                                    </li>
                                </ul>
                            )}
                            {activeTab === 'payments' && (
                                <div>
                                    <p className="text-gray-700">Здесь будет информация о платежных методах...</p>
                                </div>
                            )}
                            {activeTab === 'games' && (
                                <div>
                                    <p className="text-gray-700">Здесь будет информация об играх...</p>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </div>

            {/* ОСТАЛЬНАЯ ЧАСТЬ СТРАНИЦЫ НА СВЕТЛОМ ФОНЕ */}
            <div className="bg-gray-100">
                <div className="container max-w-screen-xl mx-auto py-8 lg-py-12 px-4 flex flex-col gap-8">
                    <section className="bg-white p-6 rounded-lg shadow-md">
                        <div className="prose max-w-none text-gray-800">
                            <h2 className='text-black'>About Roby Casino</h2>
                            <p>RobyCasino is highly rated on SayCasinoName, both by players and our team. It has earned our certification and is recognized as one of our Certified Casinos, having received the SayCasinoName Certificate of Trust. In addition to our certification, the casino&apos;s reputation is bolstered by several affiliate certifications and accreditations, which are visible at the bottom of the casino&apos;s site...</p>
                        </div>
                    </section>

                    <SimilarCasinos />
                </div>
            </div>
        </main>
    );
};

export default RobyCasinoContent;