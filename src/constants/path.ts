export const PATH = {
  ROOT: '/',
  SIGN_IN: '/signin',
  SIGN_FIND_ID: '/signin/find/id',
  SIGN_FIND_PW: '/signin/find/pw',
  SIGN_UP: '/signup',
  SIGN_UP_TYPE: (type = ':type') => `/signup/step/${type}`,
  SIGN_UP_FORM: (type = ':type') => `/signup/step/${type}/form`,
  SIGN_UP_DONE: (type = ':type') => `/signup/step/${type}/done`,
  STRATEGIES_LIST: '/strategies',
  TRADERS: '/strategies/traders',
  STRATEGIES_DETAIL: (strategyId = ':strategyId') =>
    `/strategies/${strategyId}`,
  STRATEGIES_DETAIL_DAILY: (strategyId = ':strategyId') =>
    `/strategies/${strategyId}/daily`,
  STRATEGIES_DETAIL_MONTHLY: (strategyId = ':strategyId') =>
    `/strategies/${strategyId}/monthly`,
  STRATEGIES_DETAIL_ACCOUNT: (strategyId = ':strategyId') =>
    `/strategies/${strategyId}/account`,
  ADD_QNA: (strategyId = ':strategyId') => `/strategies/${strategyId}/qna/add`,
  TRADER_STRATEGIES: (userId = ':userId') => `/strategies/traders/${userId}`,
  STRATEGIES_ADD: '/strategies/add',
  STRATEGIES_QNA: (strategyId = ':strategyId') =>
    `/strategies/${strategyId}/qna`,
  MYPAGE: '/mypage',
  MYPAGE_PROFILE: (userId = ':userId') => `/mypage/${userId}/profile`,
  MYPAGE_PROFILE_EDIT: (userId = ':userId') => `/mypage/${userId}/profile/edit`,
  MYPAGE_PASSWORD: (userId = ':userId') => `/mypage/${userId}/password`,
  MYPAGE_OPT: (userId = ':userId') => `/mypage/${userId}/opt`,
  MYPAGE_QNA: (userId = ':userId') => `/mypage/${userId}/qna`,
  MYPAGE_QNA_DETAIL: (userId = ':userId', qnaId = ':qnaId') =>
    `/mypage/${userId}/qna/${qnaId}`,
  MYPAGE_QNA_ANSWER: (userId = ':userId', qnaId = ':qnaId') =>
    `/mypage/${userId}/qna/${qnaId}/answer`,
  MYPAGE_QNA_EDIT: (qnaId = ':qnaId') => `/mypage/qna/${qnaId}/edit`,
  MYPAGE_STRATEGIES_EDIT: (strategyId = ':strategyId') =>
    `/mypage/strategies/${strategyId}`,
  MYPAGE_CHECK: '/mypage/check',
  MYPAGE_WITHDRAW: '/mypage/withdraw',
  ADMIN: '/admin',
  ADMIN_NOTICES: '/admin/notices',
  ADMIN_NOTICES_ADD: '/admin/notices/add',
  ADMIN_NOTICES_EDIT: (noticeId = ':noticeId') =>
    `/admin/notices/${noticeId}/edit`,
  ADMIN_STRATEGIES: '/admin/strategies',
  ADMIN_METHODS: '/admin/strategies/methods',
  ADMIN_STOCKS: '/admin/strategies/stocks',
  ADMIN_QNA: '/admin/qna',
  NOTICES: '/notices',
  NOTICES_DETAIL: (noticeId = ':noticeId') => `/notices/${noticeId}`,
  FAQ: '/faq',
  TEMP: '/temp',
  NOT_FOUND: '*',
};
