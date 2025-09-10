import React from 'react';


interface Casino {
    name: string;
    logoUrl: string;
    logoBgColor: string;
    reviewUrl: string;
    welcomeBonus: string;
    rating: string;
    isNew: boolean;
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
        <li className="relative card card-compact bg-base-200 transition-all select-none shadow rounded-md">
            <a href={reviewUrl} className="">
                <figure style={{ backgroundColor: logoBgColor }} className="aspect-video rounded-xl border-2 border-base-200">
                    <img
                        alt={`${name} logo`}
                        loading="lazy"
                        className="max-w-[95%] max-h-[95%] transition-transform"
                        draggable="false"
                        src={logoUrl}
                    />
                </figure>
            </a>
            <div className="card-body justify-between">
                <a href={reviewUrl} className="card-title text-base md:text-lg mb-1">
                    <span className="hover:underline">{name}</span>
                    {isNew && <span className="badge py-2 bg-info-content text-white">new</span>}
                </a>
                <a href={reviewUrl} className="w-full flex flex-col mb-2 text-center border border-current border-dashed rounded-md pt-1 group transition-all hover:scale-105">
                    <span className="text-sm opacity-75">Welcome Pack</span>
                    <p className="text-lg font-semibold text-center mb-1 mx-2 leading-tight">{welcomeBonus}</p>
                </a>
                <div className="flex flex-col w-full gap-2">
                    <a href={reviewUrl} className="btn btn-sm btn-outline rounded-md">
                        View review
                    </a>
                </div>
            </div>
            <div className="absolute right-2 top-2 sm:right-4 sm:top-4 badge badge-secondary text-xs leading-none flex items-center gap-1 text-white">
                <span className="w-4 h-4 bg-yellow-500 mask mask-star inline-block"></span>
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
                    <h2 className="text-3xl font-bold underline-offset-8 decoration-dashed">Similar to Roby Casino</h2>
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