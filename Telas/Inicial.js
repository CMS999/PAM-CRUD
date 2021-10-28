import React, { Component } from 'react';
import { Button, StyleSheet, ScrollView, ActivityIndicator, View } from 'react-native';

class Inicial extends Component {
  
    render() { 
    return (
      <ScrollView style={styles.container}>
        <View style={styles.containerbutton}>
            <View style={styles.button1}>
              <Button            
                title='Login'
                onPress={() => this.props.navigation.navigate('Login')} 
                color="#19AC52"
              />
            </View>  
            <View style={styles.button1}>
              <Button            
                title='CRUD'
                onPress={() => this.props.navigation.navigate('CRUD')} 
                color="#19AC52"
              />
            </View> 
            <View style={styles.button1}>
              <Button            
                title='CEP'
                onPress={() => this.props.navigation.navigate('CEP')} 
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
})

export default Inicial;