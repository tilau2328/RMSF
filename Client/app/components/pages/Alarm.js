import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Connector from '../../connectors/alarms';
import { Actions } from 'react-native-router-flux';

export default class Alarm extends Component {
  constructor(props){
      super(props);
      this.connector = new Connector();
      this.state = {
        id: props.data,
        alarm: null
      };
  }

  componentWillMount() {
    this.connector.get(this.state.id)
    .then((alarm) => this.setState({ alarm }))
    .catch((err) => {
      Actions.home();
      alert('Unnable to get alarm; Error: ', err);
    });
  }

  render() {
    const alarm = this.state.alarm;
    var datetime = new Date();
    if(alarm){ datetime = new Date(alarm.date); }
    date = datetime.toISOString().slice(0,10).replace(/-/g,"/");
    time = datetime.toISOString().slice(11,16);

    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          { alarm ? alarm.name : 'Loading...' }
        </Text>
        <Text>
          { alarm ? `@${date} ${time}` : '' }
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: { paddingTop: 62 },
  title: { fontSize: 30 }
});
