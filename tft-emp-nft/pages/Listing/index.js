import { useCallback, useEffect } from "react";
import CardView from "../Components/CardView";
import { useContext } from "react";
import { AuthContext } from "../Context/auth-context";
const Listing = () => {
  const {getData, employeeData} = useContext(AuthContext)

  useEffect(()=>{
    getData()
  },[])
  const dummyData = [
    {
      name: "Atul",
      experience: 1,
      email: "asd@asd.com",
      employeeCode: 1231231,
      projName: "A",
      designation: "Front",
      skills: ["A", "B", "C", "D"],
      startDate: "1/1/2022",
      endDate: "2/12/2022",
      teamSize: "2",
    },
    {
      name: "Atul",
      experience: 1,
      email: "asd@asd.com",
      employeeCode: 1231231,
      projName: "A",
      designation: "Front",
      skills: ["A", "B", "C", "D"],
      startDate: "1/1/2022",
      endDate: "2/12/2022",
      teamSize: "2",
    },
    {
      name: "Atul",
      experience: 1,
      email: "asd@asd.com",
      employeeCode: 1231231,
      projName: "A",
      designation: "Front",
      skills: ["A", "B", "C", "D"],
      startDate: "1/1/2022",
      endDate: "2/12/2022",
      teamSize: "2",
    },
    {
      name: "Atul",
      experience: 1,
      email: "asd@asd.com",
      employeeCode: 1231231,
      projName: "A",
      designation: "Front",
      skills: ["A", "B", "C", "D"],
      startDate: "1/1/2022",
      endDate: "2/12/2022",
      teamSize: "2",
    },
  ];
  console.log(employeeData, "eployeeData")
  return (
    <div className="px-28 py-8 flex flex-row flex-wrap justify-center bg-my_bg_image">
      {dummyData.map((elm, index) => {
        return <CardView data={elm} key={index}/>;
      })}
    </div>
  );
};

export default Listing;
