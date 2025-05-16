import React from 'react';
import { Text, StyleSheet } from 'react-native';

export const TextBold = ({ style, children, ...props }) => (
  <Text style={[styles.bold, style]} {...props}>{children}</Text>
);

export const TextSemiBold = ({ style, children, ...props }) => (
  <Text style={[styles.semiBold, style]} {...props}>{children}</Text>
);

export const TextRegular = ({ style, children, ...props }) => (
  <Text style={[styles.regular, style]} {...props}>{children}</Text>
);

export const TextNormal = ({ style, children, ...props }) => (
  <Text style={[styles.normal, style]} {...props}>{children}</Text>
);

const styles = StyleSheet.create({
  bold: {
    fontFamily: 'Ubuntu-Bold',
  },
  semiBold: {
    fontFamily: 'Ubuntu-Medium',
  },
  regular: {
    fontFamily: 'Ubuntu-Regular',
  },
  normal: {
    fontFamily: 'Ubuntu-Light', // fallback if 'Normal' is just 'Ubuntu'
  },
});
