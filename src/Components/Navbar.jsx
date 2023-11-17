import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import { useApp } from "../Context/AppContext";

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

export default function Navbar() {
  const { activePage = "feeds" } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  // Switch page to the selected one.
  const updatePage = (newPage) => {
    // setActivePage(newPage);
    // globalDispatch({ type: "switch_page", payload: newPage });
    navigate(`/app/${newPage}`, { replace: true });
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
              navigations.find((nav) => location.pathname.includes(nav.name))
                ?.navPosition
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
