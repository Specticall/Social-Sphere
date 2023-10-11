import logo from "../assets/logo.svg";

export default function Feeds({
  activeUser,
  userData,
  setActivePage,
  activePage,
}) {
  const props = {
    activeUser,
    userData,
    setActivePage,
    activePage,
  };

  return (
    <div className="page__feeds">
      <Navbar {...props} />
    </div>
  );
}

function Navbar() {
  return (
    <nav className="main__nav">
      <img src={logo} alt="logo" />
      <ul>
        <li>
          <i className="bx bx-grid-alt"></i>Feeds
        </li>
        <li>
          <i className="bx bx-user"></i>Friends
        </li>
        <li>
          <i className="bx bx-chat"></i>Chat Room
        </li>
        <li>
          <i className="bx bxs-inbox"></i>Inbox
          <div className="inbox-amount"></div>
        </li>
      </ul>
    </nav>
  );
}
