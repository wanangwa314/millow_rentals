"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./supabase";
import { Session, User } from "@supabase/supabase-js";

type AuthContextType = {
  userSession: Session;
  user: User;
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
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) throw error;
      if (session) {
        setUserSession(session);
        setUser(session.user);
      }
      console.log("The SESSION USER:" + JSON.stringify(session?.user));
      setLoading(false);
    };

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUserSession(session || undefined);
        setUser(session?.user);
        setLoading(false);
      }
    );

    console.log("Getting session...");
    fetchSession();

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const value = { userSession, user };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
