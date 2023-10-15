export default function SearchBar({
  onOpenProfile = () => {},
}) {
  const IMG_URL = "9S82-KpAEnE";

  return (
    <div className="search-bar">
      <div className="search-bar__input">
        <input
          type="text"
          placeholder="Who are you looking for?"
        />
        <i className="bx bx-search-alt-2"></i>
      </div>
      <img
        className="pfp-button"
        src={`https://source.unsplash.com/${IMG_URL}`}
        alt=""
        onClick={onOpenProfile}
      />
    </div>
  );
}

// 9S82-KpAEnE
