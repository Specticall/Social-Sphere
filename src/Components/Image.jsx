const imageStyle = {
  width: "100%",
  aspectRatio: "1",
  objectPosition: "center",
  objectFit: "cover",
};

export default function Image({
  isUnsplashURL = true,
  link = "",
  alt = "Image",
  className = "",
  defaultStyle = true,
  onClick = () => {},
  isCircle = false,
}) {
  const borderType = isCircle ? "100%" : null;
  const source = isUnsplashURL
    ? `https://source.unsplash.com/${link}`
    : link;
  return (
    <img
      style={
        defaultStyle
          ? { ...imageStyle, borderRadius: borderType }
          : { borderRadius: borderType }
      }
      src={source}
      alt={alt}
      className={className}
      onClick={onClick}
    />
  );
}
