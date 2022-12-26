import { ButtonGroupIcon } from "../GroupButton";
import React, { useContext, useEffect } from "react";
import moment from "moment";
import { Web3Context } from "../../Context/web3Context";
import FormModal from "../Modals";
export const TableRow = ({ data }) => {
  const {mintEmployeeNFT , updateEmployeeNFT, burnNft} = useContext(Web3Context);

  const Minted = [{ isMinted: false }];
  const [editModal, setEditModal]= React.useState(false)
  useEffect(() => {
    styleForMinted();
  }, [Minted?.isMinted]);


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
          onClick={()=>mintEmployeeNFT(data)}>
            Mint NFT
          </button>
        </>
      );
    }
  }
  return (
    <>
    <FormModal
    isShow={editModal}
    handleClose={()=>setEditModal(false)}
    data={data}/>
      <tr class="bg-white item-center border-black border-separate border border-slate-300">
        <td class="py-4 px-6 text-center capitalize text-sm">
          {data?.empDetail?.name}
        </td>
        <td class="py-4 px-6 text-center capitalize text-sm">{data?.empDetail?.empCode}</td>
        <td class="py-4 px-6 text-center text-sm">{data?.empDetail?.email}</td>
        <td class="py-4 px-6 text-center text-sm">{data?.projDetails?.[0]?.designation}</td>
        <td class="py-4 px-6 text-center text-sm">
          {!!data && data?.empDetail?.skills.map((item) => {
            return (
              <p className="text-left item-center text-sm capitalize">{item?.title}</p>
            );
          })}
        </td>
        <td class="py-4 px-6 text-center text-sm">
          {data?.projDetails?.[0]?.projectName}
        </td>
        <td class="py-4 px-6 text-center text-sm">
          {!!data?.projDetails?.[0]?.projectStartDate &&
            moment(data?.projDetails?.[0]?.projectStartDate).format(
              "DD/MM/YYYY"
            )}
        </td>
        <td class="py-4 px-6 text-center text-sm">
          {" "}
          {!!data?.projDetails?.[0]?.projectEndDate &&
            moment(data?.projDetails?.[0]?.projectEndDate).format("DD/MM/YYYY")}
        </td>
        <td class="py-4 px-6 text-center text-sm">
          {data?.projDetails?.[0]?.teamSize}
        </td>
        <td class="py-2 px-6 text-center text-sm">
          {!!data?.projDetails?.[0] && styleForMinted()}
        </td>
        <td class="py-4 px-6 w-10 ">
          {
            <ButtonGroupIcon
              isEdit={true}
              isDelete={true}
              disabled={!!!data?.projDetails?.[0]}
              onEditPress={()=>setEditModal(true)
              }
              onDeletePress={()=>burnNft()}
            />
          }
        </td>
      </tr>
    </>
  );
};
