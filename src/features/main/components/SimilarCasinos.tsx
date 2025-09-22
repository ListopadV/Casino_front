import React from 'react';
import Image from 'next/image';


interface Casino {
    name:string;
    logoUrl:string;
    logoBgColor:string;
    reviewUrl:string;
    welcomeBonus:string;
    rating:string;
    isNew:boolean;
}

const similarCasinosData: Casino[] = [
    {
        name: 'Wildsino',
        logoUrl: 'https://saycasinoname.com/cdn-cgi/image/w=600/https://rvw.fra1.digitaloceanspaces.com/Wildsino_64fcd8a23e.png',
        logoBgColor: '#753E3E',
        reviewUrl: '/en/casinos/wildsino',
        welcomeBonus: '100% up to 500 EUR + 200 FS',
        rating: '6.6 / 10',
        isNew: true,
    },
    {
        name: 'Spins Of Glory',
        logoUrl: 'https://saycasinoname.com/cdn-cgi/image/w=600/https://rvw.fra1.digitaloceanspaces.com/images_1_2_baae6a4cad.jpg',
        logoBgColor: '#FFFFFF',
        reviewUrl: '/en/casinos/spinsofglory',
        welcomeBonus: '250% up to 2000 EUR + 250 FS',
        rating: '7 / 10',
        isNew: true,
    },
    // Добавьте сюда больше казино при необходимости
];

const CasinoCard: React.FC<Casino> = ({ name, logoUrl, logoBgColor, reviewUrl, welcomeBonus, rating, isNew }) => {
    return (
        <li className="relative card card-compact bg-gray-200 border border-gray-300 transition-all select-none shadow rounded-md">
            <a href={reviewUrl} className="">
                <figure style={{ backgroundColor: logoBgColor }} className="aspect-video rounded-xl border-2 border-base-200">
                    <Image
                        alt={`${name} logo`}
                        loading="lazy"
                        className="max-w-[95%] max-h-[95%] transition-transform"
                        draggable="false"
                        src={logoUrl}
                        width={300}
                        height={300}
                    />
                </figure>
            </a>
            <div className="card-body flex flex-col text-black p-4">
                <div>
                    <a href={reviewUrl} className="card-title text-base md:text-lg mb-1 items-center">
                        <span className="hover:underline">{name}</span>
                        {isNew && <span className="badge py-1 px-3 ml-2 rounded-full bg-gray-600 border-none text-white text-sm">new</span>}
                    </a>
                    <a href={reviewUrl} className="w-full flex flex-col mt-2 mb-2 text-center border border-current border-dashed rounded-md pt-1 group transition-all hover:scale-105">
                        <span className="text-sm opacity-75">Welcome Pack</span>
                        <p className="text-lg font-semibold text-center mb-1 mx-2 leading-tight">{welcomeBonus}</p>
                    </a>
                </div>

                <a href={reviewUrl} className="btn btn-sm w-full mt-auto bg-transparent hover:bg-gray-300 text-black border border-black rounded-md flex justify-center">
                    View review
                </a>
            </div>
            <div className="absolute right-2 top-2 sm:right-4 sm:top-4 badge rounded-md bg-gray-800/75 border-none text-xs flex items-center gap-1.5 text-white py-1 px-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-500">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007z" clipRule="evenodd" />
                </svg>
                {rating}
            </div>
        </li>
    );
};


export const SimilarCasinos: React.FC = () => {
    return (
        <section className="pb-8 lg:pb-20 px-4">
            <div className="container max-w-screen-xl pb-6">
                <span className="group inline-flex items-center gap-3">
                    <h2 className="text-3xl font-bold underline-offset-8 decoration-dashed text-black">Similar to Roby Casino</h2>
                </span>
            </div>
            <ul className="container max-w-screen-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {similarCasinosData.map((casino) => (
                    <CasinoCard key={casino.name} {...casino} />
                ))}
            </ul>
        </section>
    );
};

export default SimilarCasinos;