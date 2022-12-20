import { useState, useEffect } from 'react';

function EmployeeDetails() {
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api');
      const data = await response.json();
      setProject(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{project.name}</h1>
      <p>Start time: {project.startTime}</p>
      <p>End time: {project.endTime}</p>
      <p>Team size: {project.teamSize}</p>
      <h2>Team Members</h2>
      {project.team.map(member => (
        <div key={member.empCode}>
          <p>Name: {member.name}</p>
          <p>Designation: {member.designation}</p>
          <p>Emp code: {member.empCode}</p>
          <p>Email: {member.email}</p>
          <p>Experience: {member.experience} years</p>
          <p>Skills: {member.skills.join(', ')}</p>
        </div>
      ))}
    </div>
  );
}

export default EmployeeDetails;
