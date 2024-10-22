import React from "react";
import { AutoComplete } from "primereact/autocomplete";

type CustomAutoCompleteProps = {
  value: any;
  suggestions: any[];
  completeMethod: (event: any) => void;
  onChange: (event: any) => void;
  field: string;
  placeholder: string;
};

const CustomAutoComplete: React.FC<CustomAutoCompleteProps> = ({
  value,
  suggestions,
  completeMethod,
  onChange,
  field,
  placeholder,
}) => {
  return (
    <AutoComplete
      className="w-full"
      value={value}
      suggestions={suggestions}
      completeMethod={completeMethod}
      onChange={onChange}
      field={field}
      placeholder={placeholder}
      dropdown
    />
  );
};

export default CustomAutoComplete;
