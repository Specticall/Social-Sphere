import Image from "./Image";
import Skeleton from "react-loading-skeleton";

export default function SearchBar({
  onOpenProfile = () => {},
  hideProfilePic = false,
  className = "",
  props,
  inputWatcher = () => {},
  isLoading = false,
  activeUser,
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
        <div className="pfp-button">
          {isLoading ? (
            <Skeleton width={"57px"} height={"57px"} borderRadius={"100%"} />
          ) : (
            <Image
              isVisible={!isLoading}
              link={activeUser?.pfp}
              alt={`${activeUser?.pfp}-mobile`}
              onClick={onOpenProfile}
              defaultStyle={false}
            />
          )}
        </div>
      ) : null}
    </div>
  );
}
