import React, { useEffect, useState } from "react";
import { Button } from "react-native-paper";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useNavigation } from "@react-navigation/native";
import CustomInput from "../../components/CustomInput";
import { useForm } from "react-hook-form";
import Colors from "../../constants/Colors";
import { defaultStyles } from "../../constants/DefaultStyles";
import { Metrics } from "../../constants/Metrics";
import axios from "axios";

const Login = () => {
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const API_URL = process.env.EXPO_PUBLIC_API_URL;
  const navigation = useNavigation();
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

  const onRegister = async (data) => {
    if (loading) {
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/register`, {
        firstname: data.firstname,
        lastname: data.lastname,
        middlename: data?.middlename,
        username: data.username,
        email: data.email,
        password: data.password,
      });

      const result = response.data;
      console.log("🚀 ~ file: Login.jsx:50 ~ getUser ~ result:", result);
      if (result[0].message == "Registration Failed") {
        setErrorResponse(result[0].message);
      } else {
        navigation.navigate("Login");
      }
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.divider} />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.modal}>
          <View style={{ gap: 10 }}>
            <Text style={defaultStyles.heading}>
              Let's Create your Account!
            </Text>
            <Text style={defaultStyles.text}>
              Securing your personal information is our top Priority ..
            </Text>
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <CustomInput
              name="firstname"
              placeholder="Firstname"
              orientation="row"
              control={control}
              errorResponse={errorResponse}
              rules={{ required: "Firstname is required" }}
            />
            <CustomInput
              name="lastname"
              placeholder="Lastname"
              orientation="row"
              control={control}
              errorResponse={errorResponse}
              rules={{ required: "Lastname is required" }}
            />
          </View>

          <CustomInput
            name="middlename"
            placeholder="Middlename (Optional)"
            control={control}
            errorResponse={errorResponse}
          />

          <CustomInput
            name="username"
            placeholder="Username"
            control={control}
            errorResponse={errorResponse}
            rules={{ required: "Username is required" }}
          />

          <CustomInput
            name="email"
            placeholder="Email"
            control={control}
            errorResponse={errorResponse}
            rules={{
              required: "Email is required",
              pattern: {
                value: EMAIL_REGEX,
                message: "Invalid Email Format",
              },
            }}
          />

          <CustomInput
            name="password"
            placeholder="Password"
            secureTextEntry
            control={control}
            errorResponse={errorResponse}
            rules={{
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password should be minimum 8 characters",
              },
            }}
          />

          {errorResponse && (
            <Animated.View entering={FadeIn} exiting={FadeOutUp}>
              <Text style={styles.errorResponse}>{errorResponse}</Text>
            </Animated.View>
          )}

          <View style={{ gap: 20, marginTop: 10 }}>
            <Button
              mode="contained"
              onPress={handleSubmit(onRegister)}
              theme={{ roundness: 1 }}
            >
              {loading ? "Registering ..." : "Register"}
            </Button>

            <Button
              mode="outlined"
              onPress={() => navigation.navigate("Login")}
              theme={{ roundness: 1 }}
            >
              Already Have an Account? Login now!
            </Button>
          </View>
        </View>
      </KeyboardAwareScrollView>
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
    height: Metrics.screenHeight - 140,
    backgroundColor: Colors.white,
    gap: 20,
    padding: 32,
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
