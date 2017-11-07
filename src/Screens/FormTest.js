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
import moment from 'moment-timezone';

class FormTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Form",
      age: "",
      gender: "",
      fever: false,
      bitterTaste:false,
      abPain: false,
      headache: false,
      jointPain: false,
      diarrhea: false,
      vomit: false,
      musclePain: false,
      itchiness: false,
      anorexia: false,
      eyePain: false,
      skinWound: false,
      weakness: false,
      nausea: false,
      startDate: null,
      latitude: null,
      longitude: null,
    }
    this.onSubmit = this.onSubmit.bind(this);
  }
  static navigationOptions = {
    title: 'Dengue Tester',
    tabBarLabel: 'Teste'
  };
  async handleBeginDate() {
    try {
      var date = new Date();
      const {action, year, month, day} = await DatePickerAndroid.open({
        date: date,
        maxDate: date,
        mode: 'default'
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        let sendDate = moment().date(day).month(month).year(year).format('YYYY-MM-DD');
        this.setState({
          startDate: sendDate
        })
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }

  onSubmit(){
    const { navigate } = this.props.navigation;
    var latitude;
    var longitude
    navigator.geolocation.getCurrentPosition((position) => {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      var payload = {
        age: this.state.age,
        gender: this.state.gender,
        fever: this.state.fever,
        bitterTaste: this.state.bitterTaste,
        abPain: this.state.abPain,
        headache: this.state.headache,
        jointPain: this.state.jointPain,
        diarrhea: this.state.diarrhea,
        vomit: this.state.vomit,
        musclePain: this.state.musclePain,
        itchiness: this.state.itchiness,
        anorexia: this.state.anorexia,
        eyePain: this.state.eyePain,
        skinWound: this.state.skinWound,
        weakness: this.state.weakness,
        nausea: this.state.nausea,
        startDate: this.state.begin,
        latitude: latitude,
        longitude: longitude,
      }
      if (this.state.begin === '' ||  this.state.age === '') {
        console.log('error');
      }else {
        var header = new Headers({
          'Content-Type': 'application/json'
        });
        var config = {
          method: 'POST',
          headers: header,
          body: JSON.stringify(payload)
        };
        fetch('http://ec2-18-231-5-64.sa-east-1.compute.amazonaws.com:3000/reports', config)
        .then((response) => {
          return response.json();
        })
        .then((responseJson) => {
          navigate('Resultado',{reportId: responseJson.reportId});
      })
        .catch((err) => console.log(err));
      }
    });
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
            <Text style={styles.fontS}>Sexo:</Text>
            <Picker
              style={styles.defaultPicker}
              selectedValue={this.state.gender}
              onValueChange={(itemValue, itemPosition)=> this.setState({gender: itemValue})}
            >
              <Picker.Item label="Selecione" enable={false}/>
              <Picker.Item label="Masculino" value={"M"} />
              <Picker.Item label="Feminino" value={"F"} />
            </Picker>
          </View>

          <View style={styles.Grid_inline}>
            <Text style={styles.fontS}>Data de inicio </Text>
            <Text style={styles.fontS} >{this.state.startDate}</Text>
            <Button
              style={styles.defaultButton}
              title="calendario"
              onPress={() => this.handleBeginDate()}
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
            <Text style={styles.fontS}>Sente gosto amargo? </Text>
            <Switch
              onTintColor="rgb(38, 136, 92)"
              value={this.state.bitterTaste}
              onValueChange={(v) => {
                this.setState({
                  bitterTaste: v
                });
              }}
            />
          </View>

          <View style={styles.Grid_inline}>
            <Text style={styles.fontS}>ferida na pele? </Text>
            <Switch
              onTintColor="rgb(38, 136, 92)"
              value={this.state.skinWound}
              onValueChange={(v) => {
                this.setState({
                  skinWound: v
                });
              }}
            />
          </View>

          <View style={styles.Grid_inline}>
            <Text style={styles.fontS}>dor abdominal? </Text>
            <Switch
              onTintColor="rgb(38, 136, 92)"
              value={this.state.abPain}
              onValueChange={(v) => {
                this.setState({
                  abPain: v
                });
              }}
            />
          </View>
          <View style={styles.Grid_inline}>
            <Text style={styles.fontS}>dor de cabeça? </Text>
            <Switch
              onTintColor="rgb(38, 136, 92)"
              value={this.state.headache}
              onValueChange={(v) => {
                this.setState({
                  headache: v
                });
              }}
            />
          </View>

          <View style={styles.Grid_inline}>
            <Text style={styles.fontS}>dor nas articulações? </Text>
            <Switch
              onTintColor="rgb(38, 136, 92)"
              value={this.state.jointPain}
              onValueChange={(v) => {
                this.setState({
                  jointPain: v
                });
              }}
            />
          </View>

          <View style={styles.Grid_inline}>
            <Text style={styles.fontS}>diarréia ? </Text>
            <Switch
              onTintColor="rgb(38, 136, 92)"
              value={this.state.diarrhea}
              onValueChange={(v) => {
                this.setState({
                  diarrhea: v
                });
              }}
            />
          </View>

          <View style={styles.Grid_inline}>
            <Text style={styles.fontS}> vomito ? </Text>
            <Switch
              onTintColor="rgb(38, 136, 92)"
              value={this.state.vomit}
              onValueChange={(v) => {
                this.setState({
                  vomit: v
                });
              }}
            />
          </View>
          <View style={styles.Grid_inline}>
            <Text style={styles.fontS}>dor muscular? </Text>
            <Switch
              onTintColor="rgb(38, 136, 92)"
              value={this.state.musclePain}
              onValueChange={(v) => {
                this.setState({
                  musclePain: v
                });
              }}
            />
          </View>

          <View style={styles.Grid_inline}>
            <Text style={styles.fontS}>coceira ? </Text>
            <Switch
              onTintColor="rgb(38, 136, 92)"
              value={this.state.itchiness}
              onValueChange={(v) => {
                this.setState({
                  itchiness: v
                });
              }}
            />
          </View>

          <View style={styles.Grid_inline}>
            <Text style={styles.fontS}>Perda de peso significante? </Text>
            <Switch
              onTintColor="rgb(38, 136, 92)"
              value={this.state.anorexia}
              onValueChange={(v) => {
                this.setState({
                  anorexia: v
                });
              }}
            />
          </View>

          <View style={styles.Grid_inline}>
            <Text style={styles.fontS}>dor nos olhos? </Text>
            <Switch
              onTintColor="rgb(38, 136, 92)"
              value={this.state.eyePain}
              onValueChange={(v) => {
                this.setState({
                  eyePain: v
                });
              }}
            />
          </View>

          <View style={styles.Grid_inline}>
            <Text style={styles.fontS}>fraqueza? </Text>
            <Switch
              onTintColor="rgb(38, 136, 92)"
              value={this.state.weakness}
              onValueChange={(v) => {
                this.setState({
                  weakness: v
                });
              }}
            />
          </View>

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
  },
  defaultPicker: {
    width: 200,
    backgroundColor: 'rgb(255, 255, 255)',
    borderWidth: 5,
    borderColor: 'rgb(27, 134, 112)',
    borderStyle: 'solid'
  }
});
export default FormTest;
