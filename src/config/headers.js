import Cookies from "js-cookie";

export const config = {
  headers: {
    "content-type": "application/json",
    authorization: `Bearer ${Cookies.get("secure-To")}`,
  },
};
