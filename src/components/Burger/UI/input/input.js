import React from "react";
import classes from "./input.module.css";

const Input = (props) => {
  let inputElement = null;
  let inputClasses = [classes.input];

  if (props.inputvalid && props.shouldevaluate && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  // Destructure props to exclude non-standard attributes
  const { inputvalid, shouldevaluate, touched, changed, elementtype, elementconfig, ...validProps } = props;

  switch (elementtype) {
    case "input":
      inputElement = <input {...validProps} className={inputClasses.join(" ")} onChange={changed} />;
      break;
    case "textarea":
      inputElement = <textarea {...validProps} onChange={changed} />;
      break;
    case "select":
      inputElement = (
        <select {...validProps} onChange={changed}>
          {elementconfig.options.map((ele) => (
            <option key={ele.value} value={ele.value}>
              {ele.displayvalue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = <input {...validProps} onChange={changed} />;
      break;
  }

  return (
    <div>
      <label>{props.Label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
