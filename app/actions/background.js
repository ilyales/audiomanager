import axios from "axios";
import * as constants from "../constants/background";

export function getBackgrounds() {
  return function(dispatch) {
     axios.get('/api/backgrounds')
      .then(function (response) {
        dispatch({
          type:constants.GET_BACKGROUNDS_SUCCESS,
          payload:{
            backgrounds:response.data
          }
        });
      })
      .catch(function (error) {
         //TODO: add error processing
        console.log(error);
      });
  }
}

export function changeEditForm(key,value) {
  return {
    type:constants.CHANGE_FORM_FIELD,
    payload:{key,value}
  }
}

export function uploadBackground(file) {
  return function(dispatch) {
    dispatch({
      type:constants.UPLOAD_BACKGROUND
    });

    let fd = new FormData();
    fd.append('file', file);
    axios
      .post('/api/backgrounds/uploadfile', fd, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(function (response) {
          dispatch({
            type:constants.UPLOAD_BACKGROUND_SUCCESS,
            payload:{
              fileName:file.name
            }
          });
        })
        .catch(function (error) {
          //TODO: add error processing
          console.log(error);
        });
  }
}

export function saveBackground(newBackground) {

  return function(dispatch, getState) {
    //validation
    let state = getState();
    let background = state.background.backgroundEditForm;
    let valid = true;
    let validProps = {
      title:true,
      fileName:true,
    }

    if (background.title === undefined || background.title === "") {
      validProps.title = false;
      valid = false;
    }
    if (background.fileName === undefined || background.fileName === "") {
      validProps.fileName = false;
      valid = false;
    }


    if (!valid) {
      dispatch({
        type:constants.VALIDATION_ERROR,
        payload:{
          backgroundEditFormValidProps:validProps,
        }
      });
    }
    else {
      dispatch({
        type:constants.SAVE_BACKGROUND
      });

      if (newBackground) {
        axios.post('/api/backgrounds',background)
        .then(function (response) {
          dispatch({
            type:constants.SAVE_BACKGROUND_SUCCESS
          });
        })
        .catch(function (error) {
          //TODO: add error processing
          console.log(error);
        });
      }
      else {
        axios.patch('/api/backgrounds/'+background.id,background)
        .then(function (response) {
          dispatch({
            type:constants.SAVE_BACKGROUND_SUCCESS
          });
        })
        .catch(function (error) {
          //TODO: add error processing
          console.log(error);
        });
      }
    }
  }
}

export function initEditForm() {
  return {
    type:constants.INIT_EDIT_FORM
  }
}

export function openBackgroundEdit(backgroundId) {
  return function(dispatch) {
    axios.get('/api/backgrounds/'+backgroundId)
      .then(function (response) {
        dispatch({
          type:constants.OPEN_BACKGROUND_EDIT,
          payload:{
            background:response.data
          }
        });
      })
      .catch(function (error) {
         //TODO: add error processing
        console.log(error);
      });
  }
}

export function deleteBackground(backgroundId) {
  return function(dispatch) {
    axios.delete('/api/backgrounds/'+backgroundId)
      .then(function (response) {
        dispatch({
          type:constants.DELETE_BACKGROUND,
          payload:{backgroundId}
        });
      })
      .catch(function (error) {
         //TODO: add error processing
        console.log(error);
      });
  }
}