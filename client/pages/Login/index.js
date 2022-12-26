import React from "react";
import GoogleIcon from '@mui/icons-material/Google';
import { AuthContext } from "../Context/auth-context";
import { useRouter } from "next/router";
const Login = () => {
  const router = useRouter();
  const authContext = React.useContext(AuthContext);
  const {loginWithGoogle, } = authContext
  function handleGoogleSignIn(){
    loginWithGoogle()
  }

  return (
    <div className="flex justify-center bg-my_bg_image">
      <section className="h-full gradient-form md:h-screen">
        <div className="container py-12 px-6 h-full">
          <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
            <div className="xl:w-10/12">
              <div className="block bg-white shadow-lg rounded-lg">
                <div className="lg:flex lg:flex-wrap g-0">
                  <div className="lg:w-6/12 px-4 md:px-0">
                    <div className="md:p-12 md:mx-6">
                      <div className="text-center">
                        <img
                          className="mx-auto w-20"
                          src="https://www.tftus.com/wp-content/uploads/2021/01/logo-1.png"
                          alt="logo"
                        />
                        <h1
                          className="font-extrabold text-3xl 
                                    bg-gradient-to-r bg-clip-text  text-transparent 
                                    from-indigo-500 via-purple-500 to-indigo-500
                                    animate-text mb-12"
                        >
                          We are Tft'ians
                        </h1>
                      </div>
                      <form>
                        <p className="mb-4">Please login to your account</p>
                        <div className="mb-4">
                          <input
                            type="text"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            placeholder="Username"
                          />
                        </div>
                        <div className="mb-4">
                          <input
                            type="password"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            placeholder="Password"
                          />
                        </div>
                        <div className="text-center pt-1 mb-2 pb-1">
                          <button
                            className="inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3 bg-gradient-to-r from-[#332575] to-[#928DAB]"
                            type="button"
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                            onClick={()=> alert("Feature not accessible. Login with Google")}
                            //   style="
                            // background: linear-gradient(
                            //   to right,
                            //   #ee7724,
                            //   #d8363a,
                            //   #dd3675,
                            //   #b44593
                            // );"
                          >
                            Log in
                          </button>
                          <a className="text-gray-500" href="#!">
                            Forgot password?
                          </a>
                        </div>
                      </form>
                      <h1 className="flex justify-center mb-2 text-gray-500">---------OR---------</h1>
                        <div>
                        <button className="flex items-center justify-center w-full px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:border-gray-500 focus:border-gray-500 mx-2"
                        onClick={()=>handleGoogleSignIn()}>
                          <GoogleIcon className=" text-red-700 mr-2"/> 
                                    Login With Google
                                </button>
                        </div>
                    </div>
                  </div>
                  <div
                    className="lg:w-6/12 flex items-center justify-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none bg-gradient-to-r from-[#332575] to-[#928DAB]"
                    // bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                    // style="background: linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593);"
                  >
                    <div className="text-white px-4 py-6 md:p-12 md:mx-6">
                      <h4 className="text-7xl font-semibold mb-6 font-serif text-center">
                        Employee NFT <br/>Zone 
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
