import { useAuthState } from "./Firebase";
import { Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const AuthenticatedRoute = ({ component: Component, ...props }) => {
  let navigate = useNavigate();
  const { isAuthenticated } = useAuthState();
  console.log(`AuthenticatedRoute: ${isAuthenticated}`);
  return (
    <Route
      {...props}
      render={(routeProps) =>
        isAuthenticated ? <Component {...routeProps} /> : navigate("/")
      }
    />
  );
};
