import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import * as comp from "./components/components.js"




export default function App() {
  const [refresh, setRefresh] = useState(0);

  function refreshFunc(e) {
    console.log(refresh + 1)
    setRefresh(refresh + 1);
  }
  return (
    <comp.Background>
      <StatusBar style="auto" />
      <comp.Header />
      <comp.CurrentSentiment />
      <comp.RefreshButton refresh={refreshFunc}/>
    </comp.Background>
  );
}

