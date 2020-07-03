import React, { useContext, useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

import { GlobalContext } from "../../../config/sharedState";
import { TouchableOpacity } from "react-native-gesture-handler";
import { withTheme } from "styled-components";

export default function Home() {
  const [globalState] = useContext(GlobalContext)();
  const [flightFrom, setFlightFrom] = useState('São Paulo');
  const [flightTo, setFlightTo] = useState('Belo Horizonte');
  const [dateBegin, setDateBegin] = useState('06/07/2020');
  const [dateEnd, setDateEnd] = useState('18/07/2020');

  useEffect(() => {
    console.log(globalState);
  }, [globalState]);

  function handleButtonSearch() {
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
          <Text style={styles.texto}>Insira as informações de sua viagem</Text>
      
          <Text style={styles.texto}>Origem:</Text>
          <TextInput 
          style={[styles.input, {justifyContent: "flex-start"}]}
          placeholder='ex: São Paulo'
          onChangeText={(val) => setFlightFrom(val)}/>
        
          <Text style={styles.texto}>Destino:</Text>
          <TextInput 
          style={styles.input}
          placeholder='ex: Belo Horizonte'
          onChangeText={(val) => setFlightTo(val)}/>

          <Text style={styles.texto}> Data da ida:</Text>
          <TextInput 
          style={styles.input}
          placeholder='ex: 20/07/2020'
          onChangeText={(val) => setDateBegin(val)}/>
          
          <Text style={styles.texto}>Data da volta:</Text>
          <TextInput 
          style={styles.input}
          placeholder='ex: 30/07/2020'
          onChangeText={(val) => setDateEnd(val)}/>
        
          <View>
            <TouchableOpacity style={styles.searchButton}
              onPress={() => handleButtonSearch()}>
              <Text style={styles.searchButtonText}>Buscar</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.texto}>TESTE - Origem: {flightFrom} e Destino: {flightTo}. Horário ida: {dateBegin} e Horário volta: {dateEnd}</Text>
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
  searchButton: {
    borderWidth: 1,
    borderColor: '#007BFF',
    backgroundColor: '#007BFF',
    padding: 5,
    margin: 5,
    width: 80,
    borderRadius: 3,
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center'
  }
})