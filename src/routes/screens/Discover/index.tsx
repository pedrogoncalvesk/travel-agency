import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input } from 'react-native-elements';

import { GlobalContext } from "../../../config/sharedState";
import { TouchableOpacity } from "react-native-gesture-handler";
import { withTheme } from "styled-components";
import ContainerPurple from "../../../styled/ContainerPurple";
import ContainerPrimary from "../../../styled/ContainerPrimary";
import { Text, TextInput, Button, ButtonText } from "../Tickets/styled";

export default function About() {
  const [globalState] = useContext(GlobalContext)();
  const [infoAbout, setInfoAbout] = useState('Lugar');

  useEffect(() => {
    console.log(globalState);
  }, [globalState]);

  function handleButtonInformations() {
    alert('Enviar os valores para a API e atualizar a pagina');
  }

  return (
    <ContainerPurple>
      <ContainerPrimary>
        <View
        style={{
          margin:20
        }}>
          <Text>Sobre onde deseja conhecer mais?</Text>

          <Text>Local</Text>
          <Input
          placeholder='ex: São Paulo'
          onChangeText={val => setInfoAbout(val)}/>

          <View>
            <Button
              onPress={() => handleButtonInformations()}>
              <Text>Buscar</Text>
            </Button>
          </View>
          <Text>TESTE - Informações de: {infoAbout}</Text>
        </View>
      </ContainerPrimary>
    </ContainerPurple>
  );
}