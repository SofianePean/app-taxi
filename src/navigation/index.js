import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Import composant
import Login from '../components/Login';
import Home from '../components/Home';
import Passenger from '../components/Passenger';

const { Screen, Navigator } = createStackNavigator();
// const Tab = createBottomTabNavigator();

const Navigation = ({initialRouteName}) => {
    return(
      <NavigationContainer>
          <Navigator initialRouteName={initialRouteName} screenOptions={{headerShown: false}}>
              <Screen name="Login" component={Login} />
              <Screen name="Home" component={Home} />
              <Screen name="Passenger" component={Passenger} />
          </Navigator>
      </NavigationContainer> 
    )
}

export default Navigation;