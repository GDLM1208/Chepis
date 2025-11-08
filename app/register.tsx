import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { supabase } from "../lib/supabaseClient"; // Asegúrate de tener esta instancia de Supabase configurada
import { router } from "expo-router";

export default function Register() {
  const [firstName, setFirstName] = useState(""); // Nombre
  const [lastName, setLastName] = useState(""); // Apellido
  const [email, setEmail] = useState(""); // Correo
  const [password, setPassword] = useState(""); // Contraseña
  const [dob, setDob] = useState(""); // Fecha de nacimiento
  const [errorMsg, setErrorMsg] = useState("");

  async function handleRegister() {
    setErrorMsg(""); // Limpiar mensaje de error

    // Intentar crear un nuevo usuario en Supabase
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    // Guardar nombre, apellido y fecha de nacimiento en la base de datos
    const { data, error: profileError } = await supabase
      .from("profiles") // Aquí asumimos que tienes una tabla llamada "profiles" para los usuarios
      .insert([
        {
          first_name: firstName,
          last_name: lastName,
          email,
          date_of_birth: dob,
        },
      ]);

    if (profileError) {
      setErrorMsg(profileError.message);
      return;
    }

    // Redirigir al usuario a la pantalla de login después de un registro exitoso
    router.push("/login");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>

      <TextInput
        placeholder="Nombre"
        value={firstName}
        onChangeText={setFirstName}
        style={styles.input}
      />

      <TextInput
        placeholder="Apellido"
        value={lastName}
        onChangeText={setLastName}
        style={styles.input}
      />

      <TextInput
        placeholder="Correo"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      <TextInput
        placeholder="Fecha de nacimiento (YYYY-MM-DD)"
        value={dob}
        onChangeText={setDob}
        style={styles.input}
      />

      {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}

      <TouchableOpacity onPress={handleRegister} style={styles.button}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#4C3FAF",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
  button: {
    width: "100%",
    padding: 15,
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
};
