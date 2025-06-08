import CFForm from "@/components/form/CFFrom";
import CFInput from "@/components/form/CFInput";
import { useLogInMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { loginValidationSchema } from "@/schema/authSchema";
import { TError } from "@/types/global";
import { verifyToken } from "@/utils/verifyToken";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login] = useLogInMutation();

  const onSubmit = async (data: FieldValues) => {
    try {
      const authInfo = {
        email: data.email,
        password: data.password,
      };
      const res = await login(authInfo).unwrap();
      const user = verifyToken(res?.data?.accessToken);
      dispatch(setUser({ user: user, token: res?.data?.accessToken }));
      if (res?.success) {
        toast.success(res?.message);
        navigate("/");
      }
    } catch (error) {
      const err = error as TError;
      
      toast.error(err?.data?.message);
    }
  };

  return (
    <div
      className="flex h-[67vh] w-full flex-col items-center justify-center text-white"
      style={{
        backgroundImage:
          "url(https://i.postimg.cc/cLZtfCmD/car-dis.webp)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className=" bg-black/80 px-16 py-6 rounded-2xl">
        <h3 className="my-2 text-2xl font-bold text-center">Login with Car-Fixed</h3>
        <p className="mb-4 text-center">Welcome Back! Let&lsquo;s Get Started</p>
        <CFForm
          resolver={zodResolver(loginValidationSchema)}
          onSubmit={onSubmit}
        >
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
