import * as actionType from "../../actionType/actionTypeStaff";

const initialState = {
  GET: {
    data: [],
    error: [],
    loadingBar: 0,
    loading: true,
  },

  UPDATE: {
    data: [],
    error: [],
    fetching: false,
  },

  DETAIL: {
    data: [],
    error: [],
    loading: true,
    loadingBar: 0,
  },
  ADD: {
    message: [],
    error: [],
    slide: true,
    fetching: false,
  },
  DELETE: {
    message: [],
    error: [],
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
    case actionType.DELETE_SCHEDULE: {
      return {
        ...state,
        GET: { loading: true },
        DELETE: {
          message: action.payload,
        },
      };
    }
    case actionType.FAILED_DELETE_SCHEDULE: {
      return {
        ...state,
        DELETE: {
          error: action.payload,
        },
      };
    }

    // detail
    case actionType.GET_DETAIL_SCHEDULE: {
      return {
        ...state,
        DETAIL: { data: action.payload, loading: false, loadingBar: 100 },
      };
    }
    case actionType.FAILED_GET_DETAIL_SCHEDULE: {
      return {
        ...state,
        DETAIL: { error: action.payload, loading: false, loadingBar: 100 },
      };
    }
    case actionType.REMOVE_GET_DETAIL_SCHEDULE: {
      return {
        ...state,
        DETAIL: {},
      };
    }

    // update
    case actionType.START_UPDATE_DATA_SCHEDULE: {
      return {
        ...state,
        UPDATE: {
          fetching: true,
        },
      };
    }
    case actionType.SUCCESS_UPDATE_DATA_SCHEDULE: {
      return {
        ...state,
        GET: { loading: true },
        UPDATE: {
          data: action.payload,
          fetching: false,
        },
      };
    }
    case actionType.FAILED_UPDATE_DATA_SCHEDULE: {
      return {
        ...state,
        UPDATE: {
          error: action.payload,
          fetching: false,
        },
      };
    }
    case actionType.REMOVE_UPDATE_DATA_SCHEDULE: {
      return {
        ...state,
        UPDATE: {},
      };
    }

    default:
      return state;
  }
};

export default schedule;
