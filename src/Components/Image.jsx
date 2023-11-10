export default function Image({
  isUnsplashURL = true,
  link = "",
  alt = "Image",
  className = "",
  defaultStyle = true,
  onClick = () => {},
  isCircle = false,
  isVisible = true,
  style = {},
}) {
  const borderType = isCircle ? "100%" : null;
  const source = isUnsplashURL ? `https://source.unsplash.com/${link}` : link;

  const imageStyle = {
    width: "100%",
    aspectRatio: "1",
    objectPosition: "center",
    objectFit: "cover",
  };

  return (
    isVisible && (
      <img
        style={
          defaultStyle
            ? { ...style, ...imageStyle, borderRadius: borderType }
            : { ...style, borderRadius: borderType }
        }
        src={source}
        alt={alt}
        className={className}
        onClick={onClick}
      />
    )
  );
}
