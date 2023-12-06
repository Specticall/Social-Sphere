import Skeleton from "react-loading-skeleton";
import Button from "./Button";
import Image from "./Image";
import { Link } from "react-router-dom";

export default function Recommendation({ data }) {
  const images = data?.displayImg || new Array(3).fill("LOADING");

  return (
    <article className="feeds__recommendation">
      <div className="info">
        <div className="info-text">
          {data ? (
            <img
              className="profile-picture"
              src={`https://source.unsplash.com/${data?.pfp}`}
              alt="pfp"
            />
          ) : (
            <Skeleton width={"52px"} height={"52px"} borderRadius={"100%"} />
          )}
          <div className="profile">
            <h3>
              {data?.username || (
                <Skeleton
                  width={"100px"}
                  height={"20px"}
                  style={{ marginBottom: "5px" }}
                />
              )}
            </h3>
            <p>{data?.tag || <Skeleton width={"150px"} height={"20px"} />}</p>
          </div>
        </div>
        {data && (
          <Link to={`../userhomepage/${data.id}`}>
            <Button type="primary" buttonText="Contact" />
          </Link>
        )}
      </div>
      <p className="caption">
        {data?.aboutMe || (
          <Skeleton
            count={2}
            height={"20px"}
            containerClassName="skeleton__paragraph"
          />
        )}
      </p>
      <div className="images">
        {images.map((IMG_URL, i) =>
          IMG_URL === "LOADING" ? (
            <Skeleton
              containerClassName={`img-${i}`}
              key={`skeleton-${IMG_URL}-${i}`}
              height={"100%"}
            />
          ) : (
            <Image
              link={IMG_URL}
              className={`img-${i}`}
              alt={"feeds image"}
              key={`${IMG_URL}-${i}`}
            />
          )
        )}
      </div>
    </article>
  );
}
