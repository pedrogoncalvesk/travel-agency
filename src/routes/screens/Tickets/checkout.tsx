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
  const [name, setName] = useState("Joao da Silva");
  const [cardNumber, setCardNumber] = useState("1234 5678 9876 5432");
  const [cvv, setCvv] = useState("123");
  const [expireDate, setExpireDate] = useState("01/20");

  useEffect(() => {
    console.log(globalState);
  }, [globalState]);

  const handleButtonBuy = () => {
    console.log("Finalizar a compra");
  };

  return (
    <ScrollContainer paddingHorizontal={0} justifyContent="flex-start">
      <ContainerPurple>
        <ContainerPrimary>
          <Text>Informações sobre sua passagem</Text>
          
          <Text>Informações do seu cartão de crédito</Text>
          <Text>Nome no cartão</Text>
          <Input
            style={{ justifyContent: "flex-start" }}
            placeholder="Joao da Silva"
            onChangeText={val => setName(val)}
          />
          <Text>Número do cartão</Text>
          <Input
            placeholder="1234 5678 9876 5432"
            onChangeText={val => setCardNumber(val)}
          />
          <Text>CVV</Text>
          <Input
            placeholder="123"
            onChangeText={val => setCvv(val)}
          />
          <Text>Data de validade</Text>
          <Input
            placeholder="01/20"
            onChangeText={val => setExpireDate(val)}
          />

          <View>
            <Button onPress={() => handleButtonBuy()}>
              <ButtonText>Comprar</ButtonText>
            </Button>
          </View>
          <Text>
            TESTE - Origem: {name} e Destino: {cardNumber}. Horário ida:{" "}
            {cvv} e Horário volta: {expireDate}
          </Text>
        </ContainerPrimary>
      </ContainerPurple>
    </ScrollContainer>
  );
}
