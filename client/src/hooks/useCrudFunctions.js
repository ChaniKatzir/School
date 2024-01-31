import useAxios from "axios-hooks";
import React, { useEffect } from "react";
import fetch from "node-fetch";
import axios from "axios";

export const useCrudFunctions = () => {
  const getData = async (url) => {
    try {
      const response = await axios.get(`http://localhost:2000/${url}`);
      var x=response.data;
      return await x;
    } catch (error) {
      return error;

    }
  }

  const deleteData = async (url) => {
    try {
      const response = await axios.delete(`http://localhost:2000/${url}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  const putData = async (url, body) => {
    try {
      let response = await axios.put(`http://localhost:2000/${url}`, body);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }


  const postData = async (url, body) => {
    try {
      const response = await axios.post(`http://localhost:2000/${url}`, body);
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  return { getData, putData, postData, deleteData };
}