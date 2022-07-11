import * as actionType from "../../actionType/actionTypeStaff";

const initialState = {
  UPDATE: {
    message: [],
    error: [],
    fetching: false,
  },

  GET: {
    data: [],
    loadingBar: 0,
    loading: true,
    error: [],
  },

  DETAIL: {
    loadingBar: 0,
    loading: true,
    data: [],
    error: [],
  },

  ADD: {
    error: [],
    message: [],
    fetching: false,
  },

  DELETE: {
    error: [],
    message: [],
  },
};

const classRoomList = (state = initialState, action) => {
  switch (action.type) {
    // get
    case actionType.GET_DATA_CLASSROOM: {
      return {
        ...state,
        GET: {
          loadingBar: 100,
          loading: false,
          data: action.payload,
        },
      };
    }
    case actionType.FAILED_GET_DATA_CLASSROOM: {
      return {
        ...state,
        GET: {
          loadingBar: 100,
          loading: false,
          data: action.payload,
        },
      };
    }

    // add
    case actionType.START_ADD_DATA_CLASSROOM: {
      return {
        ...state,
        ADD: { fetching: true },
      };
    }
    case actionType.SUCCESS_ADD_DATA_CLASSROOM: {
      return {
        ...state,
        ADD: { message: action.payload, fetching: false },
      };
    }
    case actionType.FAILED_ADD_DATA_CLASSROOM: {
      return {
        ...state,
        ADD: { error: action.payload, fetching: false },
      };
    }
    case actionType.REMOVE_ADD_CLASSROOM: {
      return {
        ...state,
        ADD: {},
      };
    }

    // delete
    case actionType.DELETE_DATA_CLASSROM: {
      return {
        ...state,
        DELETE: {
          message: action.payload,
        },
      };
    }
    case actionType.FAILED_DELETE_DATA_CLASSROM: {
      return {
        ...state,
        DELETE: {
          error: action.payload,
        },
      };
    }

    // detail
    case actionType.GET_DETAIL_CLASSROOM: {
      return {
        ...state,
        DETAIL: {
          loading: false,
          loadingBar: 100,
          data: action.payload,
        },
      };
    }
    case actionType.FAILED_GET_DETAIL_CLASSROOM: {
      return {
        ...state,
        DETAIL: {
          loading: false,
          loadingBar: 100,
          error: action.payload,
        },
      };
    }
    case actionType.REMOVE_DETAIL_CLASSROOM: {
      return {
        ...state,
        DETAIL: {},
      };
    }

    // update
    case actionType.START_UPDATE_DATA_CLASSROOM: {
      return {
        ...state,
        UPDATE: {
          fetching: true,
        },
      };
    }
    case actionType.SUCCESS_UPDATE_DATA_CLASSROOM: {
      return {
        ...state,
        UPDATE: {
          fetching: false,
          message: action.payload,
        },
      };
    }
    case actionType.FAILED_UPDATE_DATA_CLASSROOM: {
      return {
        ...state,
        UPDATE: {
          fetching: false,
          error: action.payload,
        },
      };
    }
    case actionType.REMOVE_UPDATE_DATA_CLASSROOM: {
      return {
        ...state,
        UPDATE: {},
      };
    }

    default:
      return state;
  }
};

export default classRoomList;
