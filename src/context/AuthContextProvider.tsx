import Keycloak, { KeycloakConfig, KeycloakInitOptions } from "keycloak-js";
import { createContext, useEffect, useState } from "react";

const keycloakConfig: KeycloakConfig = {
  realm: "react-example",
  clientId: "webapp",
  url: "http://localhost:8180/auth",
};

const keycloakInitOptions: KeycloakInitOptions = {
  onLoad: "login-required",
};

const keycloak = Keycloak(keycloakConfig);

/**
 * AuthContextValues defines the structure for the default values of the {@link AuthContext}.
 */
interface AuthContextValues {
  isAuthenticated: boolean;
  username: string;
  logout: () => void;
  hasRole: (role: string) => boolean;
}

const defaultAuthContextValues: AuthContextValues = {
  isAuthenticated: false,
  username: "",
  logout: () => {},
  hasRole: (role) => false,
};

/**
 * AuthContext is the context exposed by the {@link AuthContextProvider}.
 */
export const AuthContext = createContext<AuthContextValues>(
  defaultAuthContextValues
);

/**
 * The props that must be passed to create the {@link AuthContextProvider}.
 */
interface AuthContextProviderProps {
  /**
   * The elements wrapped by the auth context.
   */
  children: JSX.Element;
}

/**
 * AuthContextProvider is responsible for managing the authentication state of the current user.
 *
 * @param props
 */
const AuthContextProvider = (props: AuthContextProviderProps) => {
  console.log("rendering AuthContextProvider");

  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    /**
     * Initialize the Keycloak instance
     */
    async function initializeKeycloak() {
      console.log("initialize Keycloak");
      try {
        const isAuthenticatedResponse = await keycloak.init(
          keycloakInitOptions
        );

        if (!isAuthenticatedResponse) {
          console.log(
            "user is not yet authenticated. forwarding user to login."
          );
          keycloak.login();
        }
        console.log("user already authenticated");
        setAuthenticated(isAuthenticatedResponse);
      } catch {
        console.log("error initializing Keycloak");
        setAuthenticated(false);
      }
    }

    initializeKeycloak();
  }, []);

  useEffect(() => {
    /**
     * Load the profile for of the user from Keycloak
     */
    async function loadProfile() {
      try {
        const profile = await keycloak.loadUserProfile();
        if (profile.firstName) {
          setUsername(profile.firstName);
        } else if (profile.username) {
          setUsername(profile.username);
        }
      } catch {
        console.log("error trying to load the users profile");
      }
    }

    // Only load the profile if a user is authenticated
    if (isAuthenticated) {
      loadProfile();
    }
  }, [isAuthenticated]);

  const logout = () => {
    keycloak.logout();
  };

  const hasRole = (role: string) => {
    return keycloak.hasRealmRole(role);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, username, logout, hasRole }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
