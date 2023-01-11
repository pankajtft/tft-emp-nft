import { ButtonGroupIcon } from "../GroupButton";
import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import FormModal from "../Modals";
import DialogBox from "../ConfirmModal";
import { deleteData, mintEmployee } from "../../utils/apis";
import { AuthContext } from "../../Context/auth-context";
import BannerImg from "../../assets/images/ethereum-1.png";
import Image from "next/image";
import { useRouter } from "next/router";
import { Link } from "next/link";
export const TableRow = ({ data }) => {
  const { isUserAdmin } = useContext(AuthContext);
  const Minted = [{ isMinted: false }];
  const [editModal, setEditModal] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    styleForMinted();
  }, [data?.tokenId]);

  function handleClick() {
    if (data) {
      router.push(
        {
          pathname: "/Listing/EmployeeDetails",
          query: { data: JSON.stringify(data) },
        },
        "/Listing/EmployeeDetails"
      );
    }
  }

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
            onClick={() => {
              mintEmployee(data._id);
            }}
          >
            Mint NFT
          </button>
        </>
      );
    }
  }
  function handleDeleteOption(val) {
    if (val) {
      {
        deleteData(data._id);
        setDeleteModal(false);
      }
    } else setDeleteModal(false);
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
          <td
            className="py-4 px-6 text-center capitalize text-sm"
            onClick={handleClick}
          >
            <Image
              src={BannerImg}
              style={{
                flex: 1,
                width: "50px",
                height: "50px",
                alignSelf: "center",
                borderRadius: "50%",
              }}
            />
          </td>
          <td
            onClick={handleClick}
            className="py-4 px-6 text-center capitalize text-sm"
          >
            {data?.empDetail?.empCode}
          </td>
          <td
            onClick={handleClick}
            className="py-4 px-6 text-center capitalize text-sm"
          >
            {/* <Link
              href={`/Listing/EmployeeDetails?data=${JSON.stringify(data)}`}
              as="/Listing/EmployeeDetails"
            > */}
            <a> {data?.empDetail?.name}</a>
            {/* </Link> */}
          </td>
          <td className="py-4 px-6 text-center text-sm" onClick={handleClick}>
            {data?.empDetail?.email}
          </td>
          <td className="py-4 px-6 text-center text-sm" onClick={handleClick}>
            {data?.empDetail?.designation}
          </td>
          <td className="py-4 px-6 text-center text-sm">
            {!!data &&
              data?.empDetail?.skills.map((item, index) => {
                return (
                  <p
                    className="text-left item-center text-sm capitalize"
                    onClick={handleClick}
                    key={index}
                  >
                    {item}
                  </p>
                );
              })}
          </td>
          {/* <td className="py-4 px-6 text-center text-sm">
            {data?.projDetails?.[data?.projDetails.length - 1]?.projectName}
          </td>
          <td className="py-4 px-6 text-center text-sm">
            {!!data?.projDetails?.[data?.projDetails.length - 1]
              ?.projectStartDate &&
              moment(
                data?.projDetails?.[data?.projDetails.length - 1]
                  ?.projectStartDate
              ).format("DD/MM/YYYY")}
          </td>
          <td className="py-4 px-6 text-center text-sm">
            {" "}
            {!!data?.projDetails?.[data?.projDetails.length - 1]
              ?.projectEndDate &&
              moment(
                data?.projDetails?.[data?.projDetails.length - 1]
                  ?.projectEndDate
              ).format("DD/MM/YYYY")}
          </td>
          <td className="py-4 px-6 text-center text-sm">
            {data?.projDetails?.[data?.projDetails.length - 1]?.teamSize}
          </td> */}
          {isUserAdmin && (
            <>
              <td className="py-2 px-6 text-center text-sm">
                {!!data ? (
                  styleForMinted()
                ) : (
                  // !!data?.projDetails?.[data?.projDetails.length - 1]
                  //   ?.projectName
                  <>
                    <button className="uppercase text-xs bg-slate-300 text-slate-50 font-semibold px-6 mx-4 border rounded">
                      Mint NFT
                    </button>
                  </>
                )}
              </td>
              <td className="py-4 px-6 w-10 ">
                {
                  <ButtonGroupIcon
                    isEdit={false}
                    isDelete={true}
                    disabled={!!!data}
                    onEditPress={() => setEditModal(true)}
                    onDeletePress={() => setDeleteModal(true)}
                  />
                }
              </td>
            </>
          )}
        </tr>
      </tbody>
    </>
  );
};
