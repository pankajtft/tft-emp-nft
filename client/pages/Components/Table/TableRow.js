import { ButtonGroupIcon } from "../GroupButton";
import React, { useContext, useEffect } from "react";
import moment from "moment";
import { Web3Context } from "../../Context/web3Context";
import FormModal from "../Modals";
import DialogBox from "../ConfirmModal";
import { deleteData } from "../../utils/apis";
import { AuthContext } from "../../Context/auth-context";
export const TableRow = ({ data }) => {
  const { mintEmployeeNFT, updateEmployeeNFT, burnNft } =
    useContext(Web3Context);
  const {isUserAdmin} =useContext(AuthContext)
  const Minted = [{ isMinted: false }];
  const [editModal, setEditModal] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState(false)
  useEffect(() => {
    styleForMinted();
  }, [data?.tokenId]);

  function styleForMinted() {
    if (data.tokenId !== undefined) {
      return (
        <p className="text-xs text-green-700 font-extrabold uppercase">
          Minted
        </p>
      );
    } else {
      return (
        <>
          <button
            className="uppercase text-xs bg-green-700 hover:bg-white text-white font-semibold hover:text-green-700 px-6 mx-4 border border-green-700 hover:border-green-700 rounded"
            onClick={() => mintEmployeeNFT(data)}
          >
            Mint NFT
          </button>
        </>
      );
    }
  }
  function handleDeleteOption(val){
    if(val){
      data?.tokenId ? burnNft(data) : deleteData(data._id)
      setDeleteModal(false)
      }
    else setDeleteModal(false)
  }
  return (
    <>
      <FormModal
        isShow={editModal}
        handleClose={() => setEditModal(false)}
        data={data}
      />
      {deleteModal && (
        <DialogBox
          title={"Are you sure you want to delete this NFT?"}
          btnTitle1={"Cancel"}
          btnTitle2={"Delete"}
          isOpen={deleteModal}
          handleClose={() => setDeleteModal(false)}
          onButtonPress={(val) => handleDeleteOption(val)}
        />
      )}
      <tbody>
        <tr className="bg-white item-center border-black border-separate border border-slate-300">
          <td className="py-4 px-6 text-center capitalize text-sm">
            {data?.empDetail?.name}
          </td>
          <td className="py-4 px-6 text-center capitalize text-sm">
            {data?.empDetail?.empCode}
          </td>
          <td className="py-4 px-6 text-center text-sm">
            {data?.empDetail?.email}
          </td>
          <td className="py-4 px-6 text-center text-sm">
            {data?.projDetails?.[0]?.designation}
          </td>
          <td className="py-4 px-6 text-center text-sm">
            {!!data &&
              data?.empDetail?.skills.map((item, index) => {
                return (
                  <p
                    className="text-left item-center text-sm capitalize"
                    key={index}
                  >
                    {item?.title}
                  </p>
                );
              })}
          </td>
          <td className="py-4 px-6 text-center text-sm">
            {data?.projDetails?.[0]?.projectName}
          </td>
          <td className="py-4 px-6 text-center text-sm">
            {!!data?.projDetails?.[0]?.projectStartDate &&
              moment(data?.projDetails?.[0]?.projectStartDate).format(
                "DD/MM/YYYY"
              )}
          </td>
          <td className="py-4 px-6 text-center text-sm">
            {" "}
            {!!data?.projDetails?.[0]?.projectEndDate &&
              moment(data?.projDetails?.[0]?.projectEndDate).format(
                "DD/MM/YYYY"
              )}
          </td>
          <td className="py-4 px-6 text-center text-sm">
            {data?.projDetails?.[0]?.teamSize}
          </td>
          { isUserAdmin && 
          <><td className="py-2 px-6 text-center text-sm">
            {!!data?.projDetails?.[0] ? (
              styleForMinted(!!data?.projDetails?.[0]?.projectName)
            ) : (
              <>
                <button
                  disabled={true}
                  className="uppercase text-xs bg-slate-300 text-slate-50 font-semibold px-6 mx-4 border rounded"
                  onClick={() => console.log("isDisabled")}
                >
                  Mint NFT
                </button>
              </>
            )}
          </td>
          <td className="py-4 px-6 w-10 ">
            {
              <ButtonGroupIcon
                isEdit={true}
                isDelete={true}
                disabled={!!!data}
                onEditPress={() => setEditModal(true)}
                onDeletePress={() => setDeleteModal(true)}
              />
            }
          </td>
          </>}
        </tr>
      </tbody>
    </>
  );
};
