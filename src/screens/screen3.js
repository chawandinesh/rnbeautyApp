import React, {useLayoutEffect, useContext} from 'react';
import firestore from '@react-native-firebase/firestore';

import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import {Icon} from 'native-base';
import {GlobalContext} from './context';
import {SwipeListView} from 'react-native-swipe-list-view';

const {height, width} = Dimensions.get('window');

const Screen3 = (props) => {
  const [state, setState] = useContext(GlobalContext);
  const [dataItems, setDataItems] = React.useState([]);
  const [hiddenLayout, setHiddenLayout] = React.useState([])
  const openRowRefs = [];

  const onRowDidOpen = (rowKey, rowMap) => {
    openRowRefs.push(rowMap[rowKey]);
  };
  const selectedItem = props.route.params.data;

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: 'Details',
      headerTitleAlign: 'center',
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#212026',
      },
      headerRight: () => {
        return (
          <TouchableOpacity
            style={{padding: 10}}
            onPress={() =>
              props.navigation.navigate('Screen4', {data: selectedItem})
            }>
            <Icon name="add-outline" type="Ionicons" style={{color: '#fff'}} />
          </TouchableOpacity>
        );
      },
    });
  }, [props.navigation]);

  const handleDelete = async (rowMap, data) => {
      rowMap[data.index].closeRow();
      await firestore()
        .collection('products')
        .doc(selectedItem)
        .set({items: dataItems.filter((e,idx) => idx !== data.index)})
        .then((res) => console.log('res'))
        .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    const subscriber = firestore()
      .collection('products')
      .doc(selectedItem)
      .onSnapshot((documentSnapshot) => {
        setDataItems(documentSnapshot.data().items);
      });
    return () => subscriber();
  }, [selectedItem]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        style={{
          width: width,
          height: height,
          paddingBottom: height * 0.1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        source={require('../assets/images/bgg.jpeg')}>
        {dataItems && dataItems.length ? (
          <SwipeListView
            onRowDidOpen={onRowDidOpen}
            disableRightSwipe
            closeOnRowBeginSwipe
            closeOnRowOpen={false}
            data={dataItems}
            keyExtractor={(item, idx) => idx.toString()}
            renderItem={(data, rowMap) => {
              const image = data.item.image.length ? (
                <Image
                  source={{uri: data.item.image}}
                  style={{width: 100, height: 100}}
                  resizeMode="stretch"
                />
              ) : null;
              return (
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() =>
                    props.navigation.navigate('Screen4', {
                      data: selectedItem,
                      index: data.index,
                    })
                  }>
                  <View
                  onLayout={(event) => {
                    var {x, y, width, height} = event.nativeEvent.layout;
                    setHiddenLayout([...hiddenLayout,{name: data.item.name, height: height}])
                  }}
                    style={{
                      backgroundColor: 'black',
                      borderBottomLeftRadius: 40,
                      borderLeftColor: 'pink',
                      borderBottomColor: '#ff8',
                      borderLeftWidth: 10,
                      borderBottomWidth: 5,
                      borderTopLeftRadius: 40,
                      padding: 20,
                      marginTop: 20,
                      height: "auto",
                      //height: height * 0.2,
                      width: width * 0.9,
                    }}>
                      <View
                      style={{justifyContent: 'center', flexDirection: 'row'}}>
                      {data.item.image.length ? image : null}
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <View
                        style={{
                          width: '40%',
                          borderColor: '#fff',
                          borderTopWidth: 1,
                          borderRightWidth: 2,
                          borderBottomWidth: 1,
                        }}>
                        <Text
                          style={{
                            fontSize: 20,
                            padding: 10,
                            color: '#ff9',
                          }}>
                          Name :
                        </Text>
                      </View>
                      <View
                        style={{
                          borderTopWidth: 1,
                          borderLeftWidth: 2,
                          borderBottomWidth: 1,
                          justifyContent: 'center',
                          flexDirection: 'row',
                          borderColor: '#fff',
                          width: '55%',
                        }}>
                        <Text
                          style={{
                            fontWeight: 'bold',
                            padding: 10,
                            fontSize: 20,
                            color: '#fff',
                          }}>
                          {data.item.name}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 25,
                        justifyContent: 'space-between',
                      }}>
                      <View
                        style={{
                          width: '40%',
                          borderColor: '#fff',
                          borderTopWidth: 1,
                          borderRightWidth: 2,
                          borderBottomWidth: 1,
                        }}>
                        <Text style={{fontSize: 20,padding: 10, color: '#faf'}}>
                        Details:
                      </Text>
                      </View>
                      <View
                        style={{
                          borderTopWidth: 1,
                          borderLeftWidth: 2,
                          borderBottomWidth: 1,
                          justifyContent: 'center',
                          flexDirection: 'row',
                          borderColor: '#fff',
                          width: '55%',
                        }}>
                        <Text
                        style={{
                         fontSize: 20,
			                   padding: 10,
                         fontWeight: 'bold',
                          color: '#fff',
                        
                        }}>
                        {data.item.detailsOfItem}
                      </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
            renderHiddenItem={(data, rowMap) => {
              const getHeight = hiddenLayout && hiddenLayout.find((e) => e.name === data.item.name)
              return (
                <TouchableOpacity
                  style={{
                    marginTop: 20,
                    width: width * 1,
                    borderBottomLeftRadius: 40,
                    borderBottomLeftRadius: 40,
                    borderTopLeftRadius: 40,
                    height: getHeight ? getHeight.height : 200,
                    justifyContent: 'flex-end',
                    padding: 20,
                    flexDirection: 'row',
                    backgroundColor: 'transparent',
                    alignItems: 'center',
                  }}
                  onPress={() => handleDelete(rowMap, data)}>
                    <View style={{backgroundColor:'darkred',padding: 20, justifyContent:'center',height: getHeight ? getHeight.height : 200}}>

                  <Text
                    style={{
                      color: '#fff',
                      fontWeight: 'bold',
                      fontSize: 18,
                      padding: 10,
                      fontStyle: 'italic',
                    }}>
                    Delete
                  </Text>
                    </View>
                </TouchableOpacity>
              );
            }}
            leftOpenValue={75}
            rightOpenValue={-75}
          />
        ) : (
          <View
            style={{
              backgroundColor: '#000',
              //opacity: 0.5,
              padding: 30,
              width: width * 0.9,
              borderLeftColor: '#ffa',
              borderBottomLeftRadius: 20,
              borderLeftWidth: 5,
              borderBottomColor: '#f5b5f2',
              borderBottomWidth: 10,
            }}>
            <Text style={{fontSize: 25, color: '#fff', lineHeight: 40}}>
              Nothing To show, please click on '+' to add items
            </Text>
          </View>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Screen3;
