export const apiEndpoints = {
  signupUser: "admin/add-user",
  getUsers: "admin/users",
  getFilterUsers: "user/filter-users",
  getAllCastes:"admin/caste",
  getAllOccupations:"admin/occupation",
  getAllLanguages:"admin/language",
  getAllCities:"admin/cities",
  getAllStates:"admin/states",
  deleteRequest: `admin/delete-request`,


  forgotPassword: "admin/request-password-reset",
  updatePassword: (token) => `admin/reset-password/${token}`,
  getStatsData: (userId) => `admin/stats-data/${userId}`,
  addUserIntoShortlist: "admin/shortlisted",
  getMatchedUsers: (id) => `admin/matched/user/${id}`,
  getUserById:(id)=>       `admin/users/${id}`,
  getPaymentHistory: (userId) => `user/payment/history/${userId}`,
  checkPaymentStatus: (orderId) => `user/status/${orderId}`,
  deletePaymentHistory : (userId, paymentId)=>`user/payment/history/${userId}/${paymentId}`,
  getNews: "admin/news",
  getServiceProviders: "admin/service-providers",
  uploadFile: "admin/upload",
  loginUser: "user/login",
  getConversation: (userId) => `user/conversations/${userId}`,
  getMessageById: (id) => `user/messages/${id}`,
  createConversation: `user/conversations`,
  createMessagesEndPoint: `user/messages`,
  getEntities: `admin/entities`,
  getPackages: `admin/packages`,
  getRecentUserById: (email, gender) =>
    `user/recent-users?email=${email}&gender=${gender}`,
  getSendMessage: "/send-notification"
};
