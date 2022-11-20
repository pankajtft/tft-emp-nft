import Link from "next/link";

const PrettyCard = ({ nft }) => (
  <>
    <div className="max-w-sm rounded overflow-hidden shadow-2xl m-4">
      <img
        className="w-full"
        style={{
          backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(
            16
          )}`,
        }}
        alt="example"
        src="https://joeschmoe.io/api/v1/random"
      />
      <div className="px-6 pt-4">
        <div className="font-bold text-xl mb-2">{nft.title}</div>
        <p className="text-gray-700 text-base">{nft.desc}</p>
      </div>
      <div className="flex flex-col items-around pb-5 pl-5">
        <div className="flex justify-between mt-4 space-x-3 md:mt-6">
          <Link
            href={`/nft/${nft.title}`}
            className="inline-flex w-26 items-center px-4 py-2 text-sm font-medium text-center text-white bg-gray-800 rounded-lg"
          >
            Preview{" "}
            <svg
              aria-hidden="true"
              className="w-4 h-4 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </Link>
          <div className="flex justify-center items-center gap-x-2">
            <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-gray-800 rounded-lg">
              {nft.price} ETH
            </button>
            <button className="inline-flex items-center px-4 py-2 mr-4 text-sm font-medium text-center text-white bg-gray-800 rounded-lg">
              {nft.price - 2} TFT
            </button>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default PrettyCard;
