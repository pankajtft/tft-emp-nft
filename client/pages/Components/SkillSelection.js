
import React, { Component } from "react";
import { default as ReactSelect } from "react-select";
import { components } from "react-select";

const SkillSelect = () => {
    const [state, setState] = React.useState([null])
    const Option = (props) => {
        return (
          <div>
            <components.Option {...props}>
              <input
                type="checkbox"
                checked={props.isSelected}
                onChange={() => null}
              />{" "}
              <label>{props.label}</label>
            </components.Option>
          </div>
        );
      };
     const skillOptions= [
         {value:"ReactJs",label:"ReactJs" },
         {value:"AngularJs",label:"AngularJs" },
         {value:"React Native",label:"React native" },
         {value:"JavaScript",label:"JavaScript" },
         {value:"Mongo",label:"Mongo" },
     ];
  function handleChange(selected) {
    return(
    setState({
      optionSelected: selected
    })
    )
  };
    return (
    
        <ReactSelect
          options={skillOptions}
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          components={{
            Option
          }}
          onChange={handleChange}
          allowSelectAll={true}
          value={state.optionSelected}
          className="block w-full bg-gray-200 text-black rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
        />
    );
}
export default SkillSelect