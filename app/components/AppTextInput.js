import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import defaultStyles from '../config/styles';


function AppTextInput({ icon, width='100%', ...otherProps }) {
        return (
        <View style={[styles.container, {width}]}>
            {icon && <MaterialCommunityIcons name={icon} size={20} color={defaultStyles.colors.medium} style={styles.icon} />}
            <TextInput placeholderTextColor={defaultStyles.colors.medium} style={[defaultStyles.text, styles.text]} {...otherProps} />
        </View>                
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: defaultStyles.colors.light,
        borderRadius: 25,
        flexDirection: 'row',
        width: '100%',
        padding: 15,
        marginVertical: 10,
        alignItems: 'center',
    },
    icon:{
        marginRight: 10,
    },
    text:{
        flex: 1,
    }
})

export default AppTextInput;