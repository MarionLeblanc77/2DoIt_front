import { ChangeEvent, useId } from "react";
import "./Field.scss";
import { Edit, Search } from "react-feather";

interface FieldProps {
  fieldDisplayedName: string;
  instructions?: string;
  value: string;
  type: string;
  placeholder: string;
  onChange: (value: string) => void;
  required: boolean;
  search: boolean;
  edit: boolean;
}

function Field({
  fieldDisplayedName,
  instructions,
  value,
  type,
  placeholder,
  onChange,
  required,
  search,
  edit,
}: FieldProps) {
  const inputId = useId();

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    onChange(event.target.value);
  }

  return (
    <div className="field">
      <div className="fieldwithicon">
        <label htmlFor={inputId} className="field__label">
          {fieldDisplayedName}
          {required === true && <span aria-label="required">* </span>}
        </label>
        {instructions && (
          <p className="field__instructions">({instructions})</p>
        )}
        <div className="field__inputcontainer">
          <div
            className="field__inputcontainer--hiddenlabel"
            aria-hidden="true"
          >
            {placeholder}
          </div>
          <div className="field__inputcontainer--field">
            <input
              className="field__inputcontainer--input"
              type={type}
              value={value}
              onChange={handleChange}
              id={inputId}
              placeholder={placeholder}
              required={required}
            />
            {search && (
              <button className="field__inputcontainer--icon" type="submit">
                <Search />
              </button>
            )}
            {edit && (
              <span className="field__inputcontainer--icon">
                <Edit />
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Field;
