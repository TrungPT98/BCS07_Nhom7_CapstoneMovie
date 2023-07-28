import { movieServ } from "../../services/movieService";
import { getInfoMovie } from "../slices/movieSlice";
import { useNavigate } from "react-router-dom";
export const addNewMovieAction = (formData) => {
  return async (dispatch) => {
    try {
      const result = await movieServ.addNewMovie(formData);
      alert('thêm thành công')
      console.log("result", result.data.content);
    } catch(errors) {
      console.log(errors.response?.data);
    }
  };
};

export const getInfoMovieAction = (maPhim) => {
  return async (dispatch) => {
    try{
      const result = await movieServ.getInfoMovie(maPhim)
      dispatch(getInfoMovie(result.data.content))
      // console.log('result',result.data.content)
    }catch(errors){
      console.log(errors.response?.data);
    }
  }
}

export const updateMovieAction = (formData) => {
  return async (dispatch) => {
    try{
      const result = await movieServ.updateMovie(formData)
      alert('cập nhật thành công')
      // dispatch(renderTableMovies())
      console.log("result", result.data.content)
    }catch(errors){
      console.log(errors.response?.data);
    }
  }
}
