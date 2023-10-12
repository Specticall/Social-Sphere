export default function Button({
  width = "9rem",
  buttonText = "Contact",
  type = "primary",
  className = "",
}) {
  const customClassList =
    type === "primary" ? "purple-button" : "gray-button";

  return (
    <button
      style={{ width }}
      className={`${className} ${customClassList} button-default`}
    >
      {buttonText}
    </button>
  );
}
