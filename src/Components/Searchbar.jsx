import Image from "./Image";

export default function SearchBar({
  onOpenProfile = () => {},
  hideProfilePic = false,
  className = "",
  props,
  inputWatcher = () => {},
}) {
  return (
    <div className={`search-bar ${className}`}>
      <div className="search-bar__input">
        <input
          type="text"
          placeholder="Who are you looking for?"
          onChange={(e) => inputWatcher(e.target.value)}
        />
        <i className="bx bx-search-alt-2"></i>
      </div>
      {!hideProfilePic ? (
        <Image
          className={"pfp-button"}
          link={props.activeUser.data.pfp}
          alt={`${props.activeUser.data.pfp}-mobile`}
          onClick={onOpenProfile}
          defaultStyle={false}
        />
      ) : null}
    </div>
  );
}
