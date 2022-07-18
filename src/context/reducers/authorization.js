import {
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGIN_START,
  START_REGISTRASION_STAFF,
  SUCCESS_REGISTRASION_STAFF,
  FAILED_REGISTRASION_STAFF,
} from "../action/action-type";

import * as actionTypeStudent from "../actionType/actionTypeStudent";
import * as actionTypeTeacher from "../actionType/actionTypeTeacher";

const initialState = {
  users: [],
  error: "",
  validation: [],
  isFetching: true,
  loadingBar: 0,
  next: false,

  login: {
    data: [],
    fetching: false,
    loadingBar: 0,
    error: [],
  },

  REGISTRATION_TEACHER: {
    data: [],
    error: [],
    next: false,
    fetching: false,
  },
  NEXT_REGISTRATION_TEACHER: {
    data: [],
    error: [],
    fetching: false,
  },
  REGISTRATION_STUDENT: {
    data: [],
    error: [],
    next: false,
    fethcing: false,
  },
  NEXT_REGISTRATION_STUDENT: {
    data: [],
    error: [],
    validation: [],
    fetching: false,
  },
  REGISTRATION_STAFF: {
    data: [],
    error: [],
    fetching: false,
  },
};

const authorization = (state = initialState, action) => {
  switch (action.type) {
    // registrasi student
    case actionTypeStudent.START_VALIDASI_NO_IDENTITY: {
      return {
        ...state,
        REGISTRATION_STUDENT: {
          fetching: true,
        },
      };
    }

    case actionTypeStudent.SUCCESS_VALIDASI_NO_IDENTITY: {
      return {
        ...state,
        REGISTRATION_STUDENT: {
          data: action.payload,
          fetching: false,
          next: true,
        },
      };
    }

    case actionTypeStudent.FAILED_VALIDASI_NO_IDENTITY: {
      return {
        ...state,
        REGISTRATION_STUDENT: {
          error: action.payload,
          fetching: false,
          next: false,
        },
      };
    }

    // registrasi student next
    case actionTypeStudent.START_PASSWORD_VALIDASI: {
      return {
        ...state,
        NEXT_REGISTRATION_STUDENT: {
          fetching: true,
        },
      };
    }

    case actionTypeStudent.SUCCESS_PASSWORD_VALIDASI: {
      return {
        ...state,
        NEXT_REGISTRATION_STUDENT: {
          data: action.payload,
          fetching: false,
        },
      };
    }

    case actionTypeStudent.FAILED_PASSWORD_VALIDASI: {
      return {
        ...state,
        NEXT_REGISTRATION_STUDENT: {
          error: action.payload,
          fetching: false,
          validation: action.validation,
        },
      };
    }

    // registatasi teacher
    case actionTypeTeacher.START_VERIFY_TEACHER: {
      return {
        ...state,
        REGISTRATION_TEACHER: {
          fetching: true,
        },
      };
    }

    case actionTypeTeacher.SUCCESS_VERIFY_TEACHER: {
      return {
        ...state,
        REGISTRATION_TEACHER: {
          data: action.payload,
          fetching: false,
          next: true,
        },
      };
    }

    case actionTypeTeacher.FAILED_VERIFY_TEACHER: {
      return {
        ...state,
        REGISTRATION_TEACHER: {
          error: action.payload,
          fetching: false,
          next: false,
        },
      };
    }
    case actionTypeTeacher.RESET_VERIFY_TEACHER: {
      return {
        ...state,
        REGISTRATION_TEACHER: {},
      };
    }

    // input password teacher
    case actionTypeTeacher.START_INPUT_PASSWORD: {
      return {
        ...state,
        NEXT_REGISTRATION_TEACHER: {
          fetching: true,
        },
      };
    }

    case actionTypeTeacher.SUCCESS_INPUT_PASSWORD: {
      return {
        ...state,
        NEXT_REGISTRATION_TEACHER: {
          data: action.payload,
          fetching: false,
        },
      };
    }

    case actionTypeTeacher.FAILED_INPUT_PASSWORD: {
      return {
        ...state,
        NEXT_REGISTRATION_TEACHER: {
          error: action.payload,
          fetching: false,
        },
      };
    }

    // login
    case LOGIN_START: {
      return {
        ...state,
        login: {
          fetching: true,
        },
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        login: {
          fetching: false,
          loadingBar: 100,
          data: action.payload,
        },
      };
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        login: {
          fetching: false,
          loadingBar: 100,
          error: action.payload,
        },
      };
    }

    // registasion staff
    case START_REGISTRASION_STAFF: {
      return {
        ...state,
        REGISTRATION_STAFF: {
          fetching: true,
        },
      };
    }
    case SUCCESS_REGISTRASION_STAFF: {
      return {
        ...state,
        REGISTRATION_STAFF: {
          data: action.payload,
          fetching: false,
        },
      };
    }
    case FAILED_REGISTRASION_STAFF: {
      return {
        ...state,
        REGISTRATION_STAFF: {
          fetching: false,
          error: action.payload,
        },
      };
    }
    default:
      return state;
  }
};

export default authorization;
