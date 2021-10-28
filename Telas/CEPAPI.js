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
      cep:'',
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
    var URL = 'https://viacep.com.br/ws/';
    var id = this.state.cep;
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
    this.inputValueUpdate(Apicep.cep, 'cep');
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
  Cadastrar = async() => {  
    await this.API()
    await this.setDados()   
      this.bdREF.doc(this.state.cep).set({
        cep: this.state.cep,
        logradouro: this.state.logradouro,
        complemento: this.state.complemento,
        bairro: this.state.bairro,
        localidade: this.state.localidade,
        uf: this.state.uf,
        ibge: this.state.ibge,
        gia: this.state.gia,
        ddd: this.state.ddd,
        siafi: this.state.siafi,
      }).then((res) => {
        this.setState({
          cep:'',
          logradouro:'',
          complemento:'',
          bairro:'',
          localidade:'',
          uf:'',
          ibge:'',
          gia:'',
          ddd:'',
          siafi:'',
          isLoading: false,
        });
      });
  }
  render(){
    return (
      <ScrollView style={styles.container}>

        <View style={styles.inputGroup}>
          <TextInput 
            style={styles.Text}
            onChangeText={(val) => this.inputValueUpdate(val, 'cep')}
            placeholder="Digite o seu CEP aqui"
          />
        </View>
        <View style={styles.containerbutton}>
          <View style={styles.button1}>
            <Button title="Cadastrar" onPress={()=>this.Cadastrar()}></Button>
          </View>
          <View>
            <Button title="Cadastrar" onPress={()=>this.API()}></Button>
          </View>
        </View>
          <View style={styles.inputGroup}>                  
          <Text>Cep: {this.state.cep}</Text>
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
