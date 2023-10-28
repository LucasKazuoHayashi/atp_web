import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import styles from "./styles.module.css";
import ReactSelect from "react-select";

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
  options: { id?: number; name: string }[];
  selectedOptions: string[];
  setSelectedOptions: (selected: string[]) => void;
}

export default function DropdownMultselect({
  label,
  options,
  selectedOptions,
  setSelectedOptions,
  ...rest
}: Props) {
  const customTheme = (theme: any) => {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        primary25: "#d8d8d8",
        primary: "#d8d8d8",
      },
    };
  };
  return (
    <div className={styles.divInput}>
      <label className={styles.label}>{label}:</label>
      <ReactSelect
        className={styles.dropdown}
        isMulti
        options={options.map(
          (option) =>
            ({
              value: option.id?.toString(),
              label: option.name,
            } as { value: string; label: string })
        )}
        value={selectedOptions?.map(
          (value) =>
            ({
              value,
              label:
                options.find((option) => option.id?.toString() === value)
                  ?.name || "",
            } as { value: string; label: string })
        )}
        onChange={(selected) =>
          setSelectedOptions(selected.map((option) => option.value))
        }
        styles={{
          control: (provided) => ({
            ...provided,
            backgroundColor: "#333",
            color: "#fff",
          }),
          menu: (provided) => ({
            ...provided,
            backgroundColor: "#333",
            color: "#fff",
          }),
        }}
      />
    </div>
  );
}
