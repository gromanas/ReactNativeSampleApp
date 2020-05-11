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
    Button,
} from 'react-native';
import { AuthContext } from '../component/context';
import {testProperties} from '../services/automation';

function LogoutScreen () {

    const { signOut } = React.useContext(AuthContext);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} {...testProperties('logout-screen', true)}>
            <Button
                title="Logout"
                onPress={() => { signOut() } }
                {...testProperties('logout-btn')}
            />
        </View>
    );
};


export default LogoutScreen;
