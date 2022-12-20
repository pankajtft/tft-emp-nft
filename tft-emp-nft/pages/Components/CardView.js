import EmployeeDetails from "./Hook-form/detailPageEmp"

const empDetails = EmployeeDetails();

const CardView = () =>{
    return(
//         <div class="max-w-xs bg-white bg-opacity-0 border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 mx-4 my-4 ">
//     <a href="#">
//         <img class="rounded-t-lg w-auto h-48" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ861kKtQQNaB-ldRWBs6MQqTVkShMh9tEJOn_BQKmrmSFHu76MI-TOTA-lGnloYzZgKvk&usqp=CAU" alt="" />
//     </a>
//     <div class="p-5">
//         <a href="#">
//             <h5 class="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">Shikhar</h5>
//         </a>
//         <p class="mb-0 font-normal text-white dark:text-white-400">EmpCode: 1201202</p>
//         <p class="mb-0 font-normal text-white dark:text-white-400">Email: shikhar@naimanega.com</p>
//         <p class="mb-0 font-normal text-white dark:text-white-400">6+ Years Experience</p>
//         <button class=" flex flex-row justify-center items-center bg-transparent hover:bg-black text-white font-semibold hover:text-white py-2 px-20 border border-white hover:border-transparent rounded">
//         More details <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
//             </button>
//     </div>
// </div>


<div class="relative group w-96 h-96 overflow-hidden bg-black m-auto mt-12">
  <img class="object-cover w-full h-full transform duration-700 backdrop-opacity-100" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ861kKtQQNaB-ldRWBs6MQqTVkShMh9tEJOn_BQKmrmSFHu76MI-TOTA-lGnloYzZgKvk&usqp=CAU" />
  <div class="absolute w-full h-full shadow-2xl opacity-20 transform duration-500 inset-y-full group-hover:-inset-y-0"></div>
  <div class="absolute bg-gradient-to-t from-black w-full h-full transform duration-500 inset-y-3/4 group-hover:-inset-y-0 justify-evenly">
    <div class="absolute w-full flex place-content-center">
      <p class="capitalize font-serif font-bold text-3xl text-center shadow-2xl text-white mt-10">TFT Employee Name</p>
    </div>
    <div class="w-full flex flex-col place-content-center mt-20">
      <p class="font-sans text-left w-4/5 text-white mt-5 mx-4">Experience: <span class="font-sans text-left w-4/5 text-white mt-5 mx-4">6+years</span></p>
      <p class="font-sans text-left w-4/5 text-white mt-5 mx-4">Email: <span class="font-sans text-right w-4/5 text-white mt-5 mx-4">demoMail@tftus.com</span></p>
      <p class="font-sans text-left w-4/5 text-white mt-5 mx-4">Employee Code: <span class="font-sans text-left w-4/5 text-white mt-5 mx-4">123456</span></p>
    </div>
    <button onClick={empDetails} class="absolute left-1/4 bottom-4 bg-white text-black hover:bg-purple-500 font-bold rounded-lg h-10 w-48">See More</button>
  </div>
</div>
    )
}

export default CardView