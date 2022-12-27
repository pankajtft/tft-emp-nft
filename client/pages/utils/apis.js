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
  let data = FormData;
  if(!!!FormData?.projDetails?.[0]?.projectName) {
    delete data?.projDetails
  }
  console.log(data, "Data from API")
  try {
    if (data) {
      console.log(data, "Data inside APi Call");
      const res = await axios.post(`${Path}employee`, data);
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

export const updateEmployeeData = async (formData) => {
  const id= formData?._id
  console.log(id, "ID");
  let data = formData;
  if(data?.empDetail) {
    delete data?.updatedAt
    delete data?.isDeleted
    delete data?._id
    delete data?.isActive
    delete data?.createdAt
    delete data?.empDetail
  }
  try {
    const res = await axios.patch(`${Path}employee/${id}`,data);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    let resp = res;
    return resp;
  } catch (e) {
    console.log(e, "Error fetching Employee Details");
  }
};
export const deleteData = async (FormData) => {
  console.log(FormData);
  try {
    const res = await axios.delete(`${Path}employee/${FormData?._id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    let data = res;
    return data;
  } catch (e) {
    console.log(e, "Error fetching Employee Details");
  }
};
