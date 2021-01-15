import React, {useLayoutEffect, useContext} from 'react';
import firestore from '@react-native-firebase/firestore';
import {Spinner} from 'native-base';

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
  const [docItems, setDocItems] = React.useState([]);
  const [sizeOfDocument, setSizeOfDocument] = React.useState(0);
  const [kData, setKData] = React.useState([]);
  const [hiddenLayout, setHiddenLayout] = React.useState([]);
  const openRowRefs = [];

  const onRowDidOpen = (rowKey, rowMap) => {
    openRowRefs.push(rowMap[rowKey]);
  };

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: 'All Details',
      headerTitleAlign: 'center',
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#212026',
      },
    });
  }, [props.navigation]);

  const handleDelete = async (rowMap, data) => {
    // console.log(rowMap, data)
    rowMap[data.index].closeRow();
    console.log(data.item.doc, data.index);
    // dataItems.splice(dataItems[data.index], 1);
    // setDataItems(dataItems);
    // await firestore()
    //   .collection('products')
    //   .doc(selectedItem)
    //   .set({items: dataItems})
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    let docItem = [];
    firestore()
      .collection('products')
      .get()
      .then((querySnapshot) => {
        console.log(querySnapshot.size, 'size...');
        // setSizeOfDocument(querySnapshot.size)
        let itemDoc = [];
        querySnapshot.forEach((documentSnapshot) => {
          if (
            documentSnapshot.data() &&
            documentSnapshot.data().items &&
            documentSnapshot.data().items.length
          ) {
            itemDoc.push({
              id: documentSnapshot.id,
              doc: documentSnapshot.data(),
            });

            docItem = {id: documentSnapshot.id, doc: documentSnapshot.data()};
          }
        });
        setDocItems(itemDoc);
      });
  }, []);

  // React.useEffect(() => {
  //   console.log("rendered")

  //   // console.log(docItems,'tidls.s')
  //   const mData = docItems.length && docItems.map((e) => e.doc.items.map((entity) => ({'doc': e.id, "item": entity}) ))
  //   const abc = mData.length && mData.map(e => e[0])
  //   setKData(abc)
  //   // console.log(kData,'mdata')
  // }, [docItems])

  // console.log(docItems)
  const mData =
    docItems.length &&
    docItems.map((e) =>
      e.doc.items.map((entity) => ({doc: e.id, item: entity})),
    );
  const abc = mData.length && mData.map((e) => e[0]);
  let mArray = [];
  const k = mData.length && mData.map((e) => e.map((e) => mArray.push(e)));
  //  console.log(mArray,'abc')
  //  console.log( abc && abc,'acbcd')
  // console.log(sizeOfDocument,'sizeofdoc')
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
        {docItems && docItems.length ? (
          <SwipeListView
            onRowDidOpen={onRowDidOpen}
            disableRightSwipe
            closeOnRowBeginSwipe
            closeOnRowOpen={false}
            disableLeftSwipe
            data={mArray}
            keyExtractor={(item, idx) => idx.toString()}
            renderItem={(data, rowMap) => {
              const image = data.item.item.image.length ? (
                <Image
                  source={{uri: data.item.item.image}}
                  style={{width: 100, height: 100}}
                  resizeMode="stretch"
                />
              ) : null;
              return (
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    firestore()
                      .collection('products')
                      .doc(data.item.doc)
                      .onSnapshot((documentSnapshot) => {
                        props.navigation.navigate('Screen4', {
                          data: data.item.doc,
                          index: documentSnapshot
                            .data()
                            .items.findIndex(
                              (e) => e.name === data.item.item.name,
                            ),
                          isAll: true,
                        });
                      });
                  }}>
                  <View
                    onLayout={(event) => {
                      var {x, y, width, height} = event.nativeEvent.layout;
                      // console.log(x,y, width, height, data.item.name)
                      setHiddenLayout([
                        ...hiddenLayout,
                        {name: data.item.item.name, height: height},
                      ]);
                    }}
                    style={{
                      backgroundColor: '#111',
                      borderBottomLeftRadius: 40,
                      borderLeftColor: 'pink',
                      borderBottomColor: '#ff8',
                      borderLeftWidth: 10,
                      borderBottomWidth: 5,
                      borderTopLeftRadius: 40,
                      padding: 20,
                      marginTop: 20,
                      height: 'auto',
                      width: width * 0.9,
                    }}>
                    <View
                      style={{justifyContent: 'center', flexDirection: 'row'}}>
                      {data.item.item.image.length ? image : null}
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
                          style={{fontSize: 20, padding: 10, color: '#faf'}}>
                          Name:
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
                          {data.item.item.name}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        marginTop: 30,
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
                          style={{fontSize: 20, padding: 10, color: '#faf'}}>
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
                          {data.item.item.detailsOfItem}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
            renderHiddenItem={(data, rowMap) => {
              const getHeight =
                hiddenLayout &&
                hiddenLayout.find((e) => e.name === data.item.item.name);
              return (
                <TouchableOpacity
                  style={{
                    marginTop: 20,
                    width: width * 0.9,
                    borderBottomLeftRadius: 40,
                    borderTopLeftRadius: 40,
                    height: getHeight ? getHeight.height : 200,
                    justifyContent: 'flex-end',
                    padding: 20,
                    flexDirection: 'row',
                    backgroundColor: 'darkred',
                    alignItems: 'center',
                  }}
                  onPress={() => handleDelete(rowMap, data)}>
                  <Text
                    style={{
                      color: '#fff',
                      fontWeight: 'bold',
                      fontSize: 18,
                      fontStyle: 'italic',
                    }}>
                    Delete
                  </Text>
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
              opacity: 0.5,
              padding: 30,
              width: width * 0.9,
              borderLeftColor: '#ffa',
              borderBottomLeftRadius: 20,
              borderLeftWidth: 5,
              borderBottomColor: '#f5b5f2',
              borderBottomWidth: 10,
            }}>
            <Spinner />
            <Text style={{fontSize: 25, color: '#fff', lineHeight: 40}}>
              Wait untill fetching data...
            </Text>
          </View>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Screen3;
