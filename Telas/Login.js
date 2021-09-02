import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import firebase from '../database/firebaseDb';

class Login extends Component {
  constructor() {
    super();
    this.dbRef = firebase.firestore().collection('usuarios');
    this.state = {
      Email: '',
      Nome: '',
      CPF: '',
      Senha: '',
      isLoading: false
    };
  }  
  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  async Logar() {
    const doc = await firebase.firestore().collection('usuarios').doc(this.state.Email).get()
    if (this.state.Senha === doc.data().Senha){
        this.props.navigation.navigate('CRUD')
    }
    else{alert("Senha Incorreta")}
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
              placeholder={'Senha'}
              value={this.state.Senha}
              onChangeText={(val) => this.inputValueUpdate(val, 'Senha')}
          />
        </View>
        <View style={styles.containerbutton}>
            <View style={styles.button1}>
              <Button            
                title='Logar'
                onPress={() => this.Logar()} 
                color="#19AC52"
              />
            </View>
            <View style={styles.button1}>
              <Button            
                title='Cadastrar'
                onPress={() => this.props.navigation.navigate('Cadastrar')} 
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

export default Login;