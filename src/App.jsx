import { useState } from "react";
import { usersData } from "./Data/userdata";

// Pages
import Login from "./Pages/Login";
import Feeds from "./Pages/Feeds";

function App() {
  const [activePage, setActivePage] = useState("login");
  const [activeUser, setActiveUser] = useState({});
  const [userData, setUserData] = useState(usersData);

  const props = {
    setUserData,
    userData,
    setActiveUser,
    activeUser,
    setActivePage,
    activePage,
  };

  return (
    <>
      {activePage === "login" ? <Login {...props} /> : null}
      {activePage === "feeds" ? <Feeds {...props} /> : null}
    </>
  );
}

export default App;
