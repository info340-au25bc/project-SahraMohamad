import { createContext, useContext, useEffect, useMemo, useState } from "react";

const USERS_STORAGE_KEY = "prepPalUsers";
const ACTIVE_USER_KEY = "prepPalActiveUser";

const AuthContext = createContext(null);

const readStoredValue = (key, fallback) => {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => readStoredValue(USERS_STORAGE_KEY, []));
  const [activeUser, setActiveUser] = useState(() =>
    readStoredValue(ACTIVE_USER_KEY, null)
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (activeUser) {
      window.localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(activeUser));
    } else {
      window.localStorage.removeItem(ACTIVE_USER_KEY);
    }
  }, [activeUser]);

  const signIn = (email, password) => {
    const trimmedEmail = email?.trim() ?? "";
    const trimmedPassword = password?.trim() ?? "";

    if (!trimmedEmail || !trimmedPassword) {
      return { success: false, message: "Enter both email and password." };
    }

    const user = users.find(
      (storedUser) =>
        storedUser.email.toLowerCase() === trimmedEmail.toLowerCase() &&
        storedUser.password === trimmedPassword
    );

    if (!user) {
      return {
        success: false,
        message: "No account found with that email/password.",
      };
    }

    setActiveUser(user);
    return {
      success: true,
      user,
      message: `Welcome back, ${user.firstName}!`,
    };
  };

  const signUp = ({ firstName, lastName, email, password }) => {
    const trimmedFirst = firstName?.trim() ?? "";
    const trimmedLast = lastName?.trim() ?? "";
    const trimmedEmail = email?.trim() ?? "";
    const trimmedPassword = password?.trim() ?? "";

    if (!trimmedFirst || !trimmedLast || !trimmedEmail || !trimmedPassword) {
      return { success: false, message: "Fill out every field to create an account." };
    }

    if (trimmedPassword.length < 6) {
      return {
        success: false,
        message: "Password must be at least 6 characters long.",
      };
    }

    const duplicate = users.some(
      (storedUser) => storedUser.email.toLowerCase() === trimmedEmail.toLowerCase()
    );

    if (duplicate) {
      return {
        success: false,
        message: "An account already exists for that email.",
      };
    }

    const newUser = {
      firstName: trimmedFirst,
      lastName: trimmedLast,
      email: trimmedEmail,
      password: trimmedPassword,
    };

    setUsers((prev) => [...prev, newUser]);
    setActiveUser(newUser);

    return { success: true, user: newUser, message: "Account created! You're signed in." };
  };

  const signOut = () => setActiveUser(null);

  const value = useMemo(
    () => ({ users, activeUser, signIn, signUp, signOut }),
    [users, activeUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
