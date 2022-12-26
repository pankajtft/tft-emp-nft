import { useContext, useEffect, useState } from "react";
import TableFooter from "../Components/Paginator/PaginatedFooter";
import SearchBar from "../Components/SearchBar";
import { TableHeader } from "../Components/Table/TableHeader";
import { TableRow } from "../Components/Table/TableRow";
import { AuthContext } from "../Context/auth-context";
const Listing = () => {
  const { employeeData } = useContext(AuthContext);
  const [searchData, setSearchData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  let dataLimit=5;
  const pages = Math.round(employeeData?.length / dataLimit);
  function goToNextPage() {  
    currentPage !== pages && setCurrentPage((page) => page + 1);
  }
   function goToPreviousPage() {
    currentPage !== 1 && setCurrentPage((page) => page - 1);
  }
   const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return employeeData.slice(startIndex, endIndex);
  };
  function setLength() {
    let data = employeeData;
    while (data?.length < 5) {
      data.push({
        empDetail:{email:"", empCode:"", name:"",  skills: [],},
        projDetails: [],
        __v: "",
        _id:""
      });
    }
    console.log(data)
    return data;
  }
  // export function getLocalizedDataJournal(
  //   data,
  //   language,
  //   translitration = false
  // ) {
  //   if (data) {
  //     var index = findIndex(data, {
  //       language: language,
  //     });
  //     if (translitration) {
  //       return data?.[index]?.transliteration;
  //     } else {
  //       return data?.[index]?.text || data?.[index]?.shlok;
  //     }
  //   }
  // }
  function handleSearch(search){
    const value= val?.filter((item)=> {
      if(search === undefined||null) return item
      // if(item?.includes(search)) return true
      // if(item?.empDetail?.empCode.includes(searchDatsa)) return item
      if(item?.skills.includes(search)) return item
      if(search){
        var index = val.map((e) =>{ return e.empDetail.name }).indexOf(search);
        return val?.[index]
        // console.log(val[index])
      }
      
  })
  console.log(value)
  return value
}
  return (
    <div className="bg-my_bg_image py-6">
      {/* <h1 className='flex flex-col text-white w-auto border-r rounded-b justify-center items-center justify-center '>NFT Listing</h1> */}
      <div class="flex flex-col w-auto border-r rounded-b justify-center items-center justify-center ">
        <div className="w-1/2 justify-self-center m-8 shadow-inner">
          <SearchBar
          onSearch={(e)=>handleSearch(e.target.value)} />
        </div>
        <div className="w-auto border-2 mx-20 border-double">
          <table className="border-collapse">
            <TableHeader />
            {getPaginatedData().map((item,index) => {
              return <TableRow key={item?._id} data={item} />;
            })}
          </table>
          <TableFooter
          pages={employeeData?.length}
          onPrevButton={()=>goToPreviousPage()}
          onNextButton={()=>goToNextPage()}
          isDisabled={currentPage ==1}
          />
        </div>
      </div>
    </div>
  );
};
export default Listing;
