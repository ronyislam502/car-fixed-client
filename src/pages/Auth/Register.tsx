import CFForm from "@/components/form/CFFrom";
import CFInput from "@/components/form/CFInput";
import { Link } from "react-router-dom";

const Register = () => {
  const onSubmit = () => {};

  return (
    <div
      className="flex h-[100vh] w-full flex-col items-center justify-center"
      style={{
        backgroundImage:
          "url(https://i.postimg.cc/gjs4PnnK/Screenshot-2025-04-27-084427.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
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
          <button className="btn btn-outline btn-success w-full" type="submit">
            Login
          </button>
        </div>
      </CFForm>
      <div className="text-center">
        <Link to={"/login"}>
          <p>
            already have an account ?
            <span className="text-blue-400"> Login</span>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Register;
