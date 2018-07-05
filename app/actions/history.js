import axios from "axios";
import * as constants from "../constants/history";

export function getHistory() {
  return function(dispatch) {
     axios.get('/api/logs')
      .then(function (response) {
        for (let i=0;i<response.data.length;i++) {
          response.data[i].log = JSON.parse(response.data[i].log);
        }

        dispatch({
          type:constants.GET_HISTORY_SUCCESS,
          payload:{
            historyItems:response.data
          }
        });
      })
      .catch(function (error) {
         //TODO: add error processing
        console.log(error);
      });
  }
}