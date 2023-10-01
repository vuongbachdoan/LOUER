import { LinearGradient } from "expo-linear-gradient";
import { Text, TouchableOpacity } from "react-native";

export const GradientButton = ({ text, width, height = 45, minWidth, minHeight, colors = ['#8AD4EC', '#EF96FF', '#FF56A9', '#FFAA6C'], color = '#FFF', onPress = () => { }, prefixIcon, radius = 10000 }) => {


  const handlePress = () => {
    onPress();
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
    >
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 1 }}
        style={{
          height: height ?? 48,
          width: width ?? 'auto',
          borderRadius: radius,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          minWidth: minWidth,
          minHeight: minWidth
        }}
      >
        {
          prefixIcon &&
          <>{prefixIcon}</>
        }
        {
          text &&
          <Text style={{ color: color, fontSize: 16, fontWeight: 600 }}>{text}</Text>
        }
      </LinearGradient>
    </TouchableOpacity>
  );
};