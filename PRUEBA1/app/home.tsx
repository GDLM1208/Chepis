import { View, Text, TouchableOpacity } from "react-native";
import { supabase } from "../lib/supabaseClient";
import { router } from "expo-router";

export default function Home() {
  async function logout() {
    await supabase.auth.signOut();
    router.replace("/login");
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24 }}>Bienvenido 🎉</Text>

      <TouchableOpacity
        onPress={logout}
        style={{
          marginTop: 20,
          backgroundColor: "red",
          padding: 15,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}
