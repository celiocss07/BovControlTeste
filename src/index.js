import {View, Text} from 'react-native';
import Toast from 'react-native-toast-message';
import {LogBox} from "react-native";
import React from 'react';
import Routers from './routes/router';
import ChecklistProvider from './Context/checklistContext';

export default function index() {

  LogBox.ignoreLogs([
    "ViewPropTypes will be removed",
    "ColorPropType will be removed",
    "ViewPropTypes will be removed from React Native"
    ])
    LogBox.ignoreLogs([
      "exported from 'deprecated-react-native-prop-types'.",
      ])
  return (
    
    <ChecklistProvider>
      <Routers />
      <Toast />
    </ChecklistProvider>
  );
}
