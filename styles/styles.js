import { StyleSheet, Text, View } from 'react-native';


export const styles = StyleSheet.create({

  background: {
  backgroundColor: "#F8F9FA",
  height: "100%",
  width: "100%",
  position: "absolute",
  zIndex: -100,
  overflow: "hidden",
  alignItems: "center"
},


header: {
  backgroundColor: "#A50000",
  height: 65,
  width: "100%",
  position: "relative",
  top: 0,
  alignItems: "center"
},


title: {
	marginTop: 25,
	fontSize: 36,
	
},


textShadow: {
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
  },


  contentBox: {
  	backgroundColor: "white",
  	width: 350,
  	height: 350,
  	marginTop: "10%",
  	borderColor: "#DADCE0",
  	borderWidth: 1,
  	borderRadius: 10
  },


  thermometer: {
  	width: "35%",
  	height: 275,
  	left: "30%",
  	top: "5%",
  	borderRadius: 30,
  	borderWidth: 1,
  	borderColor: "black"

  },


  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 4, 
    elevation: 4 
  },


  thermMarker: {
  	width: "100%",
  	height: 10,
  	marginTop: 0,
  	backgroundColor: "#F8F9FA",
  	borderWidth: 1,
  	borderColor: "black"
  },


  thermText: {
  	fontSize: 36,
  	height: 350,
  	alignItems: "center",
  	justifyContent: "center",
  	marginTop: 130,
  	marginLeft: 30,
  	textShadowColor: "black",
  	textShadowOffset: {width: 1, height: 1},
  	textShadowRadius: 1
  },


  refreshButton: {
  	width: 200,
  	height: 55,
  	alignItems: "center",
  	justifyContent: "center",
  	borderColor: "black",
  	borderWidth: 1,
  	borderRadius: 100
  },


  refreshText: {
  	fontSize: 36,
  	lineHeight: 40,
  }
});

