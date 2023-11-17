import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { getData } from "../db/backend";
import { usersLoginData } from "../Data/userLogindata";

const AppContext = createContext(null);

const initialState = {
  status: "loading",
  activePage: "landing",
  isMobile: window.innerWidth < 1300,
  activeUserId: "",
  dataUpdated: null,
  allUser: {},
  activeUser: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "refetch_data":
      return { ...state, dataUpdated: true };
    case "conclude_refetch":
      return { ...state, dataUpdated: false };
    case "toggle_mobile":
      return { ...state, isMobile: action.payload };
    case "switch_page":
      return { ...state, activePage: action.payload };
    default:
      throw new Error("Reducer Type Not Specified");
  }
}

export function AppProvider({ children }) {
  const [globalState, globalDispatch] = useReducer(reducer, initialState);

  const [userLoginData, setUserLoginData] = useState(usersLoginData);

  const [activeUserId, setActiveUserId] = useState("");

  // A state for force the fetch useEffect hook to trigger
  const { dataUpdated, isMobile, activePage } = globalState;

  // Detect viewport changes
  useEffect(() => {
    const detectResize = () => {
      // Only toggle mobile when screensize goes between
      // the 1300px breakpoint
      if (window.innerWidth > 1300 && isMobile) {
        globalDispatch({ type: "toggle_mobile", payload: false });
      } else if (window.innerWidth <= 1300 && !isMobile) {
        globalDispatch({ type: "toggle_mobile", payload: true });
      }
    };

    window.addEventListener("resize", detectResize);

    return () => window.removeEventListener("resize", detectResize);
  });

  // DATA (User Object)
  const [allUser, setAllUser] = useState(null);
  const [activeUser, setActiveUser] = useState(null);

  // Fetch the data
  // Re-fetch data when user PUT / POST new data
  useEffect(() => {
    const getUserData = async () => {
      const [activeUser, allUser] = await Promise.all([
        getData(`www.mockdb/user_id?=${activeUserId}`),
        getData(`www.mockdb/user_all`),
      ]);

      // Waits untill all the data has finished fetching
      setActiveUser(activeUser);
      setAllUser(allUser);
      globalDispatch({ type: "conclude_refetch" });
    };

    getUserData();
  }, [activeUserId, activePage, dataUpdated]);

  return (
    <AppContext.Provider
      value={{
        globalState,
        globalDispatch,
        allUser,
        activeUser,
        userLoginData,
        activeUserId,
        setActiveUserId,
        setUserLoginData,
        isMobile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("App context must be used inside the provider scope");
  return context;
}
