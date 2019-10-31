import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Alert,
  TextInput,
  Text,
  Platform,
  TouchableOpacity,
} from 'react-native';

export default class PegawaiMain extends Component {
  static navigationOptions = {
    title: 'Data Pegawai',
  };

  constructor(props) {
    super(props);
    this.state = {
      textInput_Nama: '',
      textInput_Gaji: '',
    };
  }

  // membuat function insert data
  insertDataPegawai = () => {
    fetch('http://17.17.17.104/my-react-crud/InsertDataPegawai.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pegawai_nama: this.state.textInput_Nama,
        pegawai_gaji: this.state.textInput_Gaji,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        Alert.alert(responseJson);
      })
      .catch(error => {
        console.error(error);
      });
  };

  // membuat function lihat data
  lihatDataPegawai = () => {
    this.props.navigation.navigate('PegawaiRead');
  };

  render() {
    return (
      <View>
        <Text style={{fontSize: 20, textAling: 'center', marginBottom: 8}}>
          {' '}
          Mengisi Data Pegawai{' '}
        </Text>

        <TextInput
          placeholder="Isikan nama pegawai"
          onChangeText={TextInputValue =>
            this.setState({textInput_Nama: TextInputValue})
          }
          underlineColorAndroid="transparent"
        />

        <TextInput
          placeholder="Isikan gaji pegawai"
          onChangeText={TextInputValue =>
            this.setState({textInput_Gaji: TextInputValue})
          }
          underlineColorAndroid="transparent"
        />

        <TouchableOpacity activeOpacity={0.4} onPress={this.insertDataPegawai}>
          <Text> Simpan Data Pegawai </Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.4} onPress={this.lihatDataPegawai}>
          <Text> Lihat Data Pegawai </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
