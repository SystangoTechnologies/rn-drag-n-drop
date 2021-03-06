/**
 * Sample React Native App
 * httpss://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Animated,
  Easing,
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  Platform,
} from 'react-native';
import SortableList from 'react-native-sortable-list';

const window = Dimensions.get('window');


const LeftColumnData = {
  0: {
    image: 'https://placekitten.com/200/240',
    text: 'Chloe',
  },
  1: {
    image: 'https://placekitten.com/200/201',
    text: 'Jasper',
  },
  2: {
    image: 'https://placekitten.com/200/202',
    text: 'Pepper',
  },
  3: {
    image: 'https://placekitten.com/200/203',
    text: 'Oscar',
  },
  4: {
    image: 'https://placekitten.com/200/204',
    text: 'Dusty',
  },
  5: {
    image: 'https://placekitten.com/200/205',
    text: 'Spooky',
  },
  6: {
    image: 'https://placekitten.com/200/210',
    text: 'Kiki',
  },
  7: {
    image: 'https://placekitten.com/200/215',
    text: 'Smokey',
  },
  8: {
    image: 'https://placekitten.com/200/220',
    text: 'Gizmo',
  },
  9: {
    image: 'https://placekitten.com/220/239',
    text: 'Kitty',
  },
};


const RightColumnData = {
  10: {
    image: 'https://placekitten.com/200/239',
    text: 'Kitty',
  },
  11: {
    image: 'https://placekitten.com/200/220',
    text: 'Gizmo',
  },
  12: {
    image: 'https://placekitten.com/200/210',
    text: 'Kiki',
  },
  13: {
    image: 'https://placekitten.com/200/215',
    text: 'Smokey',
  },
  14: {
    image: 'https://placekitten.com/200/201',
    text: 'Jasper',
  },
  15: {
    image: 'https://placekitten.com/200/202',
    text: 'Pepper',
  },
  16: {
    image: 'https://placekitten.com/200/203',
    text: 'Oscar',
  },
  17: {
    image: 'https://placekitten.com/200/204',
    text: 'Dusty',
  },
  18: {
    image: 'https://placekitten.com/200/240',
    text: 'Chloe',
  },
  19: {
    image: 'https://placekitten.com/220/205',
    text: 'Spooky',
  },
};


class Basic extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>React Native drag and drop item List</Text>
        <SortableList
          style={styles.list}
          contentContainerStyle={styles.contentContainer}
          leftColumnData={LeftColumnData}
          rightColumnData={RightColumnData}
          width={window.width}
          renderRow={this._renderRow}/>
      </View>
    );
  }

  _renderRow = ({data, active}) => {
    return <Row data={data} active={active} />
  }
}

class Row extends Component {

  constructor(props) {
    super(props);

    this._active = new Animated.Value(0);

    this._style = {
      ...Platform.select({
        ios: {
          transform: [{
            scale: this._active.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.1],
            }),
          }],
          shadowRadius: this._active.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 10],
          }),
        },

        android: {
          transform: [{
            scale: this._active.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.07],
            }),
          }],
          elevation: this._active.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 6],
          }),
        },
      })
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.active !== nextProps.active) {
      Animated.timing(this._active, {
        duration: 300,
        easing: Easing.bounce,
        toValue: Number(nextProps.active),
      }).start();
    }
  }

  render() {
   const {data, active} = this.props;

    return (
      <Animated.View style={[
        styles.row,
        this._style,
      ]}>
        <Image source={{uri: data.image}} style={styles.image} />
        <Text style={styles.text}>{data.text}</Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',

    ...Platform.select({
      ios: {
        paddingTop: 20,
      },
    }),
  },

  title: {
    fontSize: 20,
    paddingVertical: 20,
    color: '#999999',
  },

  list: {
    flex: 1,
  },

  contentContainer: {
    width: window.width,

    ...Platform.select({
      ios: {
        paddingHorizontal: 15,
      },

      android: {
        paddingHorizontal: 0,
      }
    })
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    height: 80,
    flex: 1,
    marginTop: 7,
    marginBottom: 12,
    borderRadius: 4,


    ...Platform.select({
      ios: {
        width: (window.width/2) - 30,
        shadowColor: 'rgba(0,0,0,0.2)',
        shadowOpacity: 1,
        shadowOffset: {height: 2, width: 2},
        shadowRadius: 2,
      },

      android: {
        width: (window.width/2) - 25,
        elevation: 0,
        marginHorizontal: 10,
      },
    })
  },

  image: {
    width: 50,
    height: 50,
    marginRight: 15,
    borderRadius: 25,
  },

  text: {
    fontSize: 20,
    color: '#222222',
  },
});

AppRegistry.registerComponent('RNDragAndDropList', () => Basic);
