import EmpDetails from "./constants";
const Review = ({data}) =>{
    console.log(data, "DADADAQDAD")
    const {empDetail} = data
    // const {
    //     name,
    //     email,
    //     experience,
    //     empCode,
    //     projectName,
    //     projectStartDate,
    //     projectEndDate,
    //     teamSize,
    //     designation,
    // } = empDetail
    let value=true
    const finalData =[
        {
            label:"Name",
            value:"name"
        },
        {
            label:"Email",
            value:"email"
        },
        {
            label:"Employee Code",
            value:"empCode"
        },
        {
            label:"Project Name",
            value:"projectName"
        },
        {
            label:"Experience",
            value:"experience"
        },
        {
            label:"Designation",
            value:"designation"
        },
        {
            label:"Team Size",
            value:"teamSize"
        },
        {
            label:"Project Start Date",
            value:"projectStartDate"
        },
        {
            label:"Project End Date",
            value:"projectEndDate"
        },
    ]
    return(
        <>
       {value ? 
       <>
       <div className="flex flex-col w-auto h-1/2 shadow-xl rounded-r-sm font-mono bg-gradient-to-r from-[#332575] to-[#928DAB">
           <p className="h-1/2 px-20 py-32"> All the details have been fetched and saved . To add new NFT please fill details again.</p>
       </div>
       </>  :
        <div className="flex flex-col w-auto shadow-xl rounded-r-sm font-mono bg-gradient-to-r from-[#332575] to-[#928DAB">
                {finalData.map((item , index)=>{
                    return(
                        <div key={index}className="flex flex-row m-2 text-sm text-black justify-around ">            
                        <p className="w-10 text-white ">{index+1}</p>
                        <p className="w-40 text-white ">{item?.label}</p>
                        <p className="w-10 text-white ">:</p>
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