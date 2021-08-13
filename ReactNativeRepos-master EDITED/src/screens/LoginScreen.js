import AuthContext  from '../components/Context';
import axios from 'axios'

import React, { memo, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Alert } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import { emailValidator, passwordValidator } from '../core/utils';

const LoginScreen = ({ navigation }) => {

  const [loading, setLoading] = useState(false);

  const [data, setData] = React.useState({
    email: '',
     password: '',
     check_textInputChange: false,
     secureTextEntry: true,
     isValidUser: true,
     isValidPassword: true,
  });

  const { signIn } = React.useContext(AuthContext);

  const textInputChange = (val) => {
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

    const loginHandle = (email, password) => {
      setLoading(true)
      let user
     const getDataAxios = async () =>{
         const token = await axios.post('http://192.168.43.213:5000/api/auth/login',{
        //  const token = await axios.post('http://hamimhaji.herokuapp.com/api/auth/login',{
          email:email,
          password:password
        }).then(response => {
          return response.data.token}
          )
        .catch(err=>'error')
        // console.log(data1)
  
        if(token !=='error'){
          user = await axios.get('http://192.168.43.213:5000/api/auth/me',{
          // user = await axios.get('http://nexplex-back.herokuapp.com/api/auth/me',{
            headers: {
              Authorization: "Bearer " + token
          }
          }).then(response=>response.data)
        }
        if(user==='error'){
          return
        }
        const foundUser = {token,...user}

        if ( data.email.length == 0 || data.password.length == 0 ) {
          setLoading(false)
          setTimeout(()=>{
            Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
              {text: 'Okay'}
            ]);
          },100)
          return;
        }
        if ( foundUser.token === 'error'  ) {
          setLoading(false)
          setTimeout(()=>{
            Alert.alert('Invalid User!', 'Username or password is incorrect.', [
                {text: 'Okay'}
            ]);
          },100)  
          return;
        }
        signIn(foundUser);
      }
      getDataAxios()
    }

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate('HomeScreen')} />

      <Logo />

      <Header>ASSALAMUALAIKUM</Header>

      <TextInput
        label="Email"
        returnKeyType="next"
        // value={email.value}
        // onChangeText={text => setEmail({ value: text, error: '' })}
        onChangeText={(val) => textInputChange(val)}
        onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
        // error={!!email.error}
        // errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        // value={password.value}
        // onChangeText={text => setPassword({ value: text, error: '' })}
        onChangeText={(val) => handlePasswordChange(val)}
        // error={!!password.error}
        // errorText={password.error}
        secureTextEntry
      />

      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPasswordScreen')}
        >
          <Text style={styles.label}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>

      <Button mode="contained" onPress={() => {loginHandle( data.email, data.password )}}>
        LOGIN
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default memo(LoginScreen);
