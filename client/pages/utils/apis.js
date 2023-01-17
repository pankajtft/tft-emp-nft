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

export const getEmployee = async (_id) => {
  try {
    const res = await fetch(`${Path}employee/${_id}`);
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
  if (!!!FormData?.projDetails?.[0]?.projectName) {
    delete data?.projDetails;
  }
  console.log(data, "Data from API");
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

export const addNewProject = async (formData, _id) => {
  console.log(formData, _id, "Add");
  try {
    const res = await axios.patch(`${Path}employee/${_id}`, {
      projDetails: formData?.projDetails,
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    let resp = res;
    return resp;
  } catch (e) {
    console.log(e, "Error fetching Employee Details");
  }
};
export const editProject = async (formData, _id, projId) => {
  console.log(formData?.projDetails, _id);
  try {
    const res = await axios.patch(
      `${Path}employee/projectUpdate/${_id}/${projId}`,
      formData.projDetails
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    let resp = res;
    return resp;
  } catch (e) {
    console.log(e, "Error fetching Employee Details");
  }
};
export const updateSkills = async (formData) => {
  const id = formData?.id;

  let data = formData?.skills;
  console.log(data, id, "ID");
  try {
    const res = await axios.patch(`${Path}employee/skillUpdate/${id}`, {
      skills: data,
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    console.log(res, "Resp");
    let resp = res;

    return resp;
  } catch (e) {
    console.log(e, "Error fetching Employee Details");
  }
};
export const deleteData = async (_id) => {
  console.log(_id);
  try {
    const res = await axios.delete(`${Path}employee/${_id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    let data = res;
    return data;
  } catch (e) {
    console.log(e, "Error fetching Employee Details");
  }
};

export const getAdminUsers = async () => {
  try {
    const res = await fetch(`${Path}admin`);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    let data = await res?.json();
    data = data?.[0]?.admins;
    return data;
  } catch (e) {
    console.log(e, "Error from GetAdminUSers");
  }
};

export const mintEmployee = async (_id) => {
  console.log(_id);
  try {
    const res = await axios.get(`${Path}contract/mintEmployee/${_id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    let data = res;
    return data;
  } catch (e) {
    console.log(e, "Error fetching Employee Details");
  }
};

export const syncWithBlockchain = async (_id) => {
  console.log(_id);
  try {
    const res = await axios.get(`${Path}contract/syncWithBlockchain/${_id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    let data = res;
    return data;
  } catch (e) {
    console.log(e, "Error fetching Employee Details");
  }
};
