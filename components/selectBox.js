import SelectDropdown from 'react-native-select-dropdown';
import {StyleSheet, View, Image} from 'react-native';
import React from 'react';

export default function SelectBox(props) {
  return (
    <SelectDropdown
      searchInputStyle={{color: 'yellow'}}
      // rowTextStyle={{textAlign: 'left'}}
      renderDropdownIcon={() => {
        <Image
          resizeMode="contain"
          style={{width: 25}}
          source={require('../images/ViewBlack.png')}
        />;
      }}
      dropdownIconPosition="left"
      buttonStyle={styles.InputFieldStyle}
      buttonTextStyle={styles.textStyle}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  InputFieldStyle: {
    backgroundColor: '#FFF',
    width: '100%',
    textAlign: 'end',
    fontSize: 12,
    borderWidth: 0.5,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
  },
  textStyle: {
    textAlign: 'left',
    color: '#777777',
    fontSize: 17,
  },
});
