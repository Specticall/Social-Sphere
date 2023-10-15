export default function SearchBar({
  onOpenProfile = () => {},
  hideProfilePic = false,
  className = "",
}) {
  const IMG_URL = "9S82-KpAEnE";

  return (
    <div className={`search-bar ${className}`}>
      <div className="search-bar__input">
        <input
          type="text"
          placeholder="Who are you looking for?"
        />
        <i className="bx bx-search-alt-2"></i>
      </div>
      {!hideProfilePic ? (
        <img
          className="pfp-button"
          src={`https://source.unsplash.com/${IMG_URL}`}
          alt=""
          onClick={onOpenProfile}
        />
      ) : null}
    </div>
  );
}

// 9S82-KpAEnE
