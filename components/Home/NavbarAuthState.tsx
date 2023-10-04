"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
//import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";
import { cookies } from "next/headers";
import Image from "next/image";

export default function NavbarAuthState() {
  const [session, setSession] = useState<any | null>(null);

  const supabase = createClientComponentClient();

  const signIn = async () => {
    let { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
    };

    fetchUser();
  }, []);

  return (
    <div>
      {session ? (
        <div className="flex items-center gap-1.5">
          <Image
            src={session.user.user_metadata.picture}
            width={30}
            height={30}
            alt="Pro picture"
            className="rounded-full"
          />
        </div>
      ) : (
        <div>
          <button
            onClick={async () => await signIn()}
            className="md:border md:border-blue-700 md:rounded-3xl py-2 mr-2 md:px-4 md:mx-9 md:text-blue-700 text-black text-xs md:text-base"
          >
            Sign In
          </button>
          <button
            onClick={async () => await signIn()}
            className="bg-blue-700 rounded-3xl py-2 px-4 text-white hidden md:inline"
          >
            Register
          </button>
        </div>
      )}
    </div>
  );
}
