import Skeleton from "react-loading-skeleton";

export default function UserStatus({ user, isLoading, className }) {
  return (
    <article className={`user-profile__status ${className}`}>
      <h3>Status</h3>
      <ul className="status-list">
        <li>
          <i className="bx bx-map"></i>
          {isLoading ? (
            <Skeleton containerClassName="skeleton" height={"20px"} />
          ) : (
            <>
              {user?.status.city}, {user?.status.country}
            </>
          )}
        </li>
        <li>
          <i className="bx bx-user"></i>
          {user?.status.activity || (
            <Skeleton containerClassName="skeleton" height={"20px"} />
          )}
        </li>
        <li>
          <i className="bx bx-heart"></i>
          {user?.status.loveStatus || (
            <Skeleton containerClassName="skeleton" height={"20px"} />
          )}
        </li>
        <li>
          <i className="bx bx-calendar"></i>
          {isLoading ? (
            <Skeleton containerClassName="skeleton" height={"20px"} />
          ) : (
            `${user?.status.age} Years old`
          )}
        </li>
      </ul>
    </article>
  );
}
