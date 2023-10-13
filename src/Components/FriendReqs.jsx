import Button from "./Button";

export default function FriendReqs() {
  return (
    <div className="friend-reqs">
      <h2 className="title">REQUEST</h2>
      <Request />
      <Request />
    </div>
  );
}

function Request() {
  return (
    <article className="req">
      <header>
        <div className="pfp"></div>
        <p>
          <span className="name">Jenna River</span>wants to
          be friends with you
        </p>
      </header>
      <div className="buttons">
        <Button
          padding="0.6rem 0rem"
          type="primary"
          buttonText="Accept"
          width="100%"
        />
        <Button
          padding="0.6rem 0rem"
          type="secondary"
          buttonText="Decline"
          width="100%"
        />
      </div>
    </article>
  );
}
