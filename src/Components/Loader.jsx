export function Loader({ isLoading = true, style }) {
  return (
    <i
      className={`bx bx-loader-circle ${
        isLoading ? "spin-loader" : null
      }`}
      style={{ fontSize: "2rem" }}
    ></i>
  );
}
