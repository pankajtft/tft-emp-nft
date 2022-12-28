import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EmpDetails from "./EmpDetails";
import ProjectDetails from "./ProjectDetails";
import { DEFAULT_DATA_VALUE } from "./constants";
import { useForm } from "react-hook-form";
import { FormProvider } from "../Hook-form";
import Review from "./Review";
import { useRouter } from "next/navigation";
import DialogBox from "../ConfirmModal";
import { postEmployeeData } from "../../utils/apis";
import { debounce } from "lodash";
const Newform = () => {
  const steps = ["Employee Details", "Project Details", "Review"];
  const [activeStep, setActiveStep] = React.useState(0);
  const [formdata, setFormData] = React.useState({});
  const [show, setShow] = React.useState(false);
  const [skip,setSkip] = React.useState(false)
  const router = useRouter();
  // const currentValidationSchema = validationSchema[activeStep];
  const methods = useForm({
    shouldUnregister: false,
    defaultValues: DEFAULT_DATA_VALUE,
    // resolver: yupResolver(currentValidationSchema),
    mode: "onChange",
  });

  const { handleSubmit, trigger, watch } = methods;
  watch((data) => setFormData(data));
  const handleNext = async () => {
    const isStepValid = await trigger();
    if (isStepValid) {
      handleDialogOption();
      // setActiveStep(activeStep + 1);
    }
  };
  const onSelection = (val) => {
    console.log(val);
    if (val) {
      setActiveStep(activeStep + 1);
      setShow(false);
    } else {
      console.log(formdata, "form Data on no select");
      setActiveStep(activeStep + 2);
      setShow(false);
      setSkip(true)
    }
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
    if(skip){
      setActiveStep(0); 
      setSkip(false)
    }
  };
  const handleDialogOption = () => {
    if(activeStep !== 1)setShow(true);
    else setActiveStep(activeStep+1)
  };
  const onSubmit = async (data) => {
    setFormData(data);
    await postEmployeeData(data).then(()=>{
      alert("Employee details submitted..")
      methods.reset()
      setActiveStep(0);
      router.push("Listing")
    })
    console.log(data, "data");
  };
  function getStepContent(step) {
    switch (step) {
      case 0:
        return <EmpDetails />;
      case 1:
        return <ProjectDetails />;
      case 2:
        return <Review data={formdata} />;
      default:
        throw new Error("Unknown step");
    }
  }
  return (
    <>
      {show && (
        <DialogBox
          isOpen={show}
          handleClose={() => setShow(false)}
          onButtonPress={(val) => onSelection(val)}
        />
      )}
      <div className=" p-6">
        <Container component="main" maxWidth="md" sx={{ mb: 1 }}>
          <Paper
            variant="outlined"
            sx={{ p: { xs: 4, md: 4 } }}
            // className="bg-gradient-to-r from-[#332575] to-[#928DAB]"
          >
            <Typography component="h1" variant="h4" align="center">
              Create NFT for Employee
            </Typography>
            <Stepper
              activeStep={activeStep}
              sx={{ pt: 0, pb: 0, flexWrap: "wrap" }}
            >
              {steps.map((label) => (
                <Step key={label} sx={{ p: 1 }}>
                  <StepLabel sx={{ p: 1 }}>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for Registering.
                </Typography>
                <Typography variant="subtitle1">
                  Your details have been saved and NFT Added to listing.
                </Typography>
                <Button variant="contained" onClick={handleButtonClick}>
                  Done
                </Button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <FormProvider
                  methods={methods}
                  onSubmit={handleSubmit(onSubmit)}
                >
                  {getStepContent(activeStep)}
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    {activeStep !== 0 && (
                      <Button
                        onClick={handleBack}
                        sx={{ mt: 3, ml: 1 }}
                        className=" hover:bg-purple-700 text-purple-700 font-semibold hover:text-white py-1 px-8 border border-purple-500 hover:border-transparent rounded"
                      >
                        Back
                      </Button>
                    )}

                    {activeStep === steps.length - 1 ? (
                      <Button
                        variant="contained"
                        type="submit"
                        onSubmit={onSubmit}
                        sx={{ mt: 3, ml: 1 }}
                        className=" bg-transparent hover:bg-purple-700 text-purple-700 font-semibold hover:text-white py-2 px-8 border border-purple-500 hover:border-transparent rounded"
                      >
                        Save
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        onClick={debounce(() => handleNext())}
                        sx={{ mt: 3, ml: 1 }}
                        className=" bg-white hover:bg-purple-700 text-purple-700 font-semibold hover:text-white py-2 px-8 border border-purple-500 hover:border-transparent rounded"
                      >
                        Next
                      </Button>
                    )}
                  </Box>
                </FormProvider>
              </React.Fragment>
            )}
          </Paper>
        </Container>
      </div>
    </>
  );
};

export default Newform;
