export const initialState = {};

const issuesReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "ADD_ISSUE":
      console.log("ADD_ISSUE", payload);

      return {
        ...state,
        issues: payload.issue
      };
    case "REMOVE_ISSUE":
      console.log("REMOVE_ISSUE", payload);

      return {
        ...state,
        issues: payload.issue
      };
    case "ADD_COMMENT":
      console.log("ADD_COMMENT", payload);

      return {
        ...state,
        issues: payload.issue
      };
    case "REMOVE_COMMENT":
      console.log("REMOVE_COMMENT", payload);

      return {
        ...state,
        issues: payload.issue
      };
    default:
      throw new Error(`no case for type ${type}  found in issueReducer`);
  }
};
