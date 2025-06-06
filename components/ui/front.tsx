import { StyleSheet, View, Text, Image, Linking } from "react-native";

export default function FrontPage() {
  return (
    <View style={styles.container}>
      {/* Logo and Title */}
      <Image
        source={require("@/assets/images/icon.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>Tomato Tech Detectives</Text>
      <Text style={styles.description}>
        Empowering farmers with AI-driven solutions to detect and prevent
        diseases in tomato plants.
      </Text>
      <View>
        <Text style={{ fontSize: 14, color: "#888", marginTop: 30, textAlign: "center" }}>
          Developed by:{" "}
          <Text
            style={{ fontWeight: "bold", color: "#43a047", textDecorationLine: "underline" }}
            onPress={() => {
              Linking.openURL("https://github.com/Blanc-byte");
            }}
          >
            @Blanc
          </Text>
        </Text>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eaffea",
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
    resizeMode: "cover",
    borderRadius: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#0066CC",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginTop: 20,
  },
  loginButton: {
    backgroundColor: "#28A745", 
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modal: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
