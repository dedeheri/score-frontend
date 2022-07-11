import * as actionType from "../../actionType/actionTypeStaff";

const initialState = {
  UPDATE: {
    fetching: false,
    data: [],
    error: [],
  },

  DETAIL: {
    loading: true,
    loadingBar: 0,
    data: [],
    error: [],
  },

  GET: {
    data: [],
    error: [],
    loading: true,
    loadingBar: 0,
  },
  ADD: {
    data: [],
    error: [],
    fetching: false,
    slide: true,
  },
  DELETE: {
    data: [],
    error: [],
  },
};

const student = (state = initialState, action) => {
  switch (action.type) {
    // GET
    case actionType.GET_DATA_STUDENT: {
      return {
        ...state,
        GET: {
          data: action.payload,
          loading: false,
          loadingBar: 100,
        },
      };
    }
    case actionType.FAILED_GET_DATA_STUDENT: {
      return {
        ...state,
        GET: {
          error: action.payload,
          loading: false,
          loadingBar: 100,
        },
      };
    }

    // detail
    case actionType.GET_DETAIL_STUDENT: {
      return {
        ...state,
        DETAIL: { loading: false, loadingBar: 100, data: action.payload },
      };
    }
    case actionType.FAILED_GET_DETAIL_STUDENT: {
      return {
        ...state,
        DETAIL: { loading: false, loadingBar: 100, error: action.payload },
      };
    }
    case actionType.REMOVE_GET_DETAIL_STUDENT: {
      return {
        ...state,
        DETAIL: {},
      };
    }

    // delate
    case actionType.DELETE_DATA_STUDENT: {
      return {
        ...state,
        GET: { loading: true },
        DELETE: { data: action.payload },
      };
    }

    case actionType.FAILED_DELETE_DATA_STUDENT: {
      return {
        ...state,
        DELETE: { error: action.payload },
      };
    }

    // add
    case actionType.START_ADD_STUDENT: {
      return {
        ...state,
        ADD: { fetching: true },
      };
    }
    case actionType.ADD_STUDENT: {
      return {
        ...state,
        GET: { loading: true },
        ADD: { fetching: false, data: action.payload, slide: true },
      };
    }
    case actionType.FAILED_ADD_STUDENT: {
      return {
        ...state,
        ADD: { fetching: false, error: action.payload, slide: false },
      };
    }
    case actionType.REMOVE_ADD_STUDENT: {
      return {
        ...state,
        ADD: {},
      };
    }

    // update
    case actionType.START_UPDATE_DATA_STUDENT: {
      return {
        ...state,
        UPDATE: {
          fetching: true,
        },
      };
    }
    case actionType.SUCCESS_UPDATE_DATA_STUDENT: {
      return {
        ...state,
        UPDATE: {
          data: action.payload,
          fetching: false,
        },
      };
    }
    case actionType.FAILED_UPDATE_DATA_STUDENT: {
      return {
        ...state,
        UPDATE: {
          error: action.payload,
          fetching: false,
        },
      };
    }
    case actionType.REMOVE_UPDATE_DATA_STUDENT: {
      return {
        ...state,
        UPDATE: {},
      };
    }

    default:
      return state;
  }
};

export default student;
