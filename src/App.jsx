// React router
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// Pages
import Login from "./Pages/Login";
import Feeds from "./Pages/Feeds";
import Friends from "./Pages/Friends";
import Landing from "./Pages/Landing";
import Chatroom from "./Pages/Chatroom";

// import function to register Swiper custom elements
import { register } from "swiper/element/bundle";
import AppLayout from "./Pages/AppLayout";
import { AppProvider } from "./Context/AppContext";
import UserHomepage from "./Pages/UserHomepage";
// import { getData, postData } from "./db/backend";

// register Swiper custom elements
register();

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Landing />} />
          <Route path="login" element={<Login />} />

          <Route path="app" element={<AppLayout />}>
            <Route path="feeds" element={<Feeds />} />
            <Route path="friends" element={<Friends />} />
            <Route path="chatroom" element={<Chatroom />} />
            {/* Inbox is deprecated */}
            <Route
              path="inbox"
              element={<Navigate replace={true} to="/app/feeds" />}
            />
            <Route path="userhomepage/:userId" element={<UserHomepage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
