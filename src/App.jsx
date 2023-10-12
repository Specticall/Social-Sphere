import { useState } from "react";
import { usersData } from "./Data/userdata";

// Pages
import Login from "./Pages/Login";
import Feeds from "./Pages/Feeds";
import Navbar from "./Components/Navbar";

function App() {
  const [activePage, setActivePage] = useState("login");
  const [activeUser, setActiveUser] = useState({});
  const [userData, setUserData] = useState(usersData);

  // Checks if the user is viewing the home page (which will show the navbar)
  const showNavbar = [
    "friends",
    "feeds",
    "chatRoom",
    "inbox",
  ].some((page) => activePage === page);

  const props = {
    setUserData,
    userData,
    setActiveUser,
    activeUser,
    setActivePage,
    activePage,
  };

  //prettier-ignore
  return (
    <>
      {activePage === "login" ? <Login {...props} /> : null}
      <main>
        {showNavbar ? <Navbar {...props}/> : null}
        {activePage === "feeds" ? <Feeds {...props} /> : null}
      </main>
    </>
  );
}

export default App;
