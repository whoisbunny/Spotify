import {
  Button,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Entypo from "@expo/vector-icons/Entypo";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
const login = () => {
  const [accessToken, setAccessToken] = useState(null);
  // const [userInfo, setUserInfo] = useState(null);
  const discovery = {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: "https://accounts.spotify.com/api/token",
  };

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID!,
      scopes: [
        "user-read-email",
        "user-library-read",
        "user-read-recently-played",
        "user-top-read",
        "playlist-read-private",
        "playlist-read-collaborative",
        "playlist-modify-public", // or "playlist-modify-private"
      ], // To follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri: "exp://192.168.68.242:8081",
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
      const clientId = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID!;
      const clientSecret = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_SECRET!;

      const credsB64 = btoa(`${clientId}:${clientSecret}`);

      const formData = new URLSearchParams();
      formData.append("grant_type", "authorization_code");
      formData.append("code", code);
      formData.append(
        "redirect_uri",
        makeRedirectUri({
          scheme: "exp://192.168.68.242:8081",
        })
      );

      fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          Authorization: `Basic ${credsB64}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      })
        .then((response) => response.json())
        .then((data) => {
          setAccessToken(data.access_token);

          const expirationDate = new Date(
            data.accessTokenExpirationDate
          ).getTime();
          AsyncStorage.setItem("token", data.access_token);
          AsyncStorage.setItem("expirationDate", expirationDate.toString());
          router.navigate("home");
        })
        .catch((error) => console.error("Error fetching access token", error));
    }
  }, [response]);
  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
      <SafeAreaView>
        <View style={{ height: 80 }} />
        <Entypo
          name="spotify"
          size={80}
          color="white"
          style={{ textAlign: "center" }}
        />
        <Text
          style={{
            color: "white",
            fontSize: 40,
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 40,
          }}
        >
          Millions of Songs Free on spotify!
        </Text>
        <View style={{ height: 80 }} />
        <Pressable
          style={styles.mainLoginBtn}
          onPress={() => {
            promptAsync();
          }}
        >
          <Text>Sign In with spotify</Text>
        </Pressable>

        <Pressable style={styles.socialLoginBtn}>
          <MaterialIcons name="phone-android" size={24} color="white" />
          <Text style={styles.btnText}>Continue with phone number</Text>
        </Pressable>

        <Pressable style={styles.socialLoginBtn}>
          <AntDesign name="google" size={24} color="red" />
          <Text style={styles.btnText}>Continue with Google</Text>
        </Pressable>

        <Pressable style={styles.socialLoginBtn}>
          <Entypo name="facebook" size={24} color="blue" />
          <Text style={styles.btnText}>Sign In with facebook</Text>
        </Pressable>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default login;

const styles = StyleSheet.create({
  socialLoginBtn: {
    backgroundColor: Colors.buttonBg,
    padding: 10,
    marginLeft: "auto",
    marginRight: "auto",
    width: 300,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginVertical: 10,
    borderColor: "#C0C0C0",
    borderWidth: 0.8,
  },
  mainLoginBtn: {
    backgroundColor: Colors.green,
    padding: 10,
    marginLeft: "auto",
    marginRight: "auto",
    width: 300,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  btnText: {
    fontWeight: "500",
    color: "white",
    textAlign: "center",
    flex: 1,
  },
});
