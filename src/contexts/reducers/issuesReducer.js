export const initialState = {};

const issuesReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "UPDATE_ISSUES":
      console.log("UPDATE_ISSUES", payload);

      return {
        issues: payload.issues
      };
    default:
      throw new Error(`no case for type ${type}  found in issueReducer`);
  }
};

export default issuesReducer;
