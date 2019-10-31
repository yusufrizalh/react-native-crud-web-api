import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Alert,
  TextInput,
  Button,
  Text,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import ListView from 'deprecated-react-native-listview';

export default class PegawaiEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textInput_ID: '',
      textInput_Nama: '',
      textInput_Gaji: '',
    };
  }

  static navigationOptions = {
    title: 'Edit Pegawai',
  };

  componentDidMount() {
    // membaca informasi dari pegawairead
    this.setState({
      textInput_ID: this.props.navigation.state.params.ID,
      textInput_Nama: this.props.navigation.state.params.NAMA,
      textInput_Gaji: this.props.navigation.state.params.GAJI,
    });
  }

  // function untuk proses ubah data pegawai
  updateDataPegawai = () => {
    fetch('http://17.17.17.104/my-react-crud/UpdateDataPegawai.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pegawai_id: this.state.textInput_ID,
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
    // redirect kembal ke pegawai main
    this.props.navigation.navigate('PegawaiMain');
  };

  // membuat function untuk menghapus data pegawai
  deleteDataPegawai = () => {
    fetch('http://17.17.17.104/my-react-crud/HapusDataPegawai.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pegawai_id: this.state.textInput_ID,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        Alert.alert(responseJson);
      })
      .catch(error => {
        console.error(error);
      });
    // redirect kembal ke pegawai main
    this.props.navigation.navigate('PegawaiMain');
  };

  render() {
    return (
      <View>
        <Text style={{fontSize: 20, alignText: 'center', marginBottom: 10}}>
          {' '}
          Edit Data Pegawai
        </Text>

        <TextInput
          placeholder="Tuliskan Nama Pegawai"
          value={this.state.textInput_Nama}
          onChangeText={TextInputValue =>
            this.setState({textInput_Nama: TextInputValue})
          }
        />

        <TextInput
          placeholder="Tuliskan Gaji Pegawai"
          value={this.state.textInput_Gaji}
          onChangeText={TextInputValue =>
            this.setState({textInput_Gaji: TextInputValue})
          }
        />

        <TouchableOpacity activeOpacity={0.5} onPress={this.updateDataPegawai}>
          <Text>Ubah Data Pegawai</Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.5} onPress={this.deleteDataPegawai}>
          <Text>Hapus Data Pegawai</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
