import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";

type Props = {
  style?: ViewProps["style"];
  gap?: number;
  color?: string;
};

const HorizontalLine = (props: Props) => {
  return (
    <View
      style={[
        {
          borderBottomColor: props.color || "black",
          borderBottomWidth: StyleSheet.hairlineWidth,
          marginVertical: props.gap || 24,
        },
        props.style,
      ]}
    />
  );
};

export default HorizontalLine;
