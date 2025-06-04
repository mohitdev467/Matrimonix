import React from 'react';
import PolicyWebView from '../../components/CommonComponents/PolicyWebView';

const PrivacyPolicyScreen = () => {
  // Replace this URL with your actual privacy policy URL
  const PRIVACY_POLICY_URL = 'http://143.110.243.199/api/v1/views/privacy-policy';
  
  return <PolicyWebView uri={PRIVACY_POLICY_URL} screen={'Privacy'}/>;
};

export default PrivacyPolicyScreen; 