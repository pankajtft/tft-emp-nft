import EmpDetails from "./constants";
import { useForm } from "react-hook-form";
import { DEFAULT_DATA_VALUE } from "./constants";
import moment from "moment";
import React from "react";
const Review = ({data}) =>{


    const {empDetail, projDetails} = data;
    const {email, empCode, name , skills} =empDetail;
    // const{ designation, projectEndDate,projectName, teamSize, projectStartDate}= projDetails?.[0]
    const skillArr=[]
    const skillsIs=()=>{
        skills.map((item, index)=>{return skillArr.push(` ${item?.title}`)})
        return skillArr
    }
    const finalData =[
        {
            label:"Name",
            value:name,
        },
        {
            label:"Email",
            value:email
        },
        {
            label:"Employee Code",
            value:empCode
        },
        {
            label:"Skills",
            value:skillsIs()
        },
        {
            label:"Project Name",
            value:projDetails?.projectName ?? ""
        },
        {
            label:"Designation",
            value:projDetails?.designation ?? ""
        },
        {
            label:"Team Size",
            value:projDetails?.teamSize ??" "
        },
        {
            label:"Project Start Date",
            value:!!projDetails?.projectStartDate&& moment(projDetails?.projectStartDate).format("DD/MM/YYYY")
        },
        {
            label:"Project End Date",
            value:!!projDetails?.projectEndDate && moment(projDetails?.projectEndDate).format("DD/MM/YYYY")
        },
    ]
    console.log(data, "Review")
    return(
        <>
       {!data ? 
       <>
       <div className="flex flex-col w-auto h-1/2 shadow-xl rounded-r-sm font-mono">
           <p className="h-1/2 px-20 py-32"> All the details have been fetched and saved . To add new NFT please fill details again.</p>
       </div>
       </>  :
        <div className="flex flex-col w-auto shadow-xl rounded-r-sm font-mono">
                {finalData.map((item , index)=>{
                    return(
                        <div key={index}className="flex flex-row m-2 text-sm text-black justify-around ">            
                        <p className="w-10 text-black ">{index+1}</p>
                        <p className="w-40 text-black ">{item?.label}</p>
                        <p className="w-10 text-black ">:</p>
                        <p className="w-1/2 ml-1 text-black capitalize">{item?.value}</p>
                        </div>
                    )
                })}
            
        </div>
        }
        </>
    )
}
export default Review