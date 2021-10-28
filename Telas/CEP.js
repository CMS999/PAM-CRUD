import React, { useState, Component } from 'react';
import { Text, View, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import firebase from '../database/firebaseDb';

class CEP extends Component {
  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }
  constructor() {
    
    super();
    this.bdREF = firebase.firestore().collection('usuarios');
    this.state = {
      Apicep:[],
      Email: '',
      CEP:'',
      logradouro:'',
      complemento:'',
      bairro:'',
      localidade:'',
      uf:'',
      ibge:'',
      gia:'',
      ddd:'',
      siafi:'',
      isLoading: false
    };
  }  
  API= async() => {
    var URL = 'https://viaCEP.com.br/ws/';
    var id = this.state.CEP;
    var ChaveAPI = '/json/';
    await fetch(URL + id + ChaveAPI)
    .then(response => response.json())
    .then(result => {
      this.setState({Apicep: result})       
    })
    .catch((error) => console.error(error))    
    this.setDados();
    
  }    
  setDados(){
    const { Apicep } = this.state;  
    this.inputValueUpdate(Apicep.CEP, 'CEP');
    this.inputValueUpdate(Apicep.logradouro, 'logradouro');
    this.inputValueUpdate(Apicep.complemento, 'complemento');
    this.inputValueUpdate(Apicep.bairro, 'bairro');
    this.inputValueUpdate(Apicep.localidade, 'localidade');
    this.inputValueUpdate(Apicep.uf, 'uf');
    this.inputValueUpdate(Apicep.ibge, 'ibge');
    this.inputValueUpdate(Apicep.gia, 'gia');
    this.inputValueUpdate(Apicep.ddd, 'ddd');
    this.inputValueUpdate(Apicep.siafi, 'siafi');  
    this.setState({isLoading: true}); 
  }
  async Pesquisar() {
    const doc = await firebase.firestore().collection('usuarios').doc(this.state.Email).get()
    this.setState({
        CEP: doc.data().CEP,
        logradouro: doc.data().Logradouro,
        complemento: doc.data().Complemento,
        bairro: doc.data().Bairro,
        localidade: doc.data().Localidade,
        uf: doc.data().UF,
        ibge: doc.data().IBGE,
        gia: doc.data().Gia,
        ddd: doc.data().DDD,
        siafi: doc.data().Siafi,
    })
  }
  render(){
    return (
      <ScrollView style={styles.container}>

        <View style={styles.inputGroup}>
          <TextInput 
            style={styles.Text}
            onChangeText={(val) => this.inputValueUpdate(val, 'Email')}
            placeholder="Digite o seu Email aqui"
          />
        </View>
        <View style={styles.containerbutton}>
          <View style={styles.button1}>
            <Button title="Cadastrar" onPress={()=>this.Pesquisar()}></Button>
          </View>
        </View>
          <View style={styles.inputGroup}>                  
          <Text>CEP: {this.state.CEP}</Text>
          <Text>Logradouro: {this.state.logradouro}</Text>
          <Text>Complemento: {this.state.complemento}</Text>
          <Text>Bairro: {this.state.bairro}</Text>
          <Text>Localidade: {this.state.localidade}</Text>
          <Text>UF: {this.state.uf}</Text>
          <Text>Ibge: {this.state.ibge}</Text>
          <Text>Gia: {this.state.gia}</Text>
          <Text>DDD: {this.state.ddd}</Text>
          <Text>Siafi: {this.state.siafi}</Text>
        </View>
      </ScrollView>
    );
  } 
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 5
    },
    button1:{
      paddingBottom:5,
    },
    containerbutton: {
      flex: 1,
      padding: 5,
    },
    inputGroup: {
      flex: 1,
      padding: 0,
    },
    Text:{
        height:50,
        textAlign:'center',

    }
  })
export default CEP;
