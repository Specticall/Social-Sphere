import Button from "./Button";

export default function Recommendation({
  user,
  pfpUrl,
  tag,
  caption,
  imagesID,
}) {
  return (
    <article className="feeds__recommendation">
      <div className="info">
        <div className="info-text">
          <img
            className="profile-picture"
            src={`https://source.unsplash.com/${pfpUrl}`}
            alt="pfp"
          />
          <div className="profile">
            <h3>{user}</h3>
            <p>{tag}</p>
          </div>
        </div>
        <Button type="primary" buttonText="Contact" />
      </div>
      <p className="caption">{caption}</p>
      <div className="images">
        {imagesID.map((IMG_URL, i) => (
          <img
            src={`https://source.unsplash.com/${IMG_URL}`}
            className={`img-${i}`}
            alt="feeds image"
            key={`${IMG_URL}-${i}`}
          />
        ))}
      </div>
    </article>
  );
}
