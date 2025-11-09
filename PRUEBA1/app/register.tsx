import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import { useState } from "react";
import { Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../constants/styles";
import { supabase } from "../lib/supabaseClient";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dob, setDob] = useState(new Date(new Date().getFullYear() - 18, 0, 1));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    } else {
      setShowDatePicker(true);
    }
    if (event.type === "set" && selectedDate) {
      setDob(selectedDate);
    }
  };

  async function handleRegister() {
    setErrorMsg("");

    if (!firstName || !lastName || !email || !password || !userName) {
      setErrorMsg("Por favor completa todos los campos requeridos");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Las contraseñas no coinciden");
      return;
    }

    if (password.length < 6) {
      setErrorMsg("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    const { error: profileError } = await supabase.from("users").insert([
      {
        full_name: firstName + " " + lastName,
        username: userName,
        email,
        date_of_birth: dob.toISOString().split("T")[0],
        created_at: new Date().toISOString(),
        is_active: true,
        last_login: new Date().toISOString(),
      },
    ]);

    if (profileError) {
      setErrorMsg(profileError.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    router.push("/login");
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={authStyles.scrollContainer}>
        <View style={authStyles.formContainer}>
          <Text style={authStyles.title}>Crear Cuenta</Text>
          <Text style={authStyles.subtitle}>Únete a Chepi y comienza tu viaje</Text>

          <View style={authStyles.inputGroup}>
            <TextInput
              placeholder="Nombre"
              value={firstName}
              onChangeText={setFirstName}
              style={authStyles.input}
              placeholderTextColor="#A0AEC0"
              editable={!loading}
            />
          </View>

          <View style={authStyles.inputGroup}>
            <TextInput
              placeholder="Apellido"
              value={lastName}
              onChangeText={setLastName}
              style={authStyles.input}
              placeholderTextColor="#A0AEC0"
              editable={!loading}
            />
          </View>

          <View style={authStyles.inputGroup}>
            <TextInput
              placeholder="Nombre de usuario"
              value={userName}
              onChangeText={setUserName}
              style={authStyles.input}
              placeholderTextColor="#A0AEC0"
              editable={!loading}
            />
          </View>

          <View style={authStyles.inputGroup}>
            <TextInput
              placeholder="Correo electrónico"
              value={email}
              onChangeText={setEmail}
              style={authStyles.input}
              placeholderTextColor="#A0AEC0"
              keyboardType="email-address"
              editable={!loading}
            />
          </View>

          <View style={authStyles.inputGroup}>
            <TextInput
              placeholder="Contraseña"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={authStyles.input}
              placeholderTextColor="#A0AEC0"
              editable={!loading}
            />
          </View>

          <View style={authStyles.inputGroup}>
            <TextInput
              placeholder="Confirmar contraseña"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={authStyles.input}
              placeholderTextColor="#A0AEC0"
              editable={!loading}
            />
          </View>

          <View style={authStyles.inputGroup}>
            <TouchableOpacity
              style={authStyles.datePickerButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Ionicons name="calendar" size={20} color="#4C3FAF" style={{ marginRight: 12 }} />
              <Text style={authStyles.datePickerText}>
                {dob.toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
            </TouchableOpacity>
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={dob}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={handleDateChange}
              maximumDate={new Date()}
              minimumDate={new Date(1950, 0, 1)}
            />
          )}

          {errorMsg ? (
            <View style={authStyles.errorContainer}>
              <Text style={authStyles.errorText}>{errorMsg}</Text>
            </View>
          ) : null}

          <TouchableOpacity
            onPress={handleRegister}
            style={[styles.primaryButton, loading && authStyles.buttonDisabled]}
            disabled={loading}
          >
            <Text style={styles.primaryButtonText}>{loading ? "Registrando..." : "Registrarse"}</Text>
          </TouchableOpacity>

          <View style={authStyles.footerContainer}>
            <Text style={authStyles.footerText}>¿Ya tienes cuenta? </Text>
            <TouchableOpacity onPress={() => router.push("/login")}>
              <Text style={authStyles.footerLink}>Inicia sesión</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const authStyles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 40,
  },
  formContainer: {
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 32,
    fontWeight: "400",
  },
  inputGroup: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#1F2937",
    fontWeight: "500",
  },
  errorContainer: {
    backgroundColor: "#FEE2E2",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#EF4444",
  },
  errorText: {
    color: "#DC2626",
    fontSize: 14,
    fontWeight: "500",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  footerText: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "400",
  },
  footerLink: {
    fontSize: 14,
    color: "#4C3FAF",
    fontWeight: "700",
  },
  datePickerButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  datePickerText: {
    fontSize: 16,
    color: "#1F2937",
    fontWeight: "500",
  },
});
