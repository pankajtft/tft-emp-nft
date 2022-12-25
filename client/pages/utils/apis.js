import axios from "axios";

export const getEmployeeData = async () => {
  try {
    const Path = "http://localhost:4080/";
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
  console.log(FormData);
  try {
    const Path = "http://localhost:4080/";
    const res = await axios.post(`${Path}employee`, FormData);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    let data = res;
    return data;
  } catch (e) {
    console.log(e, "Error fetching Employee Details");
  }
};
