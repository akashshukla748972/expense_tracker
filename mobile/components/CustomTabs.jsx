import { View, Platform, TouchableOpacity, StyleSheet } from "react-native";
import { useLinkBuilder, useTheme } from "@react-navigation/native";
import { Text, PlatformPressable } from "@react-navigation/elements";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Icon from "phosphor-react-native";

export default function CustomTabs({ state, descriptors, navigation }) {
  const tabbarIcons = {
    index: (isFocused) => (
      <Icon.House
        size={30}
        weight={isFocused ? "fill" : "regular"}
        color={isFocused ? "#a3e635" : "#a3a3a3"}
      />
    ),
    statistics: (isFocused) => (
      <Icon.ChartBar
        size={30}
        weight={isFocused ? "fill" : "regular"}
        color={isFocused ? "#a3e635" : "#a3a3a3"}
      />
    ),
    wallet: (isFocused) => (
      <Icon.Wallet
        size={30}
        weight={isFocused ? "fill" : "regular"}
        color={isFocused ? "#a3e635" : "#a3a3a3"}
      />
    ),
    profile: (isFocused) => (
      <Icon.User
        size={30}
        weight={isFocused ? "fill" : "regular"}
        color={isFocused ? "#a3e635" : "#a3a3a3"}
      />
    ),
  };
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabbarItem}
            key={index}
          >
            {tabbarIcons[route.name] && tabbarIcons[route.name](isFocused)}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    height: Platform.OS == "android" ? 85 : 85,
    backgroundColor: "#262626",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopColor: "#404040",
    borderTopWidth: 3,
  },
  tabbarItem: {
    flex: 1,
    marginBottom: Platform.OS == "android" ? 8 : 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
