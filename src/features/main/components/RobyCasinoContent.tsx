import React from 'react';


import { SimilarCasinos } from './SimilarCasinos'; 

const RobyCasinoContent: React.FC = () => {
    return (
       
        <div className="container max-w-screen-xl mx-auto py-8 lg:py-12 px-4 flex flex-col gap-8">

            
            <section className="bg-white p-6 rounded-lg shadow-md flex flex-col sm:flex-row gap-4">
                <div className="relative w-full sm:w-64 my-3 flex-shrink-0">
                    <figure style={{ backgroundColor: '#000000' }} className="w-full aspect-video sm:aspect-square rounded-lg border flex items-center justify-center">
                        <img
                            alt="Roby Casino logo"
                            loading="lazy"
                            className="max-w-[95%] max-h-[95%]"
                            src="https://saycasinoname.com/cdn-cgi/image/w=600/https://rvw.fra1.digitaloceanspaces.com/ROBY_ec8beb9fe7.jpg"
                        />
                    </figure>
                    <span className="absolute -top-1 sm:-top-2 sm:-left-2 badge badge-md bg-green-500 p-2 text-white font-normal border-none">new</span>
                </div>
                <div className="flex flex-col gap-4 justify-center text-black">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl font-bold">Roby Casino</h1>
                        <div className="flex items-center gap-1.5 select-none">
                             <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => <div key={i} className="h-4 w-4 mask mask-star-2 bg-orange-400"></div>)}
                            </div>
                            <span className="text-sm font-semibold text-gray-700">8.6/10</span>
                        </div>
                    </div>
                    <a className="w-full sm:w-80 flex flex-col text-center border border-dashed border-gray-300 rounded-md group transition-all py-4 bg-gray-50 hover:border-blue-500" href="#">
                        <span className="text-md text-gray-600">Welcome Pack</span>
                        <p className="text-lg font-semibold text-center text-black mb-1 mx-2 leading-tight">250% up to 2500 EUR + 250 FS</p>
                    </a>
                    <a href="#" rel="noopener noreferrer" target="_blank" className="btn bg-red-600 hover:bg-red-700 text-white border-none w-full sm:w-80 rounded-md text-lg">
                        Visit casino
                    </a>
                </div>
            </section>

            
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
                    <h2 className="text-xl mb-2 font-bold text-black">What we don't like</h2>
                    <ul className="list-disc list-inside space-y-1">
                        <li>No withdrawals on the weekend</li>
                        <li>Slow withdrawals</li>
                    </ul>
                </div>
            </section>
            
           
            <section className="bg-white p-6 rounded-lg shadow-md">
                 <div role="tablist" className="tabs tabs-bordered">
                    <input defaultChecked type="radio" name="info-tabs" role="tab" className="tab" aria-label="General" />
                    <div role="tabpanel" className="tab-content pt-6 text-gray-800">
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <li className="flex items-start space-x-3"><span className="text-xl">💎</span><div><h3 className="font-bold text-black">Languages:</h3><p>English, German, Finnish, Hungarian, Norwegian, Polish, Portuguese, Spanish, Czech, Italian</p></div></li>
                            <li className="flex items-start space-x-3"><span className="text-xl">💎</span><div><h3 className="font-bold text-black">License:</h3><p>Anjouan</p></div></li>
                        </ul>
                    </div>
                    {/* ... другие вкладки ... */}
                 </div>
            </section>

         
            <section className="bg-white p-6 rounded-lg shadow-md">
                <div className="prose max-w-none text-gray-800">
                    <h2>About Roby Casino</h2>
                    <p>RobyCasino is highly rated on SayCasinoName, both by players and our team. It has earned our certification and is recognized as one of our Certified Casinos, having received the SayCasinoName Certificate of Trust. In addition to our certification, the casino's reputation is bolstered by several affiliate certifications and accreditations, which are visible at the bottom of the casino's site...</p>
                    <h2>Payment Information and Options at Roby Casino</h2>
                    <p>RobyCasino offers a variety of payment methods, including both fiat and cryptocurrencies. You can deposit and withdraw using various web wallets, and cryptocurrency options include Bitcoin, Ethereum, Litecoin, Tether, Dogecoin, Ripple, Bitcoin Cash, Cardano, and more...</p>
                    <h2>Customer Support at Roby Casino</h2>
                    <p>RobyCasino has a friendly and professional support team available 24/7. The fastest way to get in touch with a representative is through their live chat feature...</p>
                    <h2>Games at Roby Casino</h2>
                    <p>RobyCasino offers a wide selection of online slots from renowned providers like NetEnt, Microgaming, BGaming, Pragmatic Play, Hacksaw Gaming, and many others...</p>
                    <h2>Roby Casino’s Commitment to Responsible Gambling</h2>
                    <p>RobyCasino is committed to responsible gambling and provides various tools to help you manage your spending. You can set limits for deposits, losses, and bets directly in your account...</p>
                </div>
            </section>

           
            <SimilarCasinos />

        </div> // Закрываем общий контейнер
    );
};

export default RobyCasinoContent;