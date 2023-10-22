import Button from "./Button";

export default function Recommendation({ data }) {
  return (
    <article className="feeds__recommendation">
      <div className="info">
        <div className="info-text">
          <img
            className="profile-picture"
            src={`https://source.unsplash.com/${data.pfp}`}
            alt="pfp"
          />
          <div className="profile">
            <h3>{data.username}</h3>
            <p>{data.tag}</p>
          </div>
        </div>
        <Button type="primary" buttonText="Contact" />
      </div>
      <p className="caption">{data.aboutMe}</p>
      <div className="images">
        {data.displayImg.map((IMG_URL, i) => (
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
