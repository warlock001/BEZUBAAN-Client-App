import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';

export default function MyTabBar({state, descriptors, navigation}) {
  var upValue = React.useRef(new Animated.Value(0.1)).current;
  const {sidebar} = useSelector(state => state.sidebar);

  moveUD = () => {
    Animated.timing(upValue, {
      toValue: 60,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  moveDU = () => {
    Animated.timing(upValue, {
      toValue: -24,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };
  useEffect(() => {
    sidebar ? moveUD() : moveDU();
  }, [sidebar]);
  return (
    <Animated.View
      style={{
        position: 'absolute',
        bottom: -42,
        left: 0,
        width: '100%',
        transform: [{translateY: upValue}],
        zIndex: 20,
      }}>
      <View style={{paddingHorizontal: 24, zIndex: 1}}>
        <View
          style={{
            position: 'absolute',
            bottom: 32,
            left: 24,
            zIndex: 20,
            flexDirection: 'row',
            backgroundColor: '#F4AF5F',
            width: '100%',
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#131313',
            borderRadius: 10,
            paddingHorizontal: 25,
          }}>
          {state.routes.map((route, index) => {
            const {options} = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;
            const icon = options.tabBarIcon;
            console.log(icon);
            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

            return (
              <TouchableOpacity
                key={index}
                accessibilityRole="button"
                accessibilityStates={isFocused ? ['selected'] : []}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={{
                  marginVertical: 11,
                  paddingVertical: 10,
                  borderRadius: 10,
                  width: '100%',
                  flex: 1,
                  flexDirection: 'row',
                  flexWrap: 'nowrap',
                  alignContent: 'center',
                  alignItems: 'center',
                  backgroundColor: isFocused ? '#fff' : 'transparent',
                  justifyContent: 'center',
                }}>
                {icon(isFocused)}
                {isFocused ? (
                  <Text
                    style={{
                      fontSize: 13,
                      color: '#cf3339',
                      fontWeight: '700',
                      paddingLeft: 7,
                    }}>
                    {route.name}
                  </Text>
                ) : null}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </Animated.View>
  );
}
