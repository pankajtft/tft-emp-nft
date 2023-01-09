import React, { useContext } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DEFAULT_DATA_VALUE } from "../EmpForms/constants";
import { useForm } from "react-hook-form";
import {
  FormProvider,
  RHFTextField,
  RHDatepicker,
  RHSelect,
} from "../Hook-form";
import Box from "@mui/material/Box";
import { AuthContext } from "../../Context/auth-context";
import { updateEmployeeData, updateSkills } from "../../utils/apis";
import { useRouter } from "next/router";
import RHMultiCheckDropdown from "../Hook-form/RHMultiCheckDropdown";

export default function FormModal({ isShow, handleClose, data, isSkill }) {
  const methods = useForm({
    shouldUnregister: false,
    defaultValues: data,
    mode: "onChange",
  });
  const { handleSubmit, trigger, watch } = methods;
  watch((data) => setFormData(data));
  const [formdata, setFormData] = React.useState({});
  const router = useRouter();
  const onSubmit = async (projectData) => {
    if (!!isSkill) {
      await updateSkills(projectData).then(() => {
        handleClose();
      });
    } else {
      await updateEmployeeData(projectData, data._id).then(() => {
        handleClose();
      });
    }
  };
  return (
    <div className="flex flex-col w-full">
      <Dialog open={isShow} onClose={handleClose}>
        <DialogTitle>Edit Project Details</DialogTitle>
        <DialogContent sx={{ m: 2, flexWrap: "wrap", alignItems: "center" }}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            {!!isSkill ? (
              <>
                <div className=" m-2 w-full">
                  <RHMultiCheckDropdown
                    name="skills"
                    label="Skills"
                    options={[
                      "React",
                      "Vue",
                      "React Native",
                      "Mongo",
                      "Node",
                      "Blockchain",
                      "Solidity",
                      "JavaScript",
                      "AWS",
                    ]}
                    id="skills"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="m-2">
                  <RHFTextField
                    required={true}
                    id="projectName"
                    name="projDetails[0].projectName"
                    label="Project Name"
                    fullWidth
                    defaultValue={data?.projDetails?.[0]?.projectName ?? ""}
                    variant="outlined"
                    sx={{
                      pb: 0,
                    }}
                  />
                  <div className="flex flex-row my-2 mr-2 justify-around">
                    <RHDatepicker
                      required={true}
                      id="projectStartDate"
                      name="projDetails[0].projectStartDate"
                      label="Project Start Date"
                      fullWidth
                      variant="outlined"
                      defaultValue={
                        data?.projDetails?.[0]?.projectStartDate ?? ""
                      }
                      sx={{
                        pb: 1,
                        mr: 2,
                      }}
                      className="mr-2 pr-4"
                    />
                    <RHDatepicker
                      required={true}
                      id="projectEndDate"
                      name="projDetails[0].projectEndDate"
                      label="Project End Date"
                      fullWidth
                      defaultValue={
                        data?.projDetails?.[0]?.projectEndDate ?? ""
                      }
                      variant="outlined"
                      sx={{
                        pb: 2,
                      }}
                    />
                  </div>
                  <RHFTextField
                    required={true}
                    id="designation"
                    name="projDetails[0].designation"
                    label="Designation"
                    fullWidth
                    defaultValue={data?.projDetails?.[0]?.designation ?? ""}
                    variant="outlined"
                    sx={{
                      pb: 2,
                    }}
                  />
                  <RHSelect
                    required={true}
                    fullWidth
                    id="teamSize"
                    name="projDetails[0].teamSize"
                    label="Team size"
                    variant="outlined"
                    defaultValue={data?.projDetails?.[0]?.teamSize ?? ""}
                    sx={{
                      pb: 2,
                    }}
                    className=" p-6"
                    options={[
                      { label: "2", value: "2" },
                      { label: "3", value: "3" },
                      { label: "4", value: "4" },
                      { label: "5", value: "5" },
                      { label: "6", value: "6" },
                      { label: "7", value: "7" },
                      { label: "8", value: "5" },
                      { label: "9", value: "9" },
                      { label: "10", value: "10" },
                      { label: "11", value: "11" },
                      { label: "12", value: "12" },
                      { label: "13", value: "13" },
                    ]}
                  />
                </div>
              </>
            )}
            <DialogActions>
              <Button
                onClick={handleClose}
                sx={{ mt: 3, ml: 1 }}
                className=" bg-transparent hover:bg-purple-700 text-purple-700 font-semibold hover:text-white py-2 px-8 border border-purple-500 hover:border-transparent rounded"
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                type="submit"
                onSubmit={onSubmit}
                sx={{ mt: 3, ml: 1 }}
                className=" bg-transparent hover:bg-purple-700 text-purple-700 font-semibold hover:text-white py-2 px-8 border border-purple-500 hover:border-transparent rounded"
              >
                Save
              </Button>
            </DialogActions>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </div>
  );
}
