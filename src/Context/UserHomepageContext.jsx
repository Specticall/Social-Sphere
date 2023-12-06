import { createContext, useContext, useEffect, useState } from "react";
import { useApp } from "./AppContext";
import { useParams } from "react-router-dom";
import { isEmptyObject } from "../Helper/helper";

const HomepageContext = createContext(null);

export function UserHomepageProvider({ children }) {
  const { allUser, activeUser } = useApp();
  const { userId } = useParams();
  const [selectedUser, setSelectedUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!allUser) return;
    setSelectedUser(allUser[userId]);
  }, [allUser, userId]);

  useEffect(() => {
    setIsLoading(isEmptyObject(selectedUser) || !activeUser);
  }, [selectedUser, activeUser]);

  return (
    <HomepageContext.Provider
      value={{
        allUser,
        activeUser,
        userId,
        selectedUser,
        setSelectedUser,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </HomepageContext.Provider>
  );
}

export function useUserHomepage() {
  const context = useContext(HomepageContext);
  if (!context)
    throw new Error(
      "User homepage context must be used within its provider's scrope!"
    );
  return context;
}
