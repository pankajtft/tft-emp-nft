import BannerImg from "../assets/images/ethereum-1.png"
import Image from "next/image";
import Link from "next/link";
const Banner = () => {
  const isMinted= true
  return (
    <div className="flex flex-col py-16">
      <div className="flex justify-around items-center ml-10 gap-x-4">
        
          <>
            <div className="flex flex-col items-start justify-center w-1/2 py-10 px-28">
            <h1 className="font-extrabold text-6xl 
            bg-gradient-to-r bg-clip-text  text-transparent 
            from-indigo-500 via-purple-500 to-indigo-500
            animate-text
            ">Welcome to the Employee NFT's Zone</h1>
            <p className=" font-semibold py-4 leading-relaxed first-letter:text-6xl 
            bg-gradient-to-r bg-clip-text  text-transparent 
            from-white via-slate-300 to-white text-2xl
            animate-text">
                Here we are happy to let you know that the portal is build using Web3 and blockchain Technology
                which allows you to see your Nft in the form of card with all relavant work history and information .
                lets get started
            </p>
            <Link
              href={{
                pathname: '/Listing',
              }}
              className="bg-transparent hover:bg-indigo-500 text-purple-700 font-semibold hover:text-white py-4 px-16 border border-purple-500 hover:border-transparent rounded"
              // className="inline-flex w-18 items-center px-4 py-2 text-sm font-medium text-center text-white bg-gray-800 rounded-lg"
            >
            My Listing
            </Link>
            </div>
          </>
        <>
         <div className="flex items-center justify-center w-1/2 animate-wiggle">
         <Image src={BannerImg} height={500} width={500} className="
         bg-gradient-to-r 
         from-[#332575]  via-[#928DAB] to-[#332575]
         animate-text 
         rounded-full w-auto"/>
         </div>
         {/* bg-gradient-to-r from-[#332575] via-[#928DAB] to-[#332575] */}
        </>
      </div>
    </div>
  );
};

export default Banner;
