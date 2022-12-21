import React from 'react';


export const getEmployeeData = async() =>{
 try{
    const Path= "http://localhost:4080/"
    const res = await fetch(`${Path}employee`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  let data =await res?.json()
  return data;

 }   
 catch(e){
     console.log(e, "Error fetching Employee Details");
 }
}