export default function Loading({
  isVisible = true,
  inheritStyle = false,
  width = "auto",
}) {
  const inheritStyles = inheritStyle
    ? {
        font: "inherit",
        color: "inherit",
        padding: "inherit",
        margin: "inherit",
      }
    : null;

  return (
    <div
      className="loading"
      style={{
        display: isVisible ? "block" : "none",
        ...inheritStyles,
        width,
      }}
    >
      LOADING
    </div>
  );
}
