import { ButtonGroupIcon } from "../GroupButton";
import React, { useEffect } from "react";
import moment from "moment";
export const TableRow = ({ data }) => {
  const Minted = [{ isMinted: false }];
  useEffect(() => {
    styleForMinted();
  }, [Minted?.isMinted]);
  function styleForMinted() {
    if (Minted[0]?.isMinted) {
      return (
        <p className="text-xs text-green-700 font-extrabold uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          Minted
        </p>
      );
    } else {
      return (
        <p className="text-xs text-red-700 font-extrabold uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          Not Minted
        </p>
      );
    }
  }
  return (
    <>
      <tr class="bg-white item-center border-black border-separate border border-slate-300">
        {/* <td
          scope="row"
          class="py-1 px-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          lalit
          {data?._employeeName}
        </td> */}
        <td class="py-4 px-6 text-center">{data?._employeeName}</td>
        <td class="py-4 px-6 text-center">{data?._empId}</td>
        <td class="py-4 px-6 text-center">{data?.email}</td>
        <td class="py-4 px-6 text-center">
          {data?.projects?.[0]?.project_name}
        </td>
        <td class="py-4 px-6 text-center">{data?.designation}</td>
        <td class="py-4 px-6 text-center">
          {data?.projects &&
            moment(data?.projects?.[0]?.project_start_date).format(
              "DD/MM/YYYY"
            )}
        </td>
        <td class="py-4 px-6 text-center">
          {" "}
          {data?.projects &&
            moment(data?.projects?.[0]?.project_end_date).format("DD/MM/YYYY")}
        </td>
        <td class="py-4 px-6 text-center">{data?.teamSize}</td>
        <td class="py-4 px-6 text-center">
          {data?.skills?.map((item) => {
            return <p className="text-left item-center">{item}</p>;
          })}
        </td>
        <td class="py-4 px-6 text-center">{styleForMinted()}</td>
        <td class="py-4 px-6 w-10 ">
          {<ButtonGroupIcon isEdit={true} isDelete={true} />}
        </td>
      </tr>
    </>
  );
};
