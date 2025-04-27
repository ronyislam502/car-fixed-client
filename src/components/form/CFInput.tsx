import { IInput } from "@/types/global";
import { useFormContext } from "react-hook-form";

interface IProps extends IInput {}

const CFInput = ({ name, label, type = "text", placeholder = "" }: IProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text text-xl font-bold">{label}</span>
      </label>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className="input input-bordered  input-success bg-transparent"
      />
      {errors[name] && (
        <p className="text-red-500 text-sm">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default CFInput;
