import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useContext, useState } from "react";
import { FaGoogle } from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import auth from "../../../Firebase/firebase.config";
import { saveUser } from "../../../api/Utils";

const LoginRegister = () => {
  const { userLogin, createNewUser, setUser, updateUserProfile } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    userLogin(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("🦄 Successfully Login!");
        navigate("/");
      })
      .catch(() => {
        toast.error("Login failed!");
        form.reset();
      });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const password = form.password.value;
    const photo = form.photo.value;
    const email = form.email.value;
  
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      toast.error("Password must be at least 6 characters and include one uppercase and one lowercase letter.");
      return;
    }
  
    try {
      const result = await createNewUser(email, password);
      let user = result.user;
  
      await updateUserProfile({ displayName: name, photoURL: photo });
  
      // Fetch the updated user to reflect changes
      user = { ...user, displayName: name, photoURL: photo };
      setUser(user);
  
      await saveUser({ email, displayName: name, photoURL: photo });
  
      toast.success("Registered Successfully!!");
      navigate("/");
    } catch (err) {
      console.error("Registration Error:", err);
      toast.error(err.message || "Registration failed!");
    }
  };
  
  const handleGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
  
      await saveUser({ email: user.email, displayName: user.displayName, photoURL: user.photoURL });
  
      setUser(user);
      toast.success("Google login Successful!");
      navigate("/");
    } catch (error) {
      console.error("Google login Error:", error);
      toast.error("Google login Failed!");
    }
  };
  return (
    <div className="flex flex-col-reverse lg:flex-row justify-center items-center gap-6 bg-gradient-to-tr from-primary via-primary/60 to-secondary min-h-screen">
      <div className="p-4">
        <div className="bg-transparent shadow-xl rounded-3xl mt-10 lg:mt-28 w-full max-w-md overflow-hidden border border-secondary backdrop-blur-md md:ml-20">
          <div className="flex justify-center border-b">
            <button
              onClick={() => setIsLogin(true)}
              className={`w-1/2 py-4 text-lg font-bold ${
                isLogin
                  ? "text-white border-b-4 border-secondary"
                  : "text-gray-500"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`w-1/2 py-4 text-lg font-bold ${
                !isLogin
                  ? "text-white border-b-4 border-secondary"
                  : "text-gray-500"
              }`}
            >
              Register
            </button>
          </div>

          <div className="p-8 ">
            {isLogin ? (
              <div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-300  text-center">
                    Welcome Back
                  </h2>
                  <p className="text-center text-gray-300 mb-6">
                    Login to your account
                  </p>
                  <div>
                    <label className="block text-sm text-gray-300 font-medium ">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      className="w-full px-4 py-2 mt-1  border  rounded-lg  focus:outline-none focus:ring-2 focus:ring-secondary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      className="w-full px-4 py-2 mt-1  border  rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 bg-secondary text-white font-semibold rounded-lg hover:bg-primary transition duration-200"
                  >
                    Login
                  </button>
                  <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-gray-500">Or</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                  </div>
                </form>
                <div className="text-center my-3 flex mx-auto">
                  <button
                    onClick={handleGoogle}
                    className="btn w-full font-semibold px-12 md:px-24"
                  >
                    <FaGoogle  className="text-2xl" />
                    <span>Sign in with Google</span>
                  </button>
                </div>

                <p className="text-center font-semibold text-gray-300">
                  Don't have an account?{" "}
                  <Link
                    className="text-secondary"
                    onClick={() => setIsLogin(false)}
                  >
                    Register
                  </Link>
                </p>
              </div>
            ) : (
              <div>
                <form onSubmit={handleRegister} className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-300 text-center">
                    Create Account
                  </h2>
                  <p className="text-center text-gray-300 mb-6">
                    Sign up for a new account
                  </p>
                  <div>
                    <label className="block text-sm text-gray-300 font-medium">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      className="w-full px-4 py-2 mt-1  border  rounded-lg  focus:outline-none focus:ring-2 focus:ring-secondary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 font-medium ">
                      Photo URL
                    </label>
                    <input
                      type="text"
                      name="photo"
                      placeholder="Enter your photo URL"
                      className="w-full px-4 py-2 mt-1  border  rounded-lg  focus:outline-none focus:ring-2 focus:ring-secondary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 font-medium ">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      className="w-full px-4 py-2 mt-1 border  rounded-lg  focus:outline-none focus:ring-2 focus:ring-secondary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 font-medium ">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      className="w-full px-4 py-2 mt-1  border  rounded-lg  focus:outline-none focus:ring-2 focus:ring-secondary"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary transition duration-200"
                  >
                    Register
                  </button>

                  <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-gray-500">Or</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                  </div>
                </form>
                <div className="text-center my-3 flex mx-auto">
                  <button
                    onClick={handleGoogle}
                    className="btn w-full font-semibold px-12 md:px-24"
                  >
                    <FaGoogle className="text-2xl" />
                    <span>Sign in with Google</span>
                  </button>
                </div>

                <p className="text-center text-gray-300 font-semibold">
                  Don't have an account?{" "}
                  <Link
                    className="text-secondary"
                    onClick={() => setIsLogin(true)}
                  >
                    LogIn
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="text-center mt-10 lg:mt-0">
        {isLogin ? (
          <div>
            <h1 className="text-4xl font-bold">Login To Your Account</h1>
            <p className="text-lg text-center">Access Your Account and Stay Connected</p>
          </div>
        ) : (
          <div>
            <h1 className="text-4xl font-bold">Create Your New Account</h1>
            <p className="text-lg text-center">Access Your Account and Stay Connected</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginRegister;
