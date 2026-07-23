export const URLS = {
  login: '/api/v1/student/login/',
  register: 'api/v1/auth/student/register/',
  studentProfile: '/api/v1/auth/student/profile/',
  teacherProfile: '/api/v1/auth/teacher/profile/',
  olimpiadaQuizList: '/api/v1/quiz/sciences/list/',
  quizTest: '/api/v1/quiz/quizzes/',
  submitAnswers: '/api/v1/quiz/submit-quiz-result/',
  recieveCode: '/api/v1/student/verify-sms/',
  resultQuiz: '/api/v1/quiz/result/list/',
  resendSMSCode: '/api/v1/student/resend-sms-code/',
  forgetPassword: '/api/v1/auth/student/forgot-password/',
  newPassword: 'api/v1/auth/student/reset-password/',
  registerDate: '/api/v1/student/register_date/',
  resendSMSCodeForget: '/api/v1/auth/student/verify-sms-code/',
  faqs: '/faqs/',
  networkings: '/networking/',
  documents: '/olimpiada-about/',
  ofertas: '/api/v1/nizom/',
  banner: '/banner/',
  beforeReminder: '/before_test_reminder/',
  afterReminder: '/after_test_reminder/',
  schoolClasses: '/api/v1/func_teacher/subject-list/',
  schoolClasses: '/api/v1/func_teacher/subject-list/',
  studentSubjects: '/api/v1/func_student/my-subjects/',
  teacherSubjects: '/api/v1/func_teacher/my-subjects/',
  subjectNameList: '/api/v1/func_student/subject/name-list/',
  teacherStudents: '/api/v1/func_teacher/my-students/',
  teacherGroups: '/api/v1/func_teacher/my-groups/',
  downloadCertificate: '/api/v1/func_student/certificate/download/',
  // Student list endpoints
  studentList: '/api/v1/auth/student/student_list/',
  studentWeeklyStudyStats: '/api/v1/func_student/student/weklystudystats/app',
  studentStudyStatsByDate: '/api/v1/func_student/student/studystats-by-date/app',
  beginTest: '/api/v1/func_student/my-generate-test/',
  checkMyResults: '/api/v1/func_student/my-generate-check-answer/',
  studentChapters: '/api/v1/func_student/my-chapter/',
  studentTopics: '/api/v1/func_student/my-topic/',
  studentQuestions: '/api/v1/func_student/my-question/',
  studentCheckAnswer: '/api/v1/func_student/my-check-answer/',
  coins: '/api/v1/func_student/my-score/',
  ballCoinsHistory: '/api/v1/func_student/my-score-log/',
  teacherCoins: '/api/v1/func_teacher/my-score/',
  subscription: '/api/v1/payments/subscription/trial_days/',
  advisedTopics: '/api/v1/func_student/my-diagnost-detail/',
  levelStatistics: '/api/v1/func_student/my-diagnost-level/',
  profileUpdate: '/api/v1/auth/student/profile-update/',
  teacherProfileUpdate: '/api/v1/auth/teacher/profile-update/',
  // Teacher reward URLs
  teacherReward: '/api/v1/func_teacher/teacher/reward/',
  teacherRewardList: '/api/v1/func_teacher/teacher/reward/list/',
  changePassword: '/api/v1/auth/student/change-password/',
  // New profile update APIs
  updateProfile: '/api/v1/auth/user/update-profile/',
  changePasswordNew: '/api/v1/auth/user/change-password/',
  verifyPhoneChange: '/api/v1/auth/user/verify-phone-change/',
  // Tutor coupon URLs
  diagnosticsTopics: '/api/v1/func_student/my-diagnost-topic-detail/',
  recommendations: '/api/v1/func_student/my-diagnost-subjects/',
  refreshToken: '/api/v1/auth/token/refresh/',
  // Parent management endpoints
  parentCreate: '/api/v1/auth/parent/create/',
  parentProfile: '/api/v1/auth/parent/profile/',
  parentProfileUpdate: '/api/v1/auth/parent/profile-update/',
  systemSettings: '/api/v1/management/system-settings/',
  systemFaqs: '/api/v1/management/faqs/',
  systemBanner: '/api/v1/management/banner/',
  sendMentor: '/api/v1/func_student/my-unsolved-question/create/',
  statistics: '/api/v1/management/statistics/',
  studentStatistics: 'api/v1/func_student/student-statistics/',
  universalStatistics: 'api/v1/universal/statistics/',
  studentTop: '/api/v1/func_student/student/studenttop/app',
  studentSubjectChapters: '/api/v1/func_student/students/',
  // Drag & Drop API endpoints
  reorderSubjects: '/api/v1/func_teacher/subjects/reorder/',
  reorderChapters: '/api/v1/func_teacher/chapters/reorder/',
  reorderTopics: '/api/v1/func_teacher/topics/reorder/',

  // Mentor project subject endpoints
  chapters: '/api/v1/func_teacher/my-chapters/list/',
  createChapter: '/api/v1/func_teacher/my-chapters/create/',
  updateChapter: '/api/v1/func_teacher/my-chapters/list/',
  deleteChapter: '/api/v1/func_teacher/my-chapters/list/',
  topics: '/api/v1/func_teacher/my-topics/list/',
  createTopic: '/api/v1/func_teacher/my-topics/create/',
  updateTopic: '/api/v1/func_teacher/my-topics/list/',
  deleteTopic: '/api/v1/func_teacher/my-topics/list/',
  questionList: '/api/v1/func_teacher/my-question/list/',
  createQuestion: '/api/v1/func_teacher/my-question/create/',
  updateQuestion: '/api/v1/func_teacher/my-question/update/',
  deleteQuestion: '/api/v1/func_teacher/my-question/delete/',
  importExcel: '/api/v1/func_teacher/xlsx-import/',

  // Friends API endpoints
  friends: '/api/v1/func_student/friends/',
  friendInvites: '/api/v1/func_student/friend-invites/',
  sendFriendInvite: '/api/v1/func_student/send-friend-invite/',
  acceptFriendInvite: '/api/v1/func_student/accept-friend-invite/',
  rejectFriendInvite: '/api/v1/func_student/reject-friend-invite/',
  removeFriend: '/api/v1/func_student/remove-friend/',
  generateInviteLink: '/api/v1/func_student/generate-invite-link/',
  myReferrals: '/api/v1/tutor/tutor/referral-transactions/',
  myCuponers: '/api/v1/tutor/tutor/coupons/',
  products: '/api/v1/management/products/',
  exchangeProduct: '/api/v1/func_student/my-products/exchange/',
  purchasedProducts: '/api/v1/func_student/my-products/exchange/list/',
  productsExchangeList: '/api/v1/func_teacher/teacher/product-exchange-list/',
  checkCoupon: '/api/v1/payments/check-coupon/',
  paymentPlans: '/api/v1/payments/plans/',

  // Mentor requests endpoints
  mentorRequestsList: '/api/v1/func_student/my-unsolved-question/list/',

  // Tutor referrals endpoints
  tutorCoupons: '/api/v1/tutor/tutor/coupon-transactions/',
  tutorReferrals: '/api/v1/tutor/tutor/referral-transactions/',
  chatUnreadTotal: '/api/v1/func_chat/chats/unread-total/',
  newsTotal: '/api/v1/management/app/elon-list/',

  //transform

  studentById: '/api/v1/student/by-identification/',
  transferConfirm: '/api/v1/student/som-transfer/confirm/ ',
  transferHistory: '/api/v1/student/som-transfer/history/',
  transferRequest: '/api/v1/student/som-transfer/request/',

  // Library endpoints
  libraryBooks: '/api/v1/book/my-books/',
  libraryCategories: '/api/v1/book/categories/',
  libraryTags: '/api/v1/book/tags/',

  //book-purchase
  bookMyPurchases: '/api/v1/book/my-purchases/',

  // student

  teacherFine: '/api/v1/func_teacher/teacher/fine/',

  // Landing (reklama) sahifasi lead formasi.
  // TODO: backend tayyor bo'lganda shu manzilni almashtiring.
  leadCreate: '/api/v1/lead/'
}
