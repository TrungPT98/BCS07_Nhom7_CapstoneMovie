import { movieServ } from "../../services/movieService";
import { getInfoMovie, renderTableMovies } from "../slices/movieSlice";
import { useNavigate } from "react-router-dom";

export const getAllMovieAction = (tenPhim = "") => {
  return async (dispatch) => {
    try {
      const result = await movieServ.getAllMovie(tenPhim);
      dispatch(renderTableMovies(result.data.content));
      // console.log("result", result.data.content)
    } catch (errors) {
      console.log(errors.response?.data);
    }
  };
};

export const addNewMovieAction = (formData) => {
  return async (dispatch) => {
    try {
      const result = await movieServ.addNewMovie(formData);
      console.log("result", result.data.content);
    } catch (errors) {
      // console.log(errors.response?.data);
      alert("Có lỗi xảy ra");
      
    }
  };
};

export const getInfoMovieAction = (maPhim) => {
  return async (dispatch) => {
    try {
      const result = await movieServ.getInfoMovie(maPhim);
      dispatch(getInfoMovie(result.data.content));
      // console.log('result',result.data.content)
    } catch (errors) {
      console.log(errors.response?.data);
    }
  };
};

export const updateMovieAction = (formData) => {
  return async (dispatch) => {
    try {
      const result = await movieServ.updateMovie(formData);
      // dispatch(renderTableMovies())
      console.log("result", result.data.content);
    } catch (errors) {
      console.log(errors.response?.data);
      alert("Có lỗi gì đó xảy ra");
    }
  };
};

export const deleteMovieAction = (data) => {
  return async (dispatch) => {
    try {
      const result = await movieServ.deleteMovie(data);
      alert("xoá thành công");
      // dispatch(getAllMovieAction())
      console.log("result", result.data.content);
    } catch (errors) {
      console.log(errors.response?.data);
    }
  };
};
