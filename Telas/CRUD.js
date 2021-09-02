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
      isLoading: false
    };
  }  
  
  Cadastrar() {
    this.setState({isLoading: true});      
      this.bdREF.doc(this.state.Email).set({
        Email: this.state.Email,
        Nome: this.state.Nome,
        CPF: this.state.CPF,
        Senha: this.state.Senha,
      }).then((res) => {
        this.setState({
          Email: '',
          Nome: '',
          CPF: '',
          Senha: '',
          isLoading: false,
        });
      });    
  }

  Atualizar() {
    this.setState({isLoading: true});      
      this.bdREF.doc(this.state.Email).set({
        Email: this.state.Email,
        Nome: this.state.Nome,
        CPF: this.state.CPF,
        Senha: this.state.Senha,
      }).then((res) => {
        this.setState({
          Email: '',
          Nome: '',
          CPF: '',
          Senha: '',
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
    marginBottom: 15,
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