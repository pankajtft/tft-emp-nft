import { useContext, useEffect } from "react";
import SearchBar from "../Components/SearchBar";
import { TableHeader } from "../Components/Table/TableHeader";
import { TableRow } from "../Components/Table/TableRow";
import { AuthContext } from "../Context/auth-context";
const Listing = () => {
  const { employeeData } = useContext(AuthContext);
  console.log(employeeData);
  //   useEffect(() => {
  //     (async () => {
  //       const emp_data = await getData();
  //       console.log(emp_data);
  //     })();
  //   }, []);

  const val = [
    {
      name: "Demo Name",
      email: "Demo@gmail.com",
      empCode: "121212",
      projectName: "EMS",
      projectStartDate: "1/2/2022",
      projectEndDate: "1/12/2022",
      teamSize: "5",
      designation: "Frontend",
      skills: ["React", "Vue", "JavaScript", "Blockchain"],
    },
  ];
  function setLength() {
    let data = employeeData;
    while (data?.length < 5) {
      data.push({
        name: "",
        email: "",
        empCode: "",
        projectName: "",
        projectStartDate: "",
        projectEndDate: "",
        teamSize: "",
        designation: "",
        skills: [],
      });
    }
    return data;
  }
  return (
    <div className="bg-my_bg_image py-6">
      {/* <h1 className='flex flex-col text-white w-auto border-r rounded-b justify-center items-center justify-center '>NFT Listing</h1> */}
      <div class="flex flex-col w-auto border-r rounded-b justify-center items-center justify-center ">
        <div className="w-1/2 justify-self-center m-8 shadow-inner">
          <SearchBar />
        </div>
        <div className="w-auto border-2 mx-20 border-double">
          <table className="border-collapse">
            <TableHeader />
            {setLength().map((item) => {
              return <TableRow data={item} />;
            })}
          </table>
        </div>
      </div>
    </div>
  );
};
export default Listing;