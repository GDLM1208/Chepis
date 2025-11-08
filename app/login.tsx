import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { supabase } from "../lib/supabaseClient";
import { router } from "expo-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleLogin() {
    setErrorMsg("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    router.push("/home");
  }

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
      <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 20 }}>
        Iniciar sesión
      </Text>

      <TextInput
        placeholder="Correo"
        value={email}
        onChangeText={setEmail}
        style={{
          borderWidth: 1,
          marginVertical: 10,
          padding: 10,
          borderRadius: 10,
        }}
      />

      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{
          borderWidth: 1,
          marginVertical: 10,
          padding: 10,
          borderRadius: 10,
        }}
      />

      {errorMsg ? (
        <Text style={{ color: "red", marginBottom: 10 }}>{errorMsg}</Text>
      ) : null}

      <TouchableOpacity
        onPress={handleLogin}
        style={{
          backgroundColor: "#4A90E2",
          padding: 15,
          borderRadius: 10,
          marginTop: 10,
        }}
      >
        <Text style={{ textAlign: "center", color: "white", fontWeight: "bold" }}>
          Entrar
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/register")}>
        <Text style={{ textAlign: "center", marginTop: 20, color: "#555" }}>
          ¿No tienes cuenta? Regístrate
        </Text>
      </TouchableOpacity>
    </View>
  );
}
