import { createContext } from "react";

const userContext = createContext({
  user: false,
  setUser: (user) => {},
});

export default userContext;
