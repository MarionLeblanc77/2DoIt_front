import { ChangeEvent, useId } from "react";
import "./Field.scss";

interface FieldProps {
  fieldDisplayedName?: string;
  instructions?: string;
  autocomplete?: string;
  value: string;
  type: string;
  placeholder: string;
  onChange: (value: string) => void;
  required: boolean;
}

function Field({
  fieldDisplayedName,
  instructions,
  autocomplete = "off",
  value,
  type,
  placeholder,
  onChange,
  required,
}: FieldProps) {
  const inputId = useId();

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    onChange(event.target.value);
  }

  return (
    <div className="field">
      <label htmlFor={inputId} className="field__label">
        {fieldDisplayedName}
        {required === true && <span aria-label="required">* </span>}
      </label>
      {instructions && <p className="field__instructions">({instructions})</p>}
      <div className="field__inputcontainer">
        <input
          id={inputId}
          className="field__inputcontainer--input"
          type={type}
          autoComplete={autocomplete}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          required={required}
        />
      </div>
    </div>
  );
}

export default Field;
