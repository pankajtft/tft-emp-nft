import * as yup from 'yup';

const empDetailSchema =  yup.object().shape({
    empDetail:yup.object().shape({
    name: yup.string().required("Please enter your name"),
    email: yup.string().email().required("Enter Valid Email"),
    empCode: yup.string().matches(/^[0-9]+$/, "Please enter valid number.").min(6, "Minimum Six digit code required").required("Required"),
    skills: yup.array().min(1, "Atleast 1 value is required").required("Required"),
  })
})
// /^[0-9]{1,7}$/ 
// /^d+$/
// /^[1-9][0-9]{5}$/

  const projDetailsSchema = yup.object().shape({
    projDetails :yup.object().shape({
    projectName:yup.string().required("Please enter project name"),
    projectStartDate: yup.date().required("Start Date is required"),
    // projectEndDate: yup.date().required("Project End date is required"),
    designation:yup.string().required("Designation cannot be empty"),
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

  export const validationSchema =[
    empDetailSchema,
    projDetailsSchema
];