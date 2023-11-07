type Props = {
  label: string;
  placeholder?: string;
  value: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const FormInput = ({ label, placeholder, value, onChange }: Props) => {
  return (
    <div>
      <label className="my-3 block text-black dark:text-white font-bold">
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e)}
        type="text"
        placeholder={placeholder || label}
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition min-h-[48px] focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
      />
    </div>
  );
};

export default FormInput;
