import { IInput } from "@/types/global";
import { useFormContext } from "react-hook-form";

interface IProps extends IInput {
  options: {
    key: string;
    label: string;
  }[];
}

const CFSelect = ({ name, label, options }: IProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <select {...register(name)} className="select select-bordered">
        {options.map((option) => (
          <option key={option?.key} value={option?.label}>
            {option.label}
          </option>
        ))}
      </select>
      {errors[name] && (
        <p className="text-red-500 text-sm">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default CFSelect;
