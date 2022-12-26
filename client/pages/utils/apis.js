import axios from "axios";
import { Path } from "./apiPaths";
export const getEmployeeData = async () => {
  try {
    const res = await fetch(`${Path}employee`);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    let data = await res?.json();
    return data;
  } catch (e) {
    console.log(e, "Error fetching Employee Details");
  }
};

export const postEmployeeData = async (FormData) => {
  let data={};
  if(!!FormData?.projDetails?.[0]?.projectName) data= FormData
  else data.empDetail= FormData?.empDetail  
  try {
    if(data){
   const res = await axios.post(`${Path}employee`,data);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    let response = res;
    return response;
  }
  } catch (e) {
    console.log(e, "Error fetching Employee Details");
  }
};

export const updateEmployeeData = async (FormData) => {
  console.log(FormData);
  try {
    const res = await axios.patch(`${Path}employee/${FormData?._id}`, FormData);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    let data = res;
    return data;
  } catch (e) {
    console.log(e, "Error fetching Employee Details");
  }
};