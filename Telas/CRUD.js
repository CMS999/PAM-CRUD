import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import firebase from '../database/firebaseDb';

class CRUD extends Component {
  
  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }
  constructor() {
    
    super();
    this.bdREF = firebase.firestore().collection('usuarios');
    this.state = {
      Email: '',
      Nome: '',
      CPF: '',
      Senha: '',
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
  
  /* async Teste(){
    const nera = await firebase.firestore().collection('usuarios').get();    
    console.log(nera.docs.map(doc => doc.data()));
  } */
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
    this.inputValueUpdate(Apicep.cep, 'CEP');
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
    this.setState({isLoading: true});      
      this.bdREF.doc(this.state.Email).set({
        Email: this.state.Email,
        Nome: this.state.Nome,
        CPF: this.state.CPF,
        Senha: this.state.Senha,
        CEP: this.state.CEP,
        Logradouro: this.state.logradouro,
        Complemento: this.state.complemento,
        Bairro: this.state.bairro,
        Localidade: this.state.localidade,
        UF: this.state.uf,
        IBGE: this.state.ibge,
        Gia: this.state.gia,
        DDD: this.state.ddd,
        Siafi: this.state.siafi,
      }).then((res) => {
        this.setState({
          Email: '',
          Nome: '',
          CPF: '',
          Senha: '',
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
          isLoading: false,
        });
      });    
  }

  Atualizar = async()=> {
    await this.API()
    await this.setDados() 
    this.setState({isLoading: true});      
      this.bdREF.doc(this.state.Email).set({
        Email: this.state.Email,
        Nome: this.state.Nome,
        CPF: this.state.CPF,
        Senha: this.state.Senha,
        CEP: this.state.CEP,
        Logradouro: this.state.logradouro,
        Complemento: this.state.complemento,
        Bairro: this.state.bairro,
        Localidade: this.state.localidade,
        UF: this.state.uf,
        IBGE: this.state.ibge,
        Gia: this.state.gia,
        DDD: this.state.ddd,
        Siafi: this.state.siafi,
      }).then((res) => {
        this.setState({
          Email: '',
          Nome: '',
          CPF: '',
          Senha: '',
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
          isLoading: false,
        });
      });
  }
  
  Deletar() {
    const bdREF = firebase.firestore().collection('usuarios').doc(this.state.Email)
      bdREF.delete()
  }
  
  
  async Pesquisar() {
    const doc = await firebase.firestore().collection('usuarios').doc(this.state.Email).get()
    this.setState({
      Email: doc.data().Email,
      Nome: doc.data().Nome,
      CPF: doc.data().CPF,
      Senha: doc.data().Senha,
      CEP: doc.data().CEP,
    })
  }

  render() {    
    if(this.state.isLoading)
    {
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Email'}
              value={this.state.Email}
              onChangeText={(val) => this.inputValueUpdate(val, 'Email')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Nome'}
              value={this.state.Nome}
              onChangeText={(val) => this.inputValueUpdate(val, 'Nome')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'CPF'}
              value={this.state.CPF}
              onChangeText={(val) => this.inputValueUpdate(val, 'CPF')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Senha'}
              value={this.state.Senha}
              onChangeText={(val) => this.inputValueUpdate(val, 'Senha')}
          />
          
        </View>
        <View style={styles.inputGroup}>
        <TextInput
              placeholder={'CEP'}
              value={this.state.CEP}
              onChangeText={(val) => this.inputValueUpdate(val, 'CEP')}
          />
        </View>
        <View style={styles.containerbutton}>
            <View style={styles.button1}>
              <Button            
                title='Cadastrar'
                onPress={() => this.Cadastrar()} 
                color="#19AC52"
              />
            </View>
            <View style={styles.button1}>
              <Button
                title='Deletar'
                onPress={() => this.Deletar()} 
                color="#19AC52"
              />
            </View>            
            <View style={styles.button1}>
              <Button
                title='Atualizar'
                onPress={() => this.Atualizar()} 
                color="#19AC52"
              />
            </View>            
            <View style={styles.button1}>
              <Button
                title='Pesquisar'
                onPress={() => this.Pesquisar()} 
                color="#19AC52"
              />
            </View>  
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35
  },
  button1:{
    paddingBottom:15
  },
  containerbutton: {
    flex: 1,
    padding: 35,
    marginBottom:15
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default CRUD;