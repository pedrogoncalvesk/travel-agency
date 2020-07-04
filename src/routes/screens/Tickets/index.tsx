import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { Input } from "react-native-elements";

import { GlobalContext } from "../../../config/sharedState";
import ContainerPurple from "../../../styled/ContainerPurple";
import ContainerPrimary from "../../../styled/ContainerPrimary";
import Icon from "../../../styled/Icon";
import { ScrollContainer } from "../../../styled/ScrollContainer";
import { Text, Button, ButtonText } from "./styled";

export default function Tickets() {
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
    <ScrollContainer paddingHorizontal={0} justifyContent="flex-start">
      <ContainerPurple>
        <ContainerPrimary>
          <Text>Insira as informações de sua viagem</Text>

          <Text>Origem:</Text>
          <Input
            style={{ justifyContent: "flex-start" }}
            placeholder="ex: São Paulo"
            onChangeText={val => setFlightFrom(val)}
          />
          <Text>Destino:</Text>
          <Input
            placeholder="ex: Belo Horizonte"
            onChangeText={val => setFlightTo(val)}
          />
          <Text> Data da ida:</Text>
          <Input
            leftIcon={<Icon iconName="calendar" size={24} color="white" />}
            placeholder=" 20/07/2020"
            onChangeText={val => setDateBegin(val)}
          />
          <Text>Data da volta:</Text>
          <Input
            leftIcon={<Icon iconName="calendar" size={24} color="white" />}
            placeholder=" 30/07/2020"
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
        </ContainerPrimary>
      </ContainerPurple>
    </ScrollContainer>
  );
}
