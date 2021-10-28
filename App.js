import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Inicial from './Telas/Inicial';
import CRUD from './Telas/CRUD';
import Cadastrar from './Telas/Cadastrar';
import Login from './Telas/Login';
import CEPAPI from './Telas/CEPAPI';
import CEP from './Telas/CEP';

const Stack = createStackNavigator();

function MyStack() {
  
  return (
    <Stack.Navigator
      screenOptions={{
          headerStyle: {
            backgroundColor: '#621FF7',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
      <Stack.Screen 
      name="Inicial" 
      component={Inicial} 
      options={{ title: 'Tela Inicial' }}
      /> 
      <Stack.Screen 
       name="Cadastrar" 
       component={Cadastrar} 
       options={{ title: 'Cadastro' }}
      />
      <Stack.Screen 
      name="CRUD" 
      component={CRUD} 
      options={{ title: 'CRUD' }}
      />
      <Stack.Screen 
      name="Login" 
      component={Login} 
      options={{ title: 'Login' }}
      />
      <Stack.Screen 
      name="CEPAPI" 
      component={CEPAPI} 
      options={{ title: 'CEPAPI' }}
      />  
      <Stack.Screen 
      name="CEP" 
      component={CEP} 
      options={{ title: 'CEP' }}
      />         
      
    </Stack.Navigator>
  );
}

export default function App() {
  
  return (
    
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
    
  );
}