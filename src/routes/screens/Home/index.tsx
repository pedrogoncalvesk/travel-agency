import React, { useContext, useEffect } from "react";
import { View, Text } from "react-native";

import { GlobalContext } from "../../../config/sharedState";

export default function Home() {
  const [globalState] = useContext(GlobalContext)();

  useEffect(() => {
    console.log(globalState);
  }, [globalState]);

  return (
    <View style={{ backgroundColor: "#0239fe" }}>
      <View
        style={{
          backgroundColor: "#04594d",
          width: "auto",
          height: 100,
          margin: 20,
        }}
      >
        <Text>Hospedagens com reserva flexível</Text>
      </View>
    </View>
  );
}
