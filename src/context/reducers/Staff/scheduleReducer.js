import {
  ADD_SCHEDULE,
  DELETE_SCHEDULE,
  FAILED_ADD_SCHEDULE,
  FAILED_DELETE_SCHEDULE,
  FAILED_GET_DATA_SCHEDULE,
  FAILED_UPDATE_DETAILS_SCHEDULE,
  GET_DATA_SCHEDULE,
  GET_DETAILS_SCHEDULE,
  REMOVE_ADD_SCHEDULE,
  REMOVE_UPDATE_DETAILS_SCHEDULE,
  REQUEST_DETAIL_SCHEDULE,
} from "../../action/action-type";

import * as actionType from "../../actionType/actionTypeStaff";

const initialState = {
  getData: {
    data: {},
    error: [],
    page: {},
  },

  postData: {
    message: [],
    error: "",
    slide: true,
  },

  GET: {
    data: [],
    error: [],
    loadingBar: 0,
    loading: true,
  },

  data: [],
  error: [],
  loadingBar: 0,
  isFetching: true,
  refreshPage: null,
  dataUpdate: [],

  ADD: {
    message: [],
    error: [],
    slide: true,
    fetching: false,
  },
};

const schedule = (state = initialState, action) => {
  switch (action.type) {
    // get
    case actionType.GET_DATA_SCHEDULE: {
      return {
        ...state,
        GET: {
          loadingBar: 100,
          loading: false,
          data: action.payload,
        },
      };
    }
    case actionType.FAILED_GET_DATA_SCHEDULE: {
      return {
        ...state,
        GET: {
          loadingBar: 100,
          loading: false,
          error: action.payload,
        },
      };
    }

    // add
    case actionType.START_ADD_SCHEDULE: {
      return {
        ...state,
        ADD: {
          fetching: true,
        },
      };
    }
    case actionType.ADD_SCHEDULE: {
      return {
        ...state,
        isFetching: true,
        GET: { loading: true },
        ADD: {
          message: action.payload,
          fetching: false,
          slide: false,
        },
      };
    }

    case actionType.FAILED_ADD_SCHEDULE: {
      return {
        ...state,
        ADD: {
          error: action.payload,
          fetching: false,
          slide: false,
        },
      };
    }
    case actionType.REMOVE_ADD_SCHEDULE: {
      return {
        ...state,
        ADD: {},
      };
    }

    // delete
    case DELETE_SCHEDULE: {
      return {
        ...state,
        isFetching: false,
        loadingBar: 100,
        data: action.payload,
      };
    }
    case FAILED_DELETE_SCHEDULE: {
      return {
        ...state,
        loadingBar: 100,
        isFetching: false,
        error: action.error,
      };
    }
    case REQUEST_DETAIL_SCHEDULE: {
      return {
        ...state,
        loadingBar: 100,
        isFetching: true,
      };
    }
    case GET_DETAILS_SCHEDULE: {
      return {
        ...state,
        loadingBar: 100,
        isFetching: false,
        dataUpdate: action.payload,
      };
    }
    case FAILED_UPDATE_DETAILS_SCHEDULE: {
      return {
        ...state,
        loadingBar: 100,
        isFetching: false,
        error: action.error,
      };
    }
    case REMOVE_UPDATE_DETAILS_SCHEDULE: {
      return {
        ...state,
        loadingBar: 100,
        isFetching: false,
        dataUpdate: {},
      };
    }
    default:
      return state;
  }
};

export default schedule;
