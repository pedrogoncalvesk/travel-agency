import React, { useContext, useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

import { GlobalContext } from "../../../config/sharedState";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Home() {
  const [globalState] = useContext(GlobalContext)();
  const [flightFrom, setFlightFrom] = useState('São Paulo');
  const [flightTo, setFlightTo] = useState('Belo Horizonte');

  useEffect(() => {
    console.log(globalState);
  }, [globalState]);

  return (
    <View style={{ backgroundColor: "#0239fe" }}>
      <View
        style={{
          backgroundColor: "#04594d",
          width: "auto",
          height: "auto",
          margin: 20,
        }}
      >
        <Text>Hospedagens com reserva flexível</Text>
          <View style={{flexDirection:"row"}}>
            <View style={{flex: 1}}>
              <Text>Origem:</Text>
              <TextInput 
              style={[styles.input, {justifyContent: "flex-start"}]}
              placeholder='ex: São Paulo'
              onChangeText={(val) => setFlightFrom(val)}/>
            </View>
            <View style={{flex: 1}}>
              <Text>Destino:</Text>
              <TextInput 
              style={styles.input}
              placeholder='ex: Belo Horizonte'
              onChangeText={(val) => setFlightTo(val)}/>
            </View>
          </View>
          <View>
            <TouchableOpacity style={styles.saveButton}
              onPress={() => alert('Hello, world!')}>
              <Text style={styles.saveButtonText}>Buscar</Text>
            </TouchableOpacity>
          </View>
          <Text>TESTE - Origem: {flightFrom} e Destino: {flightTo}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    padding: 20,
    margin: 5,
    width: 100,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center'
  }
})