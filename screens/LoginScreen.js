/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    Button,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { AuthContext } from '../component/context'
import TouchID from "react-native-touch-id";

function LoginScreen(){

    const [data, setData] = React.useState({
        username:'',
        password:'',
        check_textInputChange: false,
        secureTextEntry: true
    });

    const { signIn } = React.useContext(AuthContext);

    const textInputChange = (val) => {
        if(val.length !== 0){
            setData({
                ...data,
                username: val,
                check_textInputChange: true
            });
        }else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false
            });
        }
    };

    const handlePasswordChange =(val) =>{
        setData({
            ...data,
            password: val
        })
    };

    const updateSecureTextEntry = () =>{
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
            })
    };

    const loginHandle = (username, password) => {
        signIn(username, password);
    };



    function componentDidMount() {
        TouchID.isSupported()
            .then(biometryType => {
                this.setState({ biometryType });
            })
    }

    TouchID.authenticate('Authenticate with fingerprint') // Show the Touch ID prompt
        .then(success => {
            // Touch ID authentication was successful!
            // Handle the successs case now
            loginHandle('user', 'pass');
        })
        .catch(error => {
            // Touch ID Authentication failed (or there was an error)!
            // Also triggered if the user cancels the Touch ID prompt
            // On iOS and some Android versions, `error.message` will tell you what went wrong
        });


    TouchID.isSupported()
        .then(biometryType => {
            if (biometryType === 'TouchID') {
                // Touch ID is supported on iOS
            } else if (biometryType === 'FaceID') {
                // Face ID is supported on iOS
            } else if (biometryType === true) {
                // Touch ID is supported on Android
            }
        })
        .catch(error => {
            // User's device does not support Touch ID (or Face ID)
            // This case is also triggered if users have not enabled Touch ID on their device
        });

    return (
        <View>
            <View style={styles.header}>
                <Text style={styles.text_header}/>
            </View>
            <View>
                <Text style={styles.text_footer}>Email</Text>
                <View style={styles.action}>
                    <FontAwesome
                        style={{marginLeft: 100}}
                        name="user-o"
                        color="#05375a"
                        size={16}
                     />
                     <TextInput
                         placeholder="Your Email"
                         style={styles.textInput}
                         autoCapitalize="none"
                         onChangeText={(val)=> textInputChange(val)}
                     />
                    {data.check_textInputChange ?
                      <Feather
                         style={{marginLeft: 50}}
                         name="check-circle"
                         color="green"
                         size={16}
                      />
                    : null}
                </View>
                <View>
                    <Text style={[styles.text_footer,
                        {marginTop:35}]} >Password</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            style={{marginLeft: 100}}
                            name="lock"
                            color="#05375a"
                            size={16}
                        />
                        <TextInput
                            placeholder="Your Password"
                            style={styles.textInput}
                            secureTextEntry={data.secureTextEntry}
                            autoCapitalize="none"
                            onChangeText={(val)=> handlePasswordChange(val)}
                        />
                        {data.secureTextEntry ?
                            <Feather
                                onPress={updateSecureTextEntry}
                                style={{marginLeft: 50, marginRight: 10}}
                                name="eye-off"
                                color="grey"
                                size={16}
                            /> :
                            <Feather
                                onPress={updateSecureTextEntry}
                                style={{marginLeft: 50, marginRight: 10}}
                                name="eye"
                                color="grey"
                                size={16}
                            />
                        }
                    </View>
                    <View style={styles.button}>
                        <Button
                            title="Log in"
                            onPress={ ()=>{loginHandle(data.username, data.password)} }
                        />
                    </View>
             </View>
           </View>
        </View>
    );
};


export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18,
        paddingLeft: 40,
        marginLeft: 40,
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        alignItems: 'center',
        marginTop: Platform.OS === 'ios' ? 0 : -10,
        paddingLeft: 40,
        color: '#05375a',
        marginLeft: 10,
        marginRight: 40,
        fontSize: 16,
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50,
        height: 30,
        marginRight: 60,
        marginLeft: 60
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});

