import React, {useState} from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Animated,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-community/picker';

const Formulario = ({search, setSearch, setConsult}) => {
  const {country, city} = search;

  const [animationbtn] = useState(new Animated.Value(1));

  const consultWeather = () => {
    if (country.trim() === '' || city.trim() === '') {
      showAlert();
      return;
    }

    // consulting to the API
    setConsult(true);
  };

  const showAlert = () => {
    Alert.alert('Error', 'Add a city and a country to proceed', [
      {text: 'Understood'},
    ]);
  };

  const animacionEntrada = () => {
    Animated.spring(animationbtn, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const animacionSalida = () => {
    Animated.spring(animationbtn, {
      toValue: 1,
      friction: 4,
      tension: 30,
      useNativeDriver: true,
    }).start();
  };

  const animationStyle = {
    transform: [{scale: animationbtn}],
  };

  return (
    <>
      <View style={styles.formulario}>
        <View>
          <TextInput
            value={city}
            style={styles.input}
            onChangeText={(city) => setSearch({...search, city})}
            placeholder="City"
            placeholderTextColor="#666"
          />
        </View>
        <View>
          <Picker
            selectedValue={country}
            itemStyle={{height: 120, backgroundColor: '#FFF'}}
            onValueChange={(country) => setSearch({...search, country})}>
            <Picker.Item label="-- Select a country --" value="" />
            <Picker.Item label="-- United States --" value="US" />
            <Picker.Item label="-- Brasil --" value="BR" />
            <Picker.Item label="-- Spain --" value="ES" />
            <Picker.Item label="-- France --" value="FR" />
            <Picker.Item label="-- Netherlands --" value="NL" />
            <Picker.Item label="-- Italy --" value="IT" />
            <Picker.Item label="-- Germany --" value="DE" />
            <Picker.Item label="-- Portugal --" value="PT" />
          </Picker>
        </View>
        <TouchableWithoutFeedback
          onPressIn={() => animacionEntrada()}
          onPressOut={() => animacionSalida()}
          onPress={() => consultWeather()}>
          <Animated.View style={[styles.btnSearch, animationStyle]}>
            <Text style={styles.searchText}>Search Weather</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 10,
    height: 50,
    backgroundColor: '#FFF',
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  btnSearch: {
    marginTop: 50,
    backgroundColor: '#000',
    padding: 10,
    justifyContent: 'center',
  },
  searchText: {
    color: '#FFF',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default Formulario;
