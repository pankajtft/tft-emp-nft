import * as React from "react";
export default function MyForm() {
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [isMinted, setIsMinted] = React.useState(false);
  const [formData, setFormData] = React.useState({})
  const isConnected = false;
  const mintNFT = async (e) => {
    e.preventDefault();
    // await handleNFTUpload();
    console.log(formData)
  };
  return (
    <div className="flex flex-col">
      <div className="self-center">
        <h1 className="my-4 text-4xl font-extrabold tracking-tight leading-none text-white">
          Add Employee{" "}
          <span className="text-indigo-500 dark:text-blue-500">Details.</span>
        </h1>
      </div>
      <div className="flex justify-around ml-10 w-full ">
        <>
          <form className="w-full max-w-lg">
            <>
              <div className="flex flex-wrap -mx-1 mb-6">
                <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                    for="grid-first-name"
                  >
                    Name
                  </label>
                  <input
                    className="block w-full bg-gray-200 text-black rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name"
                    type="text"
                    placeholder="Enter Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />
                  <p className="text-red-500 text-xs italic hidden">
                    Please fill out this field.
                  </p>
                </div>
                <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                    for="grid-first-name"
                  >
                    Email
                  </label>
                  <input
                    className="block w-full bg-gray-200 text-black rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name"
                    type="text"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                  />
                  <p className="text-red-500 text-xs italic hidden">
                    Please fill out this field.
                  </p>
                </div>
                <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                    for="grid-first-name"
                  >
                    Employee code
                  </label>
                  <input
                    className="block w-full bg-gray-200 text-black rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name"
                    type="text"
                    placeholder="Enter Employee Code"
                    value={formData.empCode}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        empCode: e.target.value,
                      }))
                    }
                  />
                  <p className="text-red-500 text-xs italic hidden">
                    Please fill out this field.
                  </p>
                </div>
                <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                    for="grid-first-name"
                  >
                    Experience (in years)
                  </label>
                  <input
                    className="block w-full bg-gray-200 text-black rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name"
                    type="text"
                    placeholder="Total experience"
                    value={formData.experience}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        experience: e.target.value,
                      }))
                    }
                  />
                  <p className="text-red-500 text-xs italic hidden">
                    Please fill out this field.
                  </p>
                </div>
                <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                    for="grid-first-name"
                  >
                    Designation
                  </label>
                  <input
                    className="block w-full bg-gray-200 text-black rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name"
                    type="text"
                    placeholder="Designation or roles"
                    value={formData.designation}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        designation: e.target.value,
                      }))
                    }
                  />
                  <p className="text-red-500 text-xs italic hidden">
                    Please fill out this field.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
              </div>
              <div className="flex flex-wrap -mx-3 mb-2">
              </div>
            </>
          </form>
        </>
        <>
        <form className="w-full max-w-lg">
            <>
              <div className="flex flex-wrap -mx-1 mb-6">
                <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                    for="grid-first-name"
                  >
                    Project Name
                  </label>
                  <input
                    className="block w-full bg-gray-200 text-black rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name"
                    type="text"
                    placeholder="Project Name"
                    value={formData.projectName}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        projectName: e.target.value,
                      }))
                    }
                  />
                  <p className="text-red-500 text-xs italic hidden">
                    Please fill out this field.
                  </p>
                </div>
                <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                    for="grid-first-name"
                  >
                    Project Start Date
                  </label>
                  <input
                    className="block w-full bg-gray-200 text-black rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name"
                    type="date"
                    placeholder="Start date"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        startDate: e.target.value,
                      }))
                    }
                  />
                  <p className="text-red-500 text-xs italic hidden">
                    Please fill out this field.
                  </p>
                </div>
                <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                    for="grid-first-name"
                  >
                    Project End Date
                  </label>
                  <input
                    className="block w-full bg-gray-200 text-black rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name"
                    type="date"
                    placeholder="End date"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        endDate: e.target.value,
                      }))
                    }
                  />
                  <p className="text-red-500 text-xs italic hidden">
                    Please fill out this field.
                  </p>
                </div>
                <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                    for="grid-first-name"
                  >
                    Team size
                  </label>
                  <input
                    className="block w-full bg-gray-200 text-black rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name"
                    type="text"
                    placeholder="Team size"
                    value={formData.teamSize}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        teamSize: e.target.value,
                      }))
                    }
                  />
                  <p className="text-red-500 text-xs italic hidden">
                    Please fill out this field.
                  </p>
                </div>
                
                <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                    for="grid-first-name"
                  >
                    Skills
                  </label>
                  <div className="flex flex-row px-1">
                  <input
                    className="block w-full bg-gray-200 text-black rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name"
                    type="text"
                    placeholder="Skills"
                    value={formData.skills}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        skills: e.target.value,
                      }))
                    }
                  />
                  {/* <SkillSelect/> */}
                  </div>
                  <p className="text-red-500 text-xs italic hidden">
                    Please fill out this field.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
              </div>
            </>
          </form>
        </>
      </div>
      <button
        className="w-1/4 mr-4 my-2 text-sm text-center  bg-white  self-center
        bg-transparent hover:bg-indigo-500 text-purple-700 font-semibold hover:text-white py-4 px-16 border border-purple-500 hover:border-transparent rounded"
        onClick={(e) => mintNFT(e)}
      >
        Upload Data
      </button>
    </div>
  );
}
