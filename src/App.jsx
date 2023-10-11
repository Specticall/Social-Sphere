import { useState } from "react";
import Login from "./Pages/Login";
import Feeds from "./Pages/Feeds";

function App() {
  const [activePage, setActivePage] = useState("login");
  const [data, setData] = useState([]);

  const props = { setActivePage, setData, data };

  return (
    <>
      {activePage === "login" ? <Login {...props} /> : null}
      {activePage === "feeds" ? <Feeds {...props} /> : null}
    </>
  );
}

export default App;
