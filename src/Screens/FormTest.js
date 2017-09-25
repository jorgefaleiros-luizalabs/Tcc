import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Picker,
  Slider,
  Switch,
  Button,
  ScrollView,
  DatePickerAndroid,
  TouchableHighlight
} from 'react-native';

class FormTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Form",
      age: '',
      fever: false,
      medico: false,
      nausea: false,
      tontura: false,
      mancha: false,
      dignostico: false,
      doenca: '',
      end: '',
      begin: '',
    }
    this.onSubmit = this.onSubmit.bind(this);
  }
  static navigationOptions = {
    title: 'Dengue Tester',
    tabBarLabel: 'Teste'
  };
  async handleBeginDate() {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        date: new Date()
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        this.setState({
          begin: day+'/'+month+'/'+year
        })
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }
  async handleEndDate() {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        minDate: new Date(this.state.begin),
        date: new Date()
      });

      if (action !== DatePickerAndroid.dismissedAction) {
        this.setState({
          end: day+'/'+month+'/'+year
        })
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }
  onSubmit(){
    const { navigate } = this.props.navigation;
    var body = {
      idade: this.state.age,
      febre: this.state.fever,
      medico: this.state.medico,
      nausea: this.state.nausea,
      tontura: this.state.tontura,
      mancha: this.state.mancha,
      dignostico: this.state.dignostico,
      doenca: this.state.doenca,
      start: this.state.end,
      finish: this.state.begin,
    }
    if (this.state.begin === '' || this.state.end === '' || this.state.age === '') {
      console.log('error');
    }else {
      console.log('ok');
      navigate('Resultado');
    }
  }
  render() {
    let hasDiagnostic = this.state.medico
    return (
      <ScrollView style= {styles.Grid_1}>
        <View style= {styles.Grid_title}>
          <Text style={styles.fontG}>Formulario de doenças</Text>
        </View>
        <View style= {styles.Grid_5}>
          <View style={styles.Grid_inline}>
            <Text style={styles.fontS}>Idade: </Text>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems:'center'}}>
              <TextInput
                style={styles.age}
                keyboardType='numeric'
                onChangeText={(text) => {this.setState({age: text})}}
              />
              <Text style={styles.fontS}>Anos</Text>
            </View>
          </View>

          <View style={styles.Grid_inline}>
            <Text style={styles.fontS}>Data de inicio </Text>
            <Text style={styles.fontS} >{this.state.begin}</Text>
            <Button
              style={styles.defaultButton}
              title="calendario"
              onPress={() => this.handleBeginDate()}
              color= 'rgb(27, 134, 112)'
            />
          </View>

          <View style={styles.Grid_inline}>
            <Text style={styles.fontS}>Data de termino </Text>
            <Text style={styles.fontS}>{this.state.end}</Text>
            <Button
              style={styles.defaultButton}
              title="calendario"
              onPress={() => this.handleEndDate()}
              color= 'rgb(27, 134, 112)'
            />
          </View>
          <View style={styles.Grid_inline}>
            <Text style={styles.fontS}>Sente febre? </Text>
            <Switch
              onTintColor="rgb(38, 136, 92)"
              value={this.state.fever}
              onValueChange={(v) => {
                this.setState({
                  fever: v
                });
              }}
            />
          </View>

          <View style={styles.Grid_inline}>
            <Text style={styles.fontS}>Sente nausea? </Text>
            <Switch
              onTintColor="rgb(38, 136, 92)"
              value={this.state.nausea}
              onValueChange={(v) => {
                this.setState({
                  nausea: v
                });
              }}
            />
          </View>

          <View style={styles.Grid_inline}>
            <Text style={styles.fontS}>Sente tontura? </Text>
            <Switch
              onTintColor="rgb(38, 136, 92)"
              value={this.state.tontura}
              onValueChange={(v) => {
                this.setState({
                  tontura: v
                });
              }}
            />
          </View>

          <View style={styles.Grid_inline}>
            <Text style={styles.fontS}>Possui manchas na pele? </Text>
            <Switch
              onTintColor="rgb(38, 136, 92)"
              value={this.state.manchas}
              onValueChange={(v) => {
                this.setState({
                  manchas: v
                });
              }}
            />
          </View>

          <View style={styles.Grid_inline}>
            <Text style={styles.fontS}>Ja foi diagnosticado por um medico? </Text>
            <Switch
              onTintColor="rgb(38, 136, 92)"
              value={this.state.medico}
              onValueChange={(v) => {
                this.setState({
                  medico: v
                });
              }}
            />
          </View>

          {hasDiagnostic ? (
            <TextInput
              placeholder="Qual sua doença?"
              value={this.state.doenca}
              onChange={(v) => {
                this.setState({
                  doenca: v
                });
              }}/>
          ) :
            null
          }
          <View style={styles.Grid_submit}>
            <TouchableHighlight
              style={styles.defaultButton}
              onPress={() => {this.onSubmit()}}
            >
              <Text style={{textAlign: 'center', fontSize: 28, color: '#FFF'}}>Enviar</Text>
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  Grid_title: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  fontG: {
      fontSize: 28
  },
  fontM: {
    fontSize: 20
  },
  fontS: {
    fontSize: 16
  },
  age: {
    width: 70,
    fontSize: 20
  },
  Grid_1: {
    flex: 1,
  },
  Grid_5: {
    flex: 5,

  },
  Grid_inline: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 15,
    marginRight: 10,
    marginLeft: 10
  },
  Grid_colunm: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: 15
  },
  Grid_submit: {
    alignItems: 'flex-end',
    marginRight: 10
  },
  defaultButton: {
    width: 300,
    alignSelf: 'center',
    backgroundColor: 'rgb(27, 134, 112)',
    height: 50
  }
});
export default FormTest;
