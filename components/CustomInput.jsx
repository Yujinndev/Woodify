import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { TextInput, HelperText } from "react-native-paper";
import Colors from "../constants/Colors";
import Animated, { FadeIn, FadeOutUp } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAvoidingView, View } from "react-native";

const CustomInput = ({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
  orientation,
  errorResponse,
  inputType = "default",
}) => {
  const [hide, setHide] = useState(secureTextEntry);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <View
          style={{
            flex: orientation && 1,
            paddingHorizontal: 3,
            marginBottom: 3,
          }}
        >
          <TextInput
            value={value}
            label={placeholder}
            mode="outlined"
            onBlur={onBlur}
            secureTextEntry={hide}
            onChangeText={onChange}
            keyboardType={inputType}
            activeOutlineColor={(error || errorResponse) && Colors.error}
            outlineColor={(error || errorResponse) && Colors.error}
            style={{ marginVertical: -0 }}
            right={
              placeholder === "Password" ? (
                <TextInput.Icon
                  icon={() => (
                    <Ionicons name={hide ? "eye-off" : "eye"} size={22} />
                  )}
                  onPress={() => setHide(!hide)}
                />
              ) : null
            }
          />
          {error && (
            <Animated.View
              entering={FadeIn}
              exiting={FadeOutUp}
              style={{ position: "absolute", bottom: -23 }}
            >
              <HelperText
                style={{
                  fontFamily: "Montserrat-sb",
                  color: Colors.error,
                }}
                type="error"
                visible={true}
              >
                {error?.message || "Error"}
              </HelperText>
            </Animated.View>
          )}
        </View>
      )}
    />
  );
};

export default CustomInput;
