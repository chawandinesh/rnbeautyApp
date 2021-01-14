import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Redressed from '../assets/fonts/Redressed-Regular.ttf';
const { height, width } = Dimensions.get('window');
const Screen1 = (props) => {
  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerShown: false,
    });
  }, [props.navigation]);
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        style={{
          width: width,
          height: height,
          flex:1,
         // alignItems: 'center',
         marginTop: height * 0.05
        }}
        source={require('../assets/images/bg.jpeg')}>
        <View style={{flex:1}}>

          <Text
            style={{
              color: '#fff',
             
              fontSize: 50,
              textAlign:'center',
              textShadowColor: '#000',
              textShadowOffset: { width: -1, height: 1 },
              textShadowRadius: 10,
              backgroundColor:'red',
            }}>
            Beauty N Makeup
          </Text>
        </View>
        <View style={{flex:3, justifyContent:'center'}}>
        <View style={{ width: width, alignItems: 'flex-end', marginTop: 20 }}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Screen2')}
            style={{
              padding: 20,
              width: "auto",
              //height:height * 0.,
              fontSize:80,
              alignItems: 'center',
              borderBottomLeftRadius: 20,
              backgroundColor: '#eee',
              borderBottomWidth: 5,
              borderBottomColor: '#f76',
              borderLeftWidth: 3,
              flexDirection:'row',
              //flex:1, 
              

            }}>
              <Image source={require('../assets/images/makeupbackground1.jpg')} style={{height: width * 0.2, width: width * 0.2}}/>
            <Text style={{ fontSize: 40, fontWeight: 'bold' }}>Add Details</Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: width,  alignItems: 'flex-start', marginTop: 20 }}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Screen5')}
            style={{
              marginTop:20,
              padding: 20,
              width: "auto",
             // height:100,
              flexDirection:'row',
              alignItems: 'center',
              borderTopRightRadius: 20,
              backgroundColor: '#eee',
              borderTopWidth: 5,
              borderTopColor: '#f76',
              borderRightWidth: 3
            }}>
            <Text style={{ fontSize: 40, fontWeight: 'bold' }}>View Details</Text>
            <Image source={require('../assets/images/makeupbackground1.jpg')} style={{height: width * 0.2, width: width * 0.2}}/>
          </TouchableOpacity>
        </View>
        </View>
        <View style={{flex:1, justifyContent:'center'}}>

<Text
  style={{
    color: '#fff',
   
    fontSize: 50,
    textAlign:'center',
    textShadowColor: '#000',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    backgroundColor:'red',
  }}>
 Beauty N Makeup
</Text>
</View>
      </ImageBackground>
    </View>
  );
};

export default Screen1;
