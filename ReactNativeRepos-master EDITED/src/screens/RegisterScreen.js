
import axios from 'axios'

import React, { memo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';

const RegisterScreen = ({ navigation }) => {

  const [loading, setLoading] = useState(false);

  const [data, setData] = React.useState({
    username:'',
    email: '',
    password: '',
    password2:'',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const textInputChange = (val) => {
    if( val.trim().length >= 4 ) {
        setData({
            ...data,
            username: val,
            check_textInputChange: true,
            isValidUser: true
        });
    } else {
        setData({
            ...data,
            username: val,
            check_textInputChange: false,
            isValidUser: false
        });
      }
    }
    const textInputChange2 = (val) => {
      if( val.trim().length >= 4 ) {
          setData({
              ...data,
              email: val,
              check_textInputChange: true,
              isValidUser: true
          });
      } else {
          setData({
              ...data,
              email: val,
              check_textInputChange: false,
              isValidUser: false
          });
        }
      }

    const handlePasswordChange = (val) => {
        if( val.trim().length >= 6 ) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }
    const handlePasswordChange2 = (val) => {
      if( val.trim().length >= 6 ) {
          setData({
              ...data,
              password2: val,
              isValidPassword: true
          });
      } else {
          setData({
              ...data,
              password2: val,
              isValidPassword: false
          });
      }
  }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const handleValidUser = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }

   //const { signIn } = React.useContext(AuthContext);

  const registerHandle = (username, email, password, password2)=>{
    setLoading(true)
    let user

    const postDataAxios = async () =>{
       console.log('herer')
        user = await axios.post('http://192.168.43.213:5000/api/user/register',{
      //user = await axios.post('http://hamimhaji.herokuapp.com/api/user/register',{
        username:username,
        email:email,
        password:password,
        passwonrd2:password2
      }).then(response =>{
         console.log(response.data)
        if(response.data[0].msg=='Success. You can log in now'){
          navigation.navigate('LoginScreen')
        }else{
          const error =response.data[0].msg
          console.log(error)
          setLoading(false)
          setTimeout(()=>{
            Alert.alert('Alert',error, {text:'Okay'})
          },1000)
        }
      }).catch( err=>'error')

      // if(user !=='error'){
      //   navigation.navigate('LoginScreen')
      // }else(console.log('There is an error'))
    }
    postDataAxios()
  }

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate('LoginScreen')} />

      <Logo />

      <Header>Create Account</Header>

      <TextInput
        label="Username"
        returnKeyType="next"
        onChangeText={(val) => textInputChange(val)}
        onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
      />

      <TextInput
        label="Email"
        returnKeyType="next"
        onChangeText={(val) => textInputChange2(val)}
        onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        onChangeText={(val) => handlePasswordChange(val)}
        secureTextEntry
      />
        <TextInput
        label="Confirm Password"
        returnKeyType="done"
        onChangeText={(val) => handlePasswordChange2(val)}
        secureTextEntry
      />

      <Button mode="contained" onPress={() => {registerHandle( data.username, data.email, data.password, data.password2 )}} style={styles.button}>
        SIGN UP
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.link}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default memo(RegisterScreen);
