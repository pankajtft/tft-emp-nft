import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
} from '@mui/material';
import { useCallback, useEffect } from "react";
import CardView from "../Components/CardView";
import { useContext } from "react";
import { AuthContext } from "../Context/auth-context";
const Listing = () => {
  const {getData, employeeData} = useContext(AuthContext)

  function HeaderRow () {
    return(
      < TableContainer >
      <Table>
        <TableHead>
          <TableRow className='bg-gradient-to-r from-[#332575] to-[#928DAB] sticky top-0 z-50'>
          <TableCell>Name</TableCell>
          <TableCell>Employee code</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Experience</TableCell>
          <TableCell>Designation</TableCell>
            <TableCell>Project name</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Team size</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
      </Table>
        </TableContainer >
    )
  }

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
      status: "Failed",
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
      status: "Completed",
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
      status: "Pending",
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
      status: "Completed",
    },
  ];
  console.log(employeeData, "eployeeData")
  return (
    <div className="px-28 py-8 flex flex-row flex-wrap justify-center bg-my_bg_image">
      <HeaderRow/>
      {dummyData.map((elm, index) => {
        return <CardView data={elm} key={index}/>;
      })}
    </div>
  );
};

export default Listing;
