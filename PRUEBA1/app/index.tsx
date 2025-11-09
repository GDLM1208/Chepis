import { supabase } from "../lib/supabaseClient";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";

export default function Index() {
  const [checking, setChecking] = useState(true);
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    async function checkSession() {
      const { data } = await supabase.auth.getSession();
      setLogged(!!data.session);
      setChecking(false);
    }

    checkSession();
  }, []);

  if (checking) return null;

  return logged ? <Redirect href="/home" /> : <Redirect href="/login" />;
}
