import { useState } from "react";

export default function Checkmark({
  className = "",
  label = "",
}) {
  const [active, setActive] = useState(false);

  return (
    <div
      className={className}
      onClick={() => {
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
