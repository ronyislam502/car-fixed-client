import CFForm from "@/components/form/CFFrom";
import CFInput from "@/components/form/CFInput";
import { useSignUpMutation } from "@/redux/features/auth/authApi";
import { registerUserValidationSchema } from "@/schema/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [previewImage, setPreviewImage] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const navigate = useNavigate();
  const methods = useForm();

  const [register]=useSignUpMutation()


  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
  
    if (file) {
      setSelectedImage(file);
      const imageUrl = URL.createObjectURL(file);
      // console.log("img", imageUrl);
  
      setPreviewImage(imageUrl);
      }
    };

  const onSubmit =async (data:FieldValues) => {
    const formData = new FormData();
    try {
      const userData={
        name:data?.name,
        email:data?.email,
        phone:data?.phone,
        address:data?.address,
        password:data?.password
      }
      // console.log("data", userData)
      formData.append("data", JSON.stringify(userData));
      if (selectedImage) {
        formData.append("avatar", selectedImage);
      }
      const res = await register(formData).unwrap();
      console.log("server",res)

      if(res?.success){
        methods.reset();
        toast.success(res?.message)
        navigate("/login")
      }
    } catch (error) {
      console.log(error)
    }
  };



  return (
    <div
      className="flex h-[100vh] w-full flex-col items-center justify-center"
      style={{
        backgroundImage:
          "url(https://i.postimg.cc/cLZtfCmD/car-dis.webp)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-black/80 px-16 py-6 rounded-2xl text-white">
       <h3 className="my-2 text-2xl font-bold text-white text-center">Register with Car-Fixed</h3>
       <p className="mb-4 text-white text-center">Welcome Back! Let&lsquo;s Get Started</p>
       <CFForm resolver={zodResolver(registerUserValidationSchema)} onSubmit={onSubmit}>
        <div className="py-3">
          <CFInput label="Name" name="name" type="text" />
        </div>
        <div className="py-3">
          <CFInput label="Email" name="email" type="email" />
        </div>
        <div className="py-3">
          <CFInput label="Phone" name="phone" type="text" />
        </div>
        <div className="py-3">
          <CFInput label="Address" name="address" type="text" />
        </div>
        <div className="py-3">
          <CFInput label="Password" name="password" type="password" />
        </div>
        <div>
        <div className="min-w-fit flex-1">
          <label className="text-xl text-white">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input file-input-bordered file-input-success"
          />
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="mt-4 w-20 max-h-64 object-cover rounded-full shadow"
            />
          )}
        </div>
        </div>
        <div className="text-center py-4">
          <button className="btn btn-outline btn-success w-full" type="submit">
            Register
          </button>
        </div>
      </CFForm>
      <div className="text-center">
        <Link to={"/login"}>
          <p className="text-white">
            already have an account ?
            <span className="text-blue-400"> Login</span>
          </p>
        </Link>
      </div>
      </div>
    </div>
  );
};

export default Register;
