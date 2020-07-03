import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";

import { GlobalContext } from "../../../config/sharedState";
import { Text, TextInput, Button, ButtonText } from "./styled";

export default function Home() {
  const [globalState] = useContext(GlobalContext)();
  const [flightFrom, setFlightFrom] = useState("São Paulo");
  const [flightTo, setFlightTo] = useState("Belo Horizonte");
  const [dateBegin, setDateBegin] = useState("06/07/2020");
  const [dateEnd, setDateEnd] = useState("18/07/2020");

  useEffect(() => {
    console.log(globalState);
  }, [globalState]);

  const handleButtonSearch = () => {
    console.log("Enviar os valores para a API e atualizar a pagina");
  };

  return (
    <View style={{ backgroundColor: "#efeff4" }}>
      <View
        style={{
          backgroundColor: "#8b008b",
          width: "auto",
          height: "auto",
          margin: 30,
          borderRadius: 20,
        }}
      >
        <View
          style={{
            margin: 20,
          }}
        >
          <Text>Insira as informações de sua viagem</Text>

          <Text>Origem:</Text>
          <TextInput
            style={{ justifyContent: "flex-start" }}
            placeholder="ex: São Paulo"
            onChangeText={val => setFlightFrom(val)}
          />

          <Text>Destino:</Text>
          <TextInput
            placeholder="ex: Belo Horizonte"
            onChangeText={val => setFlightTo(val)}
          />

          <Text> Data da ida:</Text>
          <TextInput
            placeholder="ex: 20/07/2020"
            onChangeText={val => setDateBegin(val)}
          />

          <Text>Data da volta:</Text>
          <TextInput
            placeholder="ex: 30/07/2020"
            onChangeText={val => setDateEnd(val)}
          />

          <View>
            <Button onPress={() => handleButtonSearch()}>
              <ButtonText>Procurar</ButtonText>
            </Button>
          </View>
          <Text>
            TESTE - Origem: {flightFrom} e Destino: {flightTo}. Horário ida:{" "}
            {dateBegin} e Horário volta: {dateEnd}
          </Text>
        </View>
      </View>
    </View>
  );
}
