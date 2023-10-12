"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./supabase";
import { Session } from "@supabase/supabase-js";

type AuthContextType = {
  userSession: Session;
};

const AuthContext = createContext<Partial<AuthContextType>>({});

export function useAuth() {
  return useContext(AuthContext);
}

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [userSession, setUserSession] = useState<Session>();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setUserSession(session);
      }
    };

    fetchUser();
  }, []);

  const value = { userSession };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
