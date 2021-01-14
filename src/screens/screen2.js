import React, { useLayoutEffect, useContext } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { GlobalContext } from './context';
const { height, width } = Dimensions.get('window');

const Screen2 = (props) => {
 // const [state, setState] = useContext(GlobalContext);

  const [state,setState] = React.useState([
    {category: "Lips", image: require('../assets/images/img.png')},
    {category: "Hands", image: require("../assets/images/img.png")},
    {category: "Legs", image: require("../assets/images/img.png")},
    {category: "Fingers", image: require("../assets/images/img.png")},
    {category: "Jawline", image: require("../assets/images/img.png")},
    {category: "Eyes", image: require("../assets/images/img.png")},
    {category: "Head", image: require("../assets/images/img.png")},
    {category: "Hair", image: require("../assets/images/img.png")},
    {category: "Knees", image: require("../assets/images/img.png")},
    {category: "Feet", image: require("../assets/images/img.png")},
    {category: "Elbows", image: require("../assets/images/img.png")},
    {category: "Cheeks", image: require("../assets/images/img.png")},
    {category: "Nose", image: require("../assets/images/img.png")},
    {category: "Neck", image: require("../assets/images/img.png")},
    {category: "Arms", image: require("../assets/images/img.png")},
    {category: "Stomach", image: require("../assets/images/img.png")},
    {category: "Navel", image: require("../assets/images/img.png")},
    {category: "Others", image: require("../assets/images/img.png")},

  ])
  const data = Object.keys(state);
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: 'Beauty N Makeup',
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: '#212026',
      },
      headerTintColor: '#fff',
    });
  }, [props.navigation]);

  const renderItem = ({ item }) => {
    return (
      <View style={{ flexDirection: 'row', width: width * 0.9, justifyContent: 'space-between' }}>
        <View style={{ height: height * 0.08, borderRadius: 20, marginTop: height * 0.05, width: height * 0.08, backgroundColor: 'red' }}>
          <Image source={item.image} style={{ height: height * 0.08,borderRadius: 20, width: height * 0.08 }} resizeMode="stretch"/>
        </View>

        <TouchableOpacity
          onPress={() => props.navigation.navigate('Screen3', { data: item.category })}
          style={{
            padding: 20,
            backgroundColor: 'black',
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            borderColor: '#fc8c03',
            marginTop: 30,
            width: width * 0.6,
            borderBottomWidth: 5,
            borderTopWidth: 3,
          }}>
          <Text
            style={{
              fontStyle: 'italic',
              fontWeight: 'bold',
              fontSize: 45,
              textAlign: 'center',
              color: '#fc8c03',

              //  textShadowColor: '#000',
              // textShadowOffset: {width: -0, height: -0},
              // textShadowRadius: 1,
            }}>
            {item.category}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        style={{
          width: width,
          height: height,
          paddingTop: height * 0.05,
          paddingBottom: height * 0.1,
          alignItems: 'flex-end',
        }}
        source={require('../assets/images/bg2.jpeg')}>
        <FlatList
          data={state}
          keyExtractor={(item, idx) => {
            return idx.toString();
          }}
          renderItem={renderItem}
        />
      </ImageBackground>
    </View>
  );
};

export default Screen2;
