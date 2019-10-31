import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Alert,
  TextInput,
  Text,
  Button,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import ListView from 'deprecated-react-native-listview';

export default class PegawaiRead extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  static navigationOptions = {
    title: 'List Pegawai',
  };

  // membuat function untuk request ke server
  // menggunakan lifecycle component did mount
  componentDidMount() {
    return fetch('http://17.17.17.104/my-react-crud/LihatSemuaPegawai.php')
      .then(response => response.json())
      .then(responseJson => {
        let ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2,
        });
        this.setState(
          {
            isLoading: false,
            dataSource: ds.cloneWithRows(responseJson),
          },
          function() {
            // setState yg baru
          },
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  // membuat function untuk memetakan key json
  getPegawaiFunction = (pegawai_id, pegawai_nama, pegawai_gaji) => {
    this.props.navigation.navigate('PegawaiEdit', {
      ID: pegawai_id,
      NAMA: pegawai_nama,
      GAJI: pegawai_gaji,
    });
  };

  ListViewItemSeparator = () => {
    return (
      <View style={{height: 0.6, width: '100%', backgroundColor: '#000'}} />
    );
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View>
        <ListView
          dataSource={this.state.dataSource}
          renderSeparator={this.ListViewItemSeparator}
          renderRow={rowData => (
            <Text
              style={{
                fontSize: 20,
                paddingBottom: 10,
                paddingTop: 10,
                paddingLeft: 10,
              }}
              onPress={this.getPegawaiFunction.bind(
                this,
                rowData.pegawai_id,
                rowData.pegawai_nama,
                rowData.pegawai_gaji,
              )}>
              {rowData.pegawai_id + ' - ' + rowData.pegawai_nama}
            </Text>
          )}
        />
      </View>
    );
  }
}
