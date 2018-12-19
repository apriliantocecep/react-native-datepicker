import React from 'react';
import { StyleSheet, Platform, Text, View, DatePickerAndroid, DatePickerIOS, Button } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chosenDate: new Date()
    }

    this.setDate = this.setDate.bind(this);
  }

  setDate(newDate) {
    this.setState({chosenDate: newDate});
    console.log('newDate', newDate);
    
  }

  render() {
    return (
      <View style={styles.container}>
        {Platform.OS === 'android' && <Button 
          title="Open Date"
          onPress={this.handleOpenDatePickerAndroidAsync}
        />}

        {Platform.OS === 'ios' && <DatePickerIOS 
          date={this.state.chosenDate}
          onDateChange={this.setDate}
          mode="date"
        />}
      </View>
    );
  }

  handleOpenDatePickerAndroidAsync = async () => {
    try {
      const options = {
        // Month 0 is January.
        date: this.state.chosenDate,
        mode: 'calendar'
      }
      const datePicker = await DatePickerAndroid.open(options);

      const { action, year, month, day  } = datePicker;
      if (action !== DatePickerAndroid.dismissedAction) {
        console.log('year ', year);
        console.log('month ', month);
        console.log('day ', day);
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker ', message);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },
});
