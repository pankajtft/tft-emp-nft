import { useRouter } from 'next/router'
function EmployeeDetails() {
  
  const router = useRouter();
  const data = router.query;
 
console.log(data)
  return (
    <div>
      <h1>Name: {data.name}</h1>
      <p>Employee Code: {data.employeeCode}</p>
      <p>Email: {data.email}</p>
      <p>Experience: {data.experience}</p>
      <p>Designation: {data.designation}</p>
      <p>Project Name: {data.projName}</p>
      <p>Start time: {data.startDate}</p>
      <p>End time: {data.endDate}</p>
      <p>Team size: {data.teamSize}</p>    
      <div>
        Skills: 
      {data.skills.map(skills => (
        <div>
          <p>{skills}</p>
        </div> 
        
      ))}
      </div>
    </div>
  );
}

export default EmployeeDetails;
