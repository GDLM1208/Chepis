import { ScrollView, Text, View } from "react-native";
import styles from "../constants/styles";

export default function Progress() {
  return (
    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#4C3FAF' }}>
          Progreso
        </Text>
        <Text style={{ fontSize: 16, marginTop: 10, color: '#666' }}>
          Aquí verás tu progreso y estadísticas
        </Text>
      </View>
    </ScrollView>
  );
}
