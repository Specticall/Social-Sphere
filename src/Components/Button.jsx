export default function Button({
  width = "9rem",
  buttonText = "Contact",
  type = "primary",
  className = "",
  padding = "0.8rem 0rem",
  goToPage = () => {},
  onClick = () => {},
  children,
}) {
  const customClassList = type === "primary" ? "purple-button" : "gray-button";

  return (
    <button
      style={{ width, padding }}
      className={`${className} ${customClassList} button-default`}
      onClick={() => {
        goToPage();
        onClick();
      }}
    >
      {!children ? buttonText : ""}
      {children}
    </button>
  );
}
