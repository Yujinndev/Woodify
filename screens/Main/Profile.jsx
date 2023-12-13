import React, { useEffect, useState } from "react";
import { Avatar, Button, Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { AppBar } from "@react-native-material/core";
import { StyleSheet, View } from "react-native";
import useUserStore from "../../utils/userStore";
import Colors from "../../constants/Colors";

const LeftContent = (props) => (
  <Avatar.Image {...props} source={require("../../assets/icon.png")} />
);

const Profile = () => {
  const navigation = useNavigation();

  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);

  const handleLogout = () => {
    clearUser();
    navigation.navigate("Login");
  };

  useEffect(() => {
    if (!user) {
      navigation.navigate("Login");
    }
  }, [user]);

  return (
    <>
      <AppBar
        title={"Profile"}
        color={Colors.primary}
        style={{ position: "relative", height: 80, paddingTop: 25 }}
        titleStyle={{
          fontFamily: "Petemoss",
          fontSize: 39,
          color: "white",
        }}
      />
      <View style={styles.container}>
        {user && (
          <Card>
            <Card.Title
              title={`${user[0].lastname}, ${user[0].firstname}`}
              subtitle="Platinum Customer"
              left={LeftContent}
            />
            <Card.Cover
              style={{ padding: 8 }}
              source={{ uri: "https://picsum.photos/700" }}
            />
            <Card.Actions>
              <Button onPress={handleLogout}>Logout</Button>
            </Card.Actions>
          </Card>
        )}
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
});

export default Profile;
