import { useContext, useEffect, useState, useCallback } from "react";
import TableFooter from "../Components/Paginator/PaginatedFooter";
import SearchBar from "../Components/SearchBar";
import { TableHeader } from "../Components/Table/TableHeader";
import { TableRow } from "../Components/Table/TableRow";
import { AuthContext } from "../Context/auth-context";
import { debounce } from "lodash";
import { useRouter } from "next/router";
import { getEmployeeData } from "../utils/apis";

const Listing = () => {
  const { isUserAdmin } = useContext(AuthContext);
  const [employeeData, setEmployeeData] = useState([]);
  const [myData, setMyData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  let dataLimit = 5;
  const pages = Math.round(employeeData?.length / dataLimit);
  const router = useRouter();

  const getData = useCallback(async () => {
    const data = await getEmployeeData();
    if (data) {
      setEmployeeData(data);
    } else return null;
  }, [employeeData]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setMyData(employeeData);
  }, [employeeData]);

  function goToNextPage() {
    currentPage <= pages && setCurrentPage((page) => page + 1);
  }
  function goToPreviousPage() {
    currentPage !== 1 && setCurrentPage((page) => page - 1);
  }
  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return myData?.slice(startIndex, endIndex);
  };

  const handleSearch = debounce((search) => {
    console.log(search);
    if (search === "") return setMyData(employeeData);
    const value = myData.filter((val) => {
      if (val?.empDetail.name.toLowerCase().includes(search.toLowerCase()))
        return true;
      if (val?.empDetail.empCode.toString().includes(search.toString()))
        return true;
      if (val?.empDetail.email.toLowerCase().includes(search.toLowerCase()))
        return true;
      if (
        val?.projDetails?.[0] &&
        val?.projDetails?.[0].projectName
          .toLowerCase()
          .includes(search.toLowerCase())
      )
        return true;
      if (
        val?.projDetails?.[0] &&
        val?.empDetails?.designation
          .toLowerCase()
          .includes(search.toLowerCase())
      )
        return true;
    });
    setMyData(value);
    return value;
  }, 1500);

  // function handleClick(values) {
  //   if (values) {
  //     router.push(
  //       {
  //         pathname: "/Listing/EmployeeDetails",
  //         query: { data: JSON.stringify(values) },
  //       },
  //       "/Listing/EmployeeDetails"
  //     );
  //   }
  // }
  return (
    <div className="bg-my_bg_image py-6 h-full">
      {/* <h1 className='flex flex-col text-white w-auto border-r rounded-b justify-center items-center justify-center '>NFT Listing</h1> */}
      <div className="flex flex-col w-auto border-r rounded-b justify-center items-center justify-center  ">
        <div className="w-1/2 justify-self-center m-8 shadow-inner">
          <SearchBar
            onSearch={(e) => handleSearch(e.target.value)}
            onPress={() => handleSearch()}
          />
        </div>
        <div className="w-auto border-2 mx-20 border-double">
          <table className="border-collapse">
            <TableHeader isAdmin={isUserAdmin} />
            {!!myData &&
              getPaginatedData().map((item) => {
                return (
                  <TableRow
                    key={item?.empDetail?.empCode}
                    data={item}
                    // handlieOnClick={() => handleClick(item)}
                  />
                );
              })}
          </table>
          {!!myData && (
            <TableFooter
              pages={employeeData?.length}
              pageNo={currentPage}
              next={currentPage !== pages}
              onPrevButton={() => goToPreviousPage()}
              onNextButton={() => goToNextPage()}
              // isDisabled={currentPage === pages}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default Listing;
