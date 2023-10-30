export const EMAIL_REGEX =
  /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;

export const RECOMMENDATION_AMOUNT = 5;

/*
TEMP - DEV ONLY
When set to any of the available id, 
will automatically log the user in, 

WHEN TURNED ON WILL, DEV WILL NOT BE ABLE TO CHANGE USER.
*/
export const DEV_LOGIN = "AAA01";
// export const DEV_LOGIN = null;

// MOCKUP FOR DB.
export const FETCH_TIME_SECONDS = 1 + Math.random() * 2;
