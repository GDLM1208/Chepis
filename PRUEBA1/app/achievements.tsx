import { ScrollView, Text, View } from "react-native";
import styles from "../constants/styles";

export default function Achievements() {
  return (
    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#4C3FAF' }}>
          Logros
        </Text>
        <Text style={{ fontSize: 16, marginTop: 10, color: '#666' }}>
          Tus logros y recompensas
        </Text>
      </View>
    </ScrollView>
  );
}
