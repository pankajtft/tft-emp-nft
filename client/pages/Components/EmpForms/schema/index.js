import * as yup from 'yup';

const empDetailSchema =  yup.object().shape({
    empDetail:yup.object().shape({
    name: yup.string().required("Please enter your name"),
    email: yup.string().email().required("Enter Valid Email").matches(/^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(tftus|thinkfuture)\.com$/g, 'Domain not allowed'),
    empCode: yup.string().matches(/^[0-9]+$/, "Please enter valid number.").min(6, "Minimum Six digit code required").required("Required"),
    skills: yup.array().min(1, "Atleast 1 value is required").required("Required"),
    designation:yup.string().required("Designation cannot be empty")
  })
})
// very important /^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(domain|domain2)\.com$/g
  const projDetailsSchema = yup.object().shape({
    projDetails :yup.object().shape({
    projectName:yup.string().required("Please enter project name"),
    projectStartDate: yup.date().required("Start Date is required"),
    teamSize:yup.string().required("Team size cannot be empty"),
    projectEndDate:yup.date().when('projectStartDate', {
        is: (projectStartDate=> {
          return (!!projectStartDate) ? true : false;
        }),
        then: yup.date().min(yup.ref('projectStartDate'),
          "End date can't be before Start date").required('End Date/Time is required')
      }).nullable(),
  })
  })
  const addProjectSchema = 
    yup.object().shape({
    projectName:yup.string().required("Please enter project name"),
    projectStartDate: yup.date().required("Start Date is required"),
    teamSize:yup.string().required("Team size cannot be empty"),
    projectEndDate:yup.date().when('projectStartDate', {
        is: (projectStartDate=> {
          return (!!projectStartDate) ? true : false;
        }),
        then: yup.date().min(yup.ref('projectStartDate'),
          "End date can't be before Start date").required('End Date/Time is required')
      }).nullable(),
  })
  export const validationSchema =[
    empDetailSchema,
    projDetailsSchema,
    addProjectSchema
];