import {StyleSheet, View, Image} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-paper';

export default function InputField(props) {
  return (
    <TextInput
      theme={{roundness: 10}}
      mode="outlined"
      activeOutlineColor={'#CF3339'}
      outlineColor={'rgba(0,0,0,0.20)'}
      style={styles.InputFieldStyle}
      ref={props.innerRef}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  InputFieldStyle: {
    backgroundColor: '#FFF',
  },
});
