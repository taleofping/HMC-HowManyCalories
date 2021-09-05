
import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  TextInput,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import storage from './firebase/Storage';
import firestore from './firebase/Firestore';
import Constants from 'expo-constants';

import * as Animatable from 'react-native-animatable';

class NewFood extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: 'https://uppic.cc/d/5BOgfap5a4vjuvqeVo32f',
      foodName: null,
      foodCal: null,
      foodUri: null,
      test: {tset1:'ok ok',
              test2:'ok ok ok',
              test3:'ok ok ok ok'},
    };
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [1, 1],
      allowsEditing: true,
      quality: 1,
    });
    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  addSuccess = (docRef) => {
    console.log(docRef.id);
    /*this.props.navigation.navigate('Food');*/
  };

  uploadSuccess = (uri) => {
    console.log('Upload Success');
    console.log(uri);
    let foodData = {
      foodName: this.state.foodName,
      foodCal: this.state.foodCal,
      foodUri: uri,
    };
    console.log(foodData);
    firestore.addFood(foodData, this.addSuccess, this.reject);
  };

  reject = (error) => {
    console.log(error);
  };

  uploadImage = () => {
    storage.uploadToFirebase(
      this.state.image,
      this.state.foodName,
      this.uploadSuccess,
      this.reject
    );
  };

  onDone = () => {
    /*if (
      this.state.image !== null &&
      this.state.foodName !== null &&
      this.state.foodCal !== null
    )
      this.uploadImage();*/
    firestore.addAccount(this.state.test, this.addSuccess, this.reject)
  };

  render(props) {
    return (
      <ImageBackground
        source={{ uri: 'https://uppic.cc/d/AjcmoyD0tPgRjxykr9S_A' }}
        style={{
          flex: 1,
          paddingTop: Constants.statusBarHeight,
          resizeMode: 'cover',
          justifyContent: 'center',
        }}>
        <Animatable.View
          animation="fadeInDown"
          delay={1000}
          style={{
            flex: 2,
            backgroundColor: '#fffffff0',
            borderBottomLeftRadius: 35,
            borderBottomRightRadius: 35,
          }}>
          <TouchableOpacity
            style={{
              flex: 1,
              margin: '5%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={this.pickImage}>
            <Image style={styles.image} source={{ uri: this.state.image }} />
          </TouchableOpacity>
        </Animatable.View>
        <View style={{ flex: 0.5 }}></View>
        <Animatable.View
          animation="fadeInUp"
          style={{
            flex: 2,
            backgroundColor: '#ffffff',
            borderTopLeftRadius: 35,
            borderTopRightRadius: 35,
          }}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#ffffff',
              borderTopLeftRadius: 35,
              borderTopRightRadius: 35,
              justifyContent: 'center',
            }}>
            <View style={styles.buttonAdd}>
              <TextInput
                placeholderTextColor="black"
                placeholder="FOOD NAME"
                style={styles.textInput}
                value={this.state.foodName}
                onChangeText={(text) => this.setState({ foodName: text })}
              />
            </View>
            <View style={styles.buttonAdd}>
              <TextInput
                placeholderTextColor="black"
                placeholder="FOOD CALORIE"
                style={styles.textInput}
                value={this.state.foodCal}
                onChangeText={(text) => this.setState({ foodCal: text })}
              />
            </View>
            <TouchableOpacity style={styles.buttonAdd} onPress={this.onDone}>
              <Text style={{ fontSize: 15, fontWeight: 'bold' }}>DONE</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonAdd}
              onPress={() => this.props.navigation.navigate('Food')}>
              <Text style={{ fontSize: 15, fontWeight: 'bold' }}>CANCEL</Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  buttonAdd: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffd05b',
    borderRadius: 25,
    margin: 8,
    flex: 1,
  },
  image: {
    width: 270,
    height: 270,
    borderRadius: 35,
  },
  textInput: {
    height: '80%',
    fontSize: 15,
    fontWeight: 'bold',
    width: '80%',
    marginLeft: '2%',
    marginRight: '2%',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default NewFood;
