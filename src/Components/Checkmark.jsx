import { useState } from "react";
import { useController } from "react-hook-form";

export default function Checkmark({
  className = "",
  label = "",
  control,
  name,
}) {
  const [active, setActive] = useState(false);
  const { field } = useController({
    name,
    control,
  });

  return (
    <div
      className={className}
      onClick={() => {
        // onChange basically sets the outut data to the argument of onChange
        field.onChange(!active);

        // Update the internal statea
        setActive((current) => !current);
      }}
    >
      <div
        className={`checkmark ${active ? "active" : ""}`}
      >
        <i className="bx bx-check"></i>
      </div>
      {label ? <p>{label}</p> : null}
    </div>
  );
}
