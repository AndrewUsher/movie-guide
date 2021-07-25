import React, { Component } from 'react'
import { AsyncStorage, Share, Linking, Alert, ScrollView, View, Text, Switch, TouchableOpacity } from 'react-native'

import { Feather } from '@expo/vector-icons'

import styles from './styles'

export default class ConfigurationScreen extends Component {
  state = {
    hasAdultContent: false
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.hasAdultContent !== nextState.hasAdultContent) return true
    return false
  }

  async componentDidMount() {
    try {
      const value = await AsyncStorage.getItem('@ConfigKey')
      if (value !== null) {
        const arr = JSON.parse(value)
        this.setState({
          hasAdultContent: arr.hasAdultContent
        })
      }
    } catch (error) {
      this.showError()
    }
  }

  showError = () => {
    Alert.alert('Attention', 'Something wrong has happened, please try again later.', [], { cancelable: true })
  }

  actionChangeAdultContent = async value => {
    try {
      this.setState({ hasAdultContent: value })
      await AsyncStorage.setItem('@ConfigKey', `{"hasAdultContent": ${value}}`)
    } catch (error) {
      this.showError()
    }
  }

  actionShare = () => {
    Share.share(
      {
        message: 'Learn all about movies and series \u{1F37F}',
        url: 'https://www.themoviedb.org/',
        title: 'AmoCinema'
      },
      {
        dialogTitle: 'Learn all about movies and series \u{1F37F}'
      }
    )
  }

  render() {
    const { hasAdultContent } = this.state

    return (
      <ScrollView style={styles.bgWhite}>
        <View style={styles.container}>
          <View style={styles.section}>
            <Text style={[styles.itemText, styles.sectionText]} numberOfLines={2}>
              Interface
            </Text>
            <View style={[styles.item, styles.itemNoBorder]}>
              <Text style={styles.itemText} numberOfLines={2}>
                Include adult content
              </Text>
              <Switch
                onValueChange={this.actionChangeAdultContent}
                value={hasAdultContent}
                trackColor={{ false: '#e9e9e9', true: '#47525E' }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    )
  }
}
