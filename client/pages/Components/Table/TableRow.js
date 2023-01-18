import { ButtonGroupIcon } from "../GroupButton";
import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import FormModal from "../Modals";
import DialogBox from "../ConfirmModal";
import { deleteData, mintEmployee, syncWithBlockchain } from "../../utils/apis";
import { AuthContext } from "../../Context/auth-context";
import BannerImg from "../../assets/images/ethereum-1.png";
import Image from "next/image";
import { useRouter } from "next/router";
import { Link } from "next/link";
export const TableRow = ({ data }) => {
  const { isUserAdmin } = useContext(AuthContext);
  const Minted = [{ isMinted: false }];
  const [editModal, setEditModal] = React.useState(false);
  const [syncModal, setSyncModal] = React.useState(false);
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
  function handleSync(val) {
    if (val) {
      {
        syncWithBlockchain(data._id);
        setSyncModal(false);
      }
    } else setSyncModal(false);
  }

  const PopUpOptions = () => {
    return (
      <div
        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        style={{
          display: !deleteModal === false ? "none" : "",
        }}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu-button"
        tabIndex={-1}
      >
        <Link
          href="/Profile"
          className="block px-4 py-2 text-sm text-gray-700"
          role="menuitem"
          tabIndex={-1}
          id="user-menu-item-0"
          // onClick={() => setIsShow((prev) => !prev)}
        >
          Your Profile
        </Link>
        <a
          href="#"
          className="block px-4 py-2 text-sm text-gray-700"
          role="menuitem"
          tabIndex={-1}
          id="user-menu-item-1"
        >
          Settings
        </a>
        <button
          href="#"
          className="block px-4 py-2 text-sm text-gray-700"
          role="menuitem"
          id="user-menu-item-2"
          // onClick={()=>logout()}
        >
          Sign out
        </button>
      </div>
    );
  };
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
      {syncModal && data?.tokenId && (
        <DialogBox
          title={"Sync data with blockchain ?"}
          btnTitle1={"Cancel"}
          btnTitle2={"Sync"}
          isOpen={syncModal}
          handleClose={() => setSyncModal(false)}
          onButtonPress={(val) => handleSync(val)}
        />
      )}
      <tbody>
        <tr className="bg-white item-center border-black border-separate border border-slate-300 transition duration-500 hover:rounded-md  hover:scale-110 hover:bg-gray-200 ">
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
                    isView={true}
                    isDelete={true}
                    disabled={!!!data}
                    onEditPress={() => setEditModal(true)}
                    onDeletePress={() => setDeleteModal(true)}
                    onViewPress={() => setSyncModal(true)}
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
