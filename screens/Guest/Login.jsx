import React, { useEffect, useState } from "react";
import Animated, { FadeIn, FadeOutUp } from "react-native-reanimated";
import { Button } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { defaultStyles } from "../../constants/DefaultStyles";
import useUserStore from "../../utils/userStore";
import CustomInput from "../../components/CustomInput";
import Colors from "../../constants/Colors";
import axios from "axios";

const Login = () => {
  const API_URL = process.env.EXPO_PUBLIC_API_URL;
  const navigation = useNavigation();
  const setUser = useUserStore((state) => state.setUser);
  const [loading, setLoading] = useState(false);
  const [errorResponse, setErrorResponse] = useState();

  useEffect(() => {
    if (errorResponse) {
      const timeoutId = setTimeout(() => {
        setErrorResponse(null);
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [errorResponse]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onLogin = async (data) => {
    if (loading) {
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/login`, {
        username: data.username,
        password: data.password,
      });

      const result = response.data;
      console.log("🚀 ~ file: Login.jsx:50 ~ getUser ~ result:", result);
      if (result[0].message == "Incorrect Username or Password") {
        setErrorResponse(result[0].message);
      } else {
        setUser(result);
        navigation.navigate("Profile");
      }
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.divider} />
      <View style={styles.modal}>
        <View style={{ gap: 10 }}>
          <Text style={defaultStyles.heading}>Hi, Welcome Back!</Text>
          <Text style={defaultStyles.text}>
            To continue shopping, please login with your account information ..
          </Text>
        </View>

        <CustomInput
          name="username"
          placeholder="Username"
          control={control}
          rules={{ required: "Username is required" }}
          errorResponse={errorResponse}
        />
        <CustomInput
          name="password"
          placeholder="Password"
          secureTextEntry
          control={control}
          rules={{
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password should be minimum 8 characters",
            },
          }}
          errorResponse={errorResponse}
        />

        {errorResponse && (
          <Animated.View entering={FadeIn} exiting={FadeOutUp}>
            <Text style={styles.errorResponse}>{errorResponse}</Text>
          </Animated.View>
        )}

        <View style={{ gap: 20, marginTop: 10 }}>
          <Button
            mode="contained"
            onPress={handleSubmit(onLogin)}
            theme={{ roundness: 1 }}
          >
            {loading ? "Logging in ..." : "Login"}
          </Button>

          <Button
            mode="outlined"
            onPress={() => navigation.navigate("Register")}
            theme={{ roundness: 1 }}
          >
            No Account Yet? Register First!
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  divider: {
    height: 20,
    backgroundColor: Colors.primary,
  },
  modal: {
    flex: 1,
    backgroundColor: Colors.white,
    gap: 20,
    padding: 32,
    paddingTop: 48,
    borderTopLeftRadius: 70,
  },
  errorResponse: {
    color: Colors.error,
    marginLeft: 10,
    fontSize: 14,
    fontFamily: "Montserrat-sb",
    marginVertical: -15,
  },
});

export default Login;
