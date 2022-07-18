import {
  CONFIRMASTION_ACCOUNT,
  FAILED_CONFIRMASTION_ACCOUNT,
  FAILED_GET_DATA_ACCOUNT,
  GET_DATA_ACCOUNT,
} from "../../action/action-type";

import * as actionType from "../../actionType/actionTypeStaff";

const initialState = {
  data: [],
  isFetching: true,
  loadingBar: 0,
  error: [],
  success: "",

  DETAIL_ACCOUNT: {
    loading: true,
    loadingBar: 0,
    data: [],
    error: [],
  },

  UPDATE_PASSWORD: {
    data: [],
    fetching: false,
    error: [],
  },

  DELETE_ACCOUNT: {
    data: [],
    error: [],
  },
};

const account = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA_ACCOUNT:
      return {
        ...state,
        data: action.payload,
        loadingBar: 100,
        isFetching: false,
      };
    case FAILED_GET_DATA_ACCOUNT: {
      return {
        ...state,
        error: action.error,
        loadingBar: 100,
        isFetching: false,
      };
    }
    case CONFIRMASTION_ACCOUNT: {
      return {
        ...state,
        success: action.payload,
        loadingBar: 100,
        isFetching: false,
      };
    }
    case FAILED_CONFIRMASTION_ACCOUNT: {
      return {
        ...state,
        error: action.error,
        loadingBar: 100,
        isFetching: false,
      };
    }

    // get detail account
    case actionType.GET_DETAIL_ACCOUNT: {
      return {
        ...state,
        DETAIL_ACCOUNT: {
          loading: false,
          loadingBar: 100,
          data: action.payload,
        },
      };
    }
    case actionType.FAILED_DETAIL_ACCOUNT: {
      return {
        ...state,
        DETAIL_ACCOUNT: {
          loading: false,
          loadingBar: 100,
          error: action.payload,
        },
      };
    }

    // update password
    case actionType.START_UPDATE_PASSWORD: {
      return {
        ...state,
        UPDATE_PASSWORD: {
          fetching: true,
        },
      };
    }
    case actionType.SUCCESS_UPDATE_PASSWORD: {
      return {
        ...state,
        UPDATE_PASSWORD: {
          fetching: false,
          data: action.payload,
        },
      };
    }
    case actionType.FAILED_UPDATE_PASSWORD: {
      return {
        ...state,
        UPDATE_PASSWORD: {
          fetching: false,
          error: action.payload,
        },
      };
    }

    // delete account
    case actionType.SUCCESS_DELETE_ACCOUNT: {
      return {
        ...state,
        isFetching: true,
        DELETE_ACCOUNT: {
          data: action.payload,
        },
      };
    }

    case actionType.FAILED_DELETE_ACCOUNT: {
      return {
        ...state,
        DELETE_ACCOUNT: {
          error: action.payload,
        },
      };
    }

    default:
      return state;
  }
};

export default account;
