import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import SpacesList from './webex/SpacesList';

import testData from './testData.json';
export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSpace: testData[0].id
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(space) {
    this.setState({activeSpace: space});
  }

  render() {
    return (
      <View style={styles.container}>
        <SpacesList
          activeSpaceId={this.state.activeSpace}
          onClick={this.handleClick}
          spaces={testData}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 100
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
