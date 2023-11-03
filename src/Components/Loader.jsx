export function Loader({ isLoading = true }) {
  return (
    <i
      className={`bx bx-loader-circle ${
        isLoading ? "spin-loader" : null
      }`}
    ></i>
  );
}
