import { useState, useContext } from "react";
import { NFTContext } from "../context/NFTs";
import Card from "./PrettyCard";
import {
  SketchOutlined,
  DollarOutlined,
  LogoutOutlined,
  RobotOutlined,
  WalletOutlined,
} from "@ant-design/icons";

const NotSoPrettyProfile = () => {
  const { NFTs } = useContext(NFTContext);
  const [openTab, setOpenTab] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function logoutHandle() {
    return setIsModalOpen(!isModalOpen);
  }

  return (
    <>
      <div className="flex flex-col m-12">
        <div className="self-center">
          <h1 className="my-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900">
            {openTab === 1
              ? " My "
              : openTab === 2
              ? "Nft"
              : openTab === 3
              ? "Nft"
              : "My"}
            <span className="text-blue-600 dark:text-blue-500">
              {openTab === 1
                ? " Nft"
                : openTab === 2
                ? " Sold"
                : openTab === 3
                ? " Bought"
                : " Account"}
            </span>
          </h1>
        </div>
        <div className="flex justify-around ml-8 gap-x-4">
          <div className="flex w-full">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
              <div className="px-4 py-5 flex-wrap">
                <div className="tab-content tab-space">
                  <div
                    className={openTab === 1 ? "block" : "hidden"}
                    id="link1"
                  >
                    <div className="flex flex-wrap">
                      {NFTs?.length > 0 ? (
                        NFTs.map((nft, index) => <Card key={index} nft={nft} />)
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  <div
                    className={openTab === 2 ? "block" : "hidden"}
                    id="link2"
                  >
                    <p>No Nft Sold yet</p>
                  </div>
                  <div
                    className={openTab === 3 ? "block" : "hidden"}
                    id="link3"
                  >
                    <p>No nft Bought so far</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <>
            <div className="items-start justify-start flex-col flex-wrap w-1/2 h-1/2">
              <div className="w-full h-full flex-row justify-center items-center  ">
                <div className="justify-evenly items-center flex">
                  <img
                    className=" w-1/2 h-1/2 rounded-full aspect-square	 "
                    src="https://lumiere-a.akamaihd.net/v1/images/h_blackpanther_mobile_19754_57fe2288.jpeg?region=0,0,640,480"
                    alt=""
                  />
                </div>
                <ul
                  className=" mb-0 list-none flex-wrap pt-3 pb-4 w-full"
                  role="tablist"
                >
                  <li className="-mb-px mr-2 last:mr-0 flex-auto ">
                    <a
                      className={
                        "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal w-full " +
                        (openTab === 1
                          ? "text-white bg-gray-700"
                          : "text-black-600 bg-white")
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenTab(1);
                      }}
                      data-toggle="tab"
                      href="#link1"
                      role="tablist"
                    >
                      <SketchOutlined
                        style={{ fontSize: "2rem", marginRight: "1rem" }}
                      />
                      My Nft
                    </a>
                  </li>
                  <li className="-mb-px mr-2 last:mr-0 flex-auto ">
                    <a
                      className={
                        "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal w-full " +
                        (openTab === 2
                          ? "text-white bg-gray-700"
                          : "text-black-600 bg-white")
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenTab(2);
                      }}
                      data-toggle="tab"
                      href="#link2"
                      role="tablist"
                    >
                      <DollarOutlined
                        style={{ fontSize: "2rem", marginRight: "1rem" }}
                      />{" "}
                      Nft's Sold
                    </a>
                  </li>
                  <li className="-mb-px mr-2 last:mr-0 flex-auto ">
                    <a
                      className={
                        "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal w-full " +
                        (openTab === 3
                          ? "text-white bg-gray-700"
                          : "text-black-600 bg-white")
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenTab(3);
                      }}
                      data-toggle="tab"
                      href="#link3"
                      role="tablist"
                    >
                      <RobotOutlined
                        style={{ fontSize: "2rem", marginRight: "1rem" }}
                      />{" "}
                      Nft Bought
                    </a>
                  </li>
                  <li className="-mb-px mr-2 last:mr-0 flex-auto ">
                    <a
                      className={
                        "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal w-full " +
                        (openTab === 4
                          ? "text-white bg-gray-700"
                          : "text-black-600 bg-white")
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenTab(4);
                      }}
                      data-toggle="tab"
                      href="#link4"
                      role="tablist"
                    >
                      <WalletOutlined
                        style={{ fontSize: "2rem", marginRight: "1rem" }}
                      />{" "}
                      Account
                    </a>
                  </li>
                  <li className="-mb-px mr-2 last:mr-0 flex-auto ">
                    <a
                      className={
                        "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal w-full text-black-600 bg-white hover:text-white hover:bg-red-500"
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        logoutHandle();
                      }}
                      data-toggle="tab"
                      href="#link4"
                      role="tablist"
                    >
                      <LogoutOutlined
                        style={{ fontSize: "2rem", marginRight: "1rem" }}
                      />{" "}
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </>
        </div>
      </div>
    </>
  );
};
export default NotSoPrettyProfile;
