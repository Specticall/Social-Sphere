export function Loader({ isLoading = true, className }) {
  // return (
  //   <i
  //     className={`bx bx-loader-circle ${isLoading ? "spin-loader" : null}`}
  //     style={{ fontSize: "2rem" }}
  //   ></i>
  // );
  return (
    <>
      <div className={`lds-ellipsis ${className}`}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  );
}
