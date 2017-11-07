import React, {Component} from 'react'
import {View, Text, StyleSheet, Button, Image} from 'react-native'

class Home extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    headerStyle: {
        backgroundColor: 'rgba(183, 237, 154, 0.8)'
    },
    headerTitle: 'Teste de Dengue',
    headerTitleStyle: {
      textAlign: 'center'
    }
  };
  nextPage(){
    const { navigate } = this.props.navigation
    navigate('Teste');
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source = {require('../static/mosquito.png')}
          style = {styles.logo}
        />
        <Text style={styles.textTitle}>
          Bem Vindo!
        </Text>
        <Text style={styles.textBody}>
          Olá, este é um aplicativo feito para te ajudar a identificar se você esta
          com dengue, mas lembre-se este aplicativo somente trás uma estimativa e
          não tem o objetivo de substituir um diagnostico médico, em caso voce esteja doente
          va a algum medico ou hospital para receber um diagnostico profissional.
        </Text>
        <Button
          title= 'Começar'
          accessibilityLabel="Learn more about this purple button"
          onPress = {() => this.nextPage()}
          color = 'rgba(60, 108, 52, 1)'
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(183, 237, 154, 0.3)',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent:'center'
  },
  textBody:{
    fontSize: 16,
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 10,
    textAlign: 'center'
  },
  textTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  logo: {
    width: 120,
    height: 120
  }
});
export default Home;
