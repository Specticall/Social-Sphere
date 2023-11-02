import { useEffect, useRef, useState } from "react";
import Image from "./Image";
import Skeleton from "react-loading-skeleton";

export default function SearchBar({
  onOpenProfile = () => {},
  hideProfilePic = false,
  className = "",
  props,
  inputWatcher = () => {},
}) {
  // If the active user is undefined the the data is still fetching.
  const [isLoading, setIsLoading] = useState(
    props.activeUser ? true : false
  );

  useEffect(() => {
    setIsLoading(props.activeUser ? false : true);
  }, [props.activeUser]);

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
            <Skeleton
              width={"57px"}
              height={"57px"}
              borderRadius={"100%"}
            />
          ) : (
            <Image
              isVisible={!isLoading}
              link={props.activeUser?.pfp}
              alt={`${props.activeUser?.pfp}-mobile`}
              onClick={onOpenProfile}
              defaultStyle={false}
            />
          )}
        </div>
      ) : null}
    </div>
  );
}
