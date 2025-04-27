import { IInput } from "@/types/global";
import { useFormContext } from "react-hook-form";

interface IProps extends IInput {
  type?: string;
}
const CFTextarea = ({ name, label, placeholder = "" }: IProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <textarea
        placeholder={placeholder}
        {...register(name)}
        className="textarea textarea-bordered"
      />
      {errors[name] && (
        <p className="text-red-500 text-sm">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default CFTextarea;
