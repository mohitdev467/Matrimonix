import React from 'react';
import PolicyWebView from '../../components/CommonComponents/PolicyWebView';

const TermsAndConditionScreen = () => {
  const REFUND_POLICY_URL = 'https://rishtaa.online/api/v1/views/terms-conditions';
  
  return <PolicyWebView uri={REFUND_POLICY_URL} screen={'term&condition'}/>;
};

export default TermsAndConditionScreen; 