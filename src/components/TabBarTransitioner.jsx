import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Animated, Dimensions, TouchableOpacity, View } from "react-native";

const Tab = createBottomTabNavigator();

export const TabBarTransitioner = ({ children, navigation, ...rest }) => {
    const [translateValue] = React.useState(new Animated.Value(0));
    const totalWidth = Dimensions.get("window").width;
    const tabWidth = totalWidth / 5;

    return (
        <View style={{ flex: 1 }}>
            <View style={{ height: 50 }}>
                <Animated.View
                    style={{
                        position: "absolute",
                        width: tabWidth,
                        height: 2,
                        backgroundColor: "red",
                        bottom: 0,
                        transform: [{ translateX: translateValue }],
                    }}
                />
                <View
                    style={{
                        flexDirection: "row",
                        height: 50,
                        elevation: 2,
                    }}
                >
                    {children.map((item, index) => {
                        return (
                            <TouchableOpacity
                                key={item.key}
                                style={{
                                    flex: 1,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                                onPress={() => {
                                    navigation.navigate(item.props.name);
                                    Animated.spring(translateValue, {
                                        toValue: index * tabWidth,
                                        velocity: 10,
                                        useNativeDriver: true,
                                    }).start();
                                }}
                            >
                                {item}
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>
            <Tab.TabBar {...rest}>{children}</Tab.TabBar>
        </View>
    );
};