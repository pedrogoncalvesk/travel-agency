import React, { useContext, useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

import { GlobalContext } from "../../../config/sharedState";
import { TouchableOpacity } from "react-native-gesture-handler";
import { withTheme } from "styled-components";

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
    <View style={{ backgroundColor: "#efeff4" }}>
      <View
        style={{
          backgroundColor: "#8b008b",
          width: "auto",
          height: "auto",
          margin: 30,
          borderRadius:20,
        }}
      >
        <View
        style={{
          margin:20
        }}>
          <Text style={styles.texto}>Sobre onde deseja conhecer mais?</Text>

          <Text style={styles.texto}>Local</Text>
          <TextInput
          style={[styles.input, {justifyContent: "flex-start"}]}
          placeholder='ex: São Paulo'
          onChangeText={(val) => setInfoAbout(val)}/>

          <View>
            <TouchableOpacity style={styles.saveButton}
              onPress={() => handleButtonInformations()}>
              <Text style={styles.saveButtonText}>Buscar</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.texto}>TESTE - Informações de: {infoAbout}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  texto: {
    color: "white"
  },
  container: {
    margin:30
  },
  input: {
    borderWidth: 1,
    borderColor: '#777',
    padding: 8,
    margin: 10,
    width: 200,
  },
  saveButton: {
    borderWidth: 1,
    borderColor: '#007BFF',
    backgroundColor: '#007BFF',
    padding: 5,
    margin: 5,
    width: 80,
    borderRadius: 3,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center'
  }
})
