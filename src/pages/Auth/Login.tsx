import CFForm from "@/components/form/CFFrom";
import CFInput from "@/components/form/CFInput";
import { useLogInMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import { FieldValues } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login] = useLogInMutation();

  const onSubmit = async (data: FieldValues) => {
    const authInfo = {
      email: data.email,
      password: data.password,
    };
    const res = await login(authInfo).unwrap();
    const user = verifyToken(res?.data?.accessToken);
    dispatch(setUser({ user: user, token: res.data.accessToken }));
    if (res?.success) {
      toast.success(res.message);
      navigate("/");
    }
    console.log("data", res.data);
  };

  return (
    <div
      className="flex h-[100vh] w-full flex-col items-center justify-center text-white"
      style={{
        backgroundImage:
          "url(https://i.postimg.cc/gjs4PnnK/Screenshot-2025-04-27-084427.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div>
        <h3 className="my-2 text-2xl font-bold">Login with Car-Fixed</h3>
        <p className="mb-4">Welcome Back! Let&lsquo;s Get Started</p>
        <CFForm onSubmit={onSubmit}>
          <div className="py-3">
            <CFInput label="Email" name="email" type="email" />
          </div>
          <div className="py-3">
            <CFInput label="Password" name="password" type="password" />
          </div>
          <div className="text-center py-4">
            <button
              className="btn btn-outline btn-success w-full"
              type="submit"
            >
              Login
            </button>
          </div>
        </CFForm>
        <div className="text-center">
          <Link to={"/register"}>
            <p>
              Don&lsquo;t have an account ?
              <span className="text-blue-400">Register</span>
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
