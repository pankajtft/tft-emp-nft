import { useContext, useEffect, useState } from "react";
import TableFooter from "../Components/Paginator/PaginatedFooter";
import SearchBar from "../Components/SearchBar";
import { TableHeader } from "../Components/Table/TableHeader";
import { TableRow } from "../Components/Table/TableRow";
import { AuthContext } from "../Context/auth-context";
import { debounce } from "lodash";
const Listing = () => {
  const { employeeData } = useContext(AuthContext);
  const [myData, setMyData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  let dataLimit = 5;
  const pages = Math.round(employeeData?.length / dataLimit);

  useEffect(() => {
    setMyData(employeeData);
  }, [employeeData]);

  function goToNextPage() {
    // currentPage !== pages && 
    setCurrentPage((page) => page + 1);
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
    const value = myData.filter((value) => {
      if (value?.empDetail.name.toLowerCase().includes(search.toLowerCase()))
        return true;
      if (value?.empDetail.empCode.toString().includes(search.toString()))
        return true;
      if (value?.empDetail.email.toLowerCase().includes(search.toLowerCase()))
        return true;
      if (value?.projDetails?.[0] && value?.projDetails?.[0].projectName.toLowerCase().includes(search.toLowerCase()))
        return true;
      if (value?.projDetails?.[0] && value?.projDetails?.[0].designation.toLowerCase().includes(search.toLowerCase()))
        return true;
    });
    setMyData(value);
    return value;
  }, 1500);
  return (
    <div className="bg-my_bg_image py-6">
      {/* <h1 className='flex flex-col text-white w-auto border-r rounded-b justify-center items-center justify-center '>NFT Listing</h1> */}
      <div className="flex flex-col w-auto border-r rounded-b justify-center items-center justify-center ">
        <div className="w-1/2 justify-self-center m-8 shadow-inner">
          <SearchBar
            onSearch={(e) => handleSearch(e.target.value)}
            onPress={() => handleSearch()}
          />
        </div>
        <div className="w-auto border-2 mx-20 border-double">
          <table className="border-collapse">
            <TableHeader />
            {!!myData &&
              getPaginatedData().map((item) => {
                return <TableRow key={item?.empDetail?.empCode} data={item} />;
              })}
          </table>
          <TableFooter
            pages={employeeData?.length}
            onPrevButton={() => goToPreviousPage()}
            onNextButton={() => goToNextPage()}
            isDisabled={currentPage == 1}
          />
        </div>
      </div>
    </div>
  );
};
export default Listing;
