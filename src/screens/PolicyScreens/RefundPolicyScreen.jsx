import React from 'react';
import PolicyWebView from '../../components/CommonComponents/PolicyWebView';

const RefundPolicyScreen = () => {
  const REFUND_POLICY_URL = 'http://143.110.243.199/api/v1/views/refund-policy';

  return <PolicyWebView uri={REFUND_POLICY_URL} screen={'refund'}/>;
};

export default RefundPolicyScreen; 