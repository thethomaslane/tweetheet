import React from 'react';
import { Text, View, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AppLoading from 'expo-app-loading';

import {styles} from '../styles/styles.js';
import s3 from "aws";


import {
  useFonts,
  JosefinSans_600SemiBold,
  JosefinSans_400Regular,
} from '@expo-google-fonts/josefin-sans';



// Displays the colored backgrond, Can have an overlay that improves contrast for text directly on background
export class Background extends React.Component {
  render() {
    return (
    <View style={styles.background}>
    {this.props.children}
    </View>
    )
  }
}


export class Header extends React.Component {  
  render() {
    return (
      <View id="Header" style={styles.header}>
        <Title text="TweetHeet" />
      </View>

    )
  }
}


export function StyledText(props) {
  let [fontsLoaded] = useFonts({ JosefinSans_600SemiBold, JosefinSans_400Regular});

  if (!fontsLoaded) {
    return <Text >Loading...</Text>
  }
  else
  {
    return (
      <Text style={[props.styling, {fontFamily : "JosefinSans_600SemiBold", color: props.color}]} > {props.text} </Text>
    )
  }
}


export class Title extends React.Component {
  render() {
    return (
      <StyledText text="TweetHeet" styling={[styles.title, styles.textShadow]} color={"#FFE769"}/>
    )
  }
}

class ContentBox extends React.Component {
  render() {
    return (
      <View style={[styles.contentBox]}>
        <StyledText text={this.props.contentTitle} styling={{fontSize: 16, margin: 5, color: "#3C4043"}}/>
        {this.props.children}
      </View>
    )
  }
}

export class CurrentSentiment extends React.Component {
  render() {
    var score = s3.getObject(process.env.BUCKET, process.env.AWS_ID, process.env.AWS_KEY).getAttribute("score");
    return (
      <ContentBox contentTitle={"Current Twitter Sentiment"}>
        <SplitHalves left={<Thermometer score={score}/>} right={<ThermText score={score}/>}/>
      </ContentBox>
    )
  }
}

export class Thermometer extends React.Component {
  render() {
    return (
      <View >
      <LinearGradient style={[styles.thermometer, styles.shadow]} colors={["white","white","#FFE769","#A50000"]} locations={[0,1-this.props.score,1-this.props.score,1]} >
        <ThermMarker score={this.props.score}/>
      </LinearGradient>
      </View>
    )
  }
}

export class ThermMarker extends React.Component {
  render() {
    return (
      <LinearGradient style={[{top : (99 - (this.props.score * 100)) + "%"}, styles.thermMarker]} colors={["#FFFFFF","#FFFFFF", "#9F9F9F"]} start={[0.5,0]} end={[1,0]}/>

    )
  }
}

export class ThermText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {color: "#000"};
  }
  componentDidMount() {
    var color = this.pickRGB([255, 231, 105], [165, 0, 0], this.props.score);
    this.setState({color: color });
  }

  componentDidUpdate() {
      var color = this.pickRGB([255, 231, 105], [165, 0, 0], this.props.score)
      if (color != this.state.color)
      {
        this.setState({color: color });
      }
  }

  // Selects a color along linear gradient between color1 and color2 at distance weight
  pickRGB(color1, color2, weight) {
    console.log(color1,color2,weight)
    var w1 = weight;
    var w2 = 1 - w1;
    var rgb = [Math.round(color1[0] * w1 + color2[0] * w2),
        Math.round(color1[1] * w1 + color2[1] * w2),
        Math.round(color1[2] * w1 + color2[2] * w2)];
    var rgbStr = 'rgb('+rgb[0].toString()+','+rgb[1].toString()+','+ rgb[2].toString()+')';
    console.log(rgb)
    return rgbStr
  }

  render() {
    console.log(this.state.color);
    return (
      <StyledText text={Math.round((this.props.score * 100)) + "%"} styling={styles.thermText} color={this.state.color} />
    )
  }
}

export class SplitHalves extends React.Component {
  render() {
    return (
      <View style={{flexDirection:"row", height: "100%"}}>
        <View style={{flex:1, height: "100%"}}>
          {this.props.left}
        </View>
        <View style={{flex:1}}>
          {this.props.right}
        </View>
      </View>
    )
  }
}


export class RefreshButton extends React.Component {
  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
    this.state = {loading: false};
  }
  onPress() {
    this.props.refresh();
    this.setState({loading: true})
    setTimeout(() => {this.setState({loading: false})}, 1000);
  }
  render() {
    return (
      <>
      <Pressable onPressOut={this.onPress} style={({pressed}) => [
          {
            backgroundColor: pressed ? "#800000" : "#A50000",
            top: pressed ? "5.5%" : "5%"
          },
          styles.refreshButton,
          styles.shadow
        ]}>
        <StyledText styling={[styles.refreshText, styles.textShadow]} text="Refresh" color={"#FFE769"} />
      </Pressable>
      {this.state.loading && <Text style={{top:50}} >Updated!</Text>}
      </>
    )
  }
}