import { ButtonGroupIcon } from "../GroupButton";
import React, { useContext, useEffect } from "react";
import moment from "moment";
import { Web3Context } from "../../Context/web3Context";
export const TableRow = ({ data }) => {
  const {mintEmployeeNFT , updateEmployeeNFT, burnNft} = useContext(Web3Context);

  const Minted = [{ isMinted: false }];

  useEffect(() => {
    styleForMinted();
  }, [Minted?.isMinted]);

  const mintNFTonETH = async () => {
    let tx = await contract
      .mintEmployeeNFT
      //params
      ();
    tx = tx.wait(1);
    console.log(tx);
  };

  function styleForMinted() {
    if (Minted[0]?.isMinted) {
      return (
        <p className="text-xs text-green-700 font-extrabold uppercase">
          Minted
        </p>
      );
    } else {
      return (
        <>
          <button className="uppercase text-xs bg-green-700 hover:bg-white text-white font-semibold hover:text-green-700 px-6 mx-4 border border-green-700 hover:border-green-700 rounded"
          onClick={()=>mintEmployeeNFT(addEmployee)}>
            Mint NFT
          </button>
        </>
      );
    }
  }
  return (
    <>
      <tr class="bg-white item-center border-black border-separate border border-slate-300">
        <td class="py-4 px-6 text-center capitalize text-sm">
          {data?._employeeName}
        </td>
        <td class="py-4 px-6 text-center capitalize text-sm">{data?._empId}</td>
        <td class="py-4 px-6 text-center text-sm">{data?.email}</td>
        <td class="py-4 px-6 text-center text-sm">
          {data?.skills?.map((item) => {
            return (
              <p className="text-left item-center text-sm capitalize">{item}</p>
            );
          })}
        </td>
        <td class="py-4 px-6 text-center text-sm">
          {data?.projects?.[0]?.project_name}
        </td>
        <td class="py-4 px-6 text-center text-sm">
          {data?.projects &&
            moment(data?.projects?.[0]?.project_start_date).format(
              "DD/MM/YYYY"
            )}
        </td>
        <td class="py-4 px-6 text-center text-sm">
          {" "}
          {data?.projects &&
            moment(data?.projects?.[0]?.project_end_date).format("DD/MM/YYYY")}
        </td>
        <td class="py-4 px-6 text-center text-sm">
          {data?.projects?.[0]?.team_size}
        </td>
        <td class="py-2 px-6 text-center text-sm">
          {data?.projects && styleForMinted()}
        </td>
        <td class="py-4 px-6 w-10 ">
          {
            <ButtonGroupIcon
              isEdit={true}
              isDelete={true}
              disabled={!!!data?.projects}
              onEditPress={()=>updateEmployeeNFT(updateData)}
              onDeletePress={()=>burnNft()}
            />
          }
        </td>
      </tr>
    </>
  );
};
