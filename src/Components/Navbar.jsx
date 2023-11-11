import logo from "../assets/logo.svg";

const navigations = [
  {
    label: "Feeds",
    iconClass: "bx bx-grid-alt",
    navPosition: "0%",
    name: "feeds",
  },
  {
    label: "Friends",
    iconClass: "bx bx-user",
    navPosition: "120%",
    name: "friends",
  },
  {
    label: "Chat Room",
    iconClass: "bx bx-chat",
    navPosition: "240%",
    name: "chatroom",
  },
  {
    label: "Inbox",
    iconClass: "bx bxs-inbox",
    navPosition: "360%",
    name: "inbox",
  },
];

export default function Navbar({ activePage = "feeds", globalDispatch }) {
  // Switch page to the selected one.
  const updatePage = (newPage) => {
    // setActivePage(newPage);
    globalDispatch({ type: "switch_page", payload: newPage });
  };

  return (
    <nav className="main__navbar">
      <img src={logo} alt="logo" className="logo" />
      <ul>
        <div className="navbar-button__wrapper">
          {navigations.map((props, i) => (
            <NavigationLabel
              {...props}
              key={`${i}-${props.label}`}
              onSelect={() => updatePage(props.name)}
              className={props.name === activePage ? "selected" : ""}
            />
          ))}
        </div>
        <div
          className="selector"
          style={{
            transform: `translateY(${
              navigations.find((nav) => nav.name === activePage)?.navPosition
            })`,
          }}
        ></div>
      </ul>
    </nav>
  );
}

function NavigationLabel({ className = "", label, iconClass, onSelect }) {
  return (
    <li className={className} onClick={(e) => onSelect(e)}>
      <i className={iconClass}></i>
      <p>{label}</p>
    </li>
  );
}
