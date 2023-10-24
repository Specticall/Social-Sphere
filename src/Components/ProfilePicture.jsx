import Image from "./Image";

const profilePictureStyle = {
  aspectRatio: "1",
  borderRadius: "100%",
  backgroundColor: "var(--clr-gray)",
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default function ProfilePicture({
  className = "",
  pfpLink = "",
  width = "",
  onClick = () => {},
  defaultStyle = true,
  isOnline = false,
}) {
  const onlineIndicatorStyle = {
    position: "absolute",
    aspectRatio: "1",
    borderRadius: "100%",
    bottom: "0rem",
    right: "0rem",
    border: `${parseFloat(width) * 0.05}rem solid white`,
    zIndex: "5",
    backgroundColor: isOnline
      ? "var(--clr-green)"
      : "var(--clr-red)",
    width: `${parseFloat(width) * 0.3}rem`,
  };

  return (
    <div
      className={className}
      style={
        defaultStyle
          ? { width, ...profilePictureStyle }
          : { width }
      }
    >
      <Image link={pfpLink} isCircle={true} />
      <div
        className="online-indicator"
        style={onlineIndicatorStyle}
      ></div>
    </div>
  );
}
