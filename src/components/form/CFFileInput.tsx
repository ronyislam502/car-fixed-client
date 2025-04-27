import { IInput } from "@/types/global";
import { useFormContext } from "react-hook-form";

interface IProps extends IInput {
  accept?: string;
}

const CFFileInput = ({ name, label, accept = "" }: IProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        type="file"
        {...register(name)}
        accept={accept}
        className="file-input file-input-bordered"
      />
      {errors[name] && (
        <p className="text-red-500 text-sm">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default CFFileInput;
