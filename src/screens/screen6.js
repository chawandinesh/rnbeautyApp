import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import {Item, Label, Input, Textarea, Form, Icon} from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import {ScrollView} from 'react-native-gesture-handler';

const {height, width} = Dimensions.get('window');
const Screen6 = (props) => {
  const [dataItems, setDataItems] = React.useState([]);
  const selectedItem = props.route.params.data;
  const {data} = props.route.params
  console.log(data, 'data')
//   const isAll = props.route.params.isAll;
//   const index = props.route.params.index;
  const [details, setDetails] = useState({
    category: '',
    name: '',
    detailsOfItem: '',
    useMethod: '',
    description: '',
    image: '',
  });

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: 'View Details',
      headerTitleAlign: 'center',
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#333',

        // opacity: 0.8,
      },
    });
  }, [props.navigation]);


  return (
    // <KeyboardAvoidingView behavior="padding" style={{flex: 1}} >
    // <ScrollView style={{flex: 1}}>
    <ImageBackground
      style={{
        width: width,
        height: height,
        flex: 1,
        // paddingTop: height * 0.05,
        // paddingBottom: height * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.9,
      }}
      source={require('../assets/images/bgg.jpeg')}>
      <ScrollView
        style={{
          height: height * 0.9,
          borderTopRightRadius: 40,
          borderBottomLeftRadius: 40,
          width: width * 0.99,
          //backgroundColor: '#000',
          borderRightColor: '#ffb',
          borderTopColor: '#f78',
          borderTopWidth: 3,
          borderBottomColor: '#f78',
          borderBottomWidth: 3,
          borderLeftColor: '#ffb',
          borderLeftWidth: 5,
          borderRightWidth: 5,
          padding: 10,
          // flex: /1,
          opacity: 0.9,
        }}>
        <Item
          style={{
            marginTop: 30,
            borderBottomColor: 'black',
            borderBottomWidth: 5,
            backgroundColor: '#fff',
            borderLeftColor: 'black',
            borderLeftWidth: 5,
          }}>
          <Input
            style={{color: '#000'}}
            placeholder="Category of Makeup"
            value={data.item.category}
            disabled  
          />
        </Item>
        <Item
          style={{
            marginTop: 30,
            borderBottomColor: 'black',
            borderBottomWidth: 5,
            backgroundColor: '#fff',
            borderLeftColor: 'black',
            borderLeftWidth: 5,
          }}>
          <Input
            style={{color: '#000'}}
            disabled
            placeholder="Name of Makeup Item"
            value={data && data.item.name}
            // onChangeText={(text) => setDetails({...details, name: text})}
          />
        </Item>
        <Item
          style={{
            marginTop: 30,
            borderBottomColor: 'black',
            borderBottomWidth: 5,
            backgroundColor: '#fff',
            borderLeftColor: 'black',
            borderLeftWidth: 5,
          }}>
          <Input
            style={{color: '#000'}}
            placeholder="Details of Makeup item"
            disabled
            value={data && data.item.detailsOfItem}
            // onChangeText={(text) =>
            //   setDetails({...details, detailsOfItem: text})
            // }
          />
        </Item>
        <Item
          style={{
            marginTop: 30,
            borderBottomColor: 'black',
            borderBottomWidth: 5,
            backgroundColor: '#fff',
            borderLeftColor: 'black',
            borderLeftWidth: 5,
          }}>
          <Input
            style={{color: '#000'}}
            placeholder="How to use ?"
            disabled
            value={data && data.item.useMethod}
            // onChangeText={(text) => setDetails({...details, useMethod: text})}
          />
        </Item>

        <View style={{marginTop: 30}}>
          <Label
            style={{
              color: '#fff',
              fontWeight: 'bold',
              textDecorationLine: 'underline',
            }}>
            Description :{' '}
          </Label>
          <Textarea
            rowSpan={3}
            bordered
            disabled
            style={{
              marginTop: 30,
              borderBottomColor: 'black',
              borderBottomWidth: 5,
              backgroundColor: '#fff',
              borderLeftColor: 'black',
              borderLeftWidth: 5,
            }}
            placeholder="Enter..."
            placeholderTextColor="#777"
            value={data && data.item.description}
            onChangeText={(text) => setDetails({...details, description: text})}
          />
        </View>

        <View
          style={{
            height: height * 0.1,
            marginTop: 20,
            justifyContent: 'space-around',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            disabled
            style={{
              width: width * 0.2,
              backgroundColor: '#ffc',
              borderWidth: 2,
              height: height * 0.1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {data && data.item.image ? (
              <Image
                source={{uri: data.item.image}}
                resizeMode="stretch"
                style={{height: 100, width: 100}}
              />
            ) : (
              <Icon type="EvilIcons" name="image" style={{fontSize: 50}} />
            )}
          </TouchableOpacity>
        </View>
       
      </ScrollView>
    </ImageBackground>
    //  </ScrollView>
    //  </KeyboardAvoidingView>
  );
};

export default Screen6