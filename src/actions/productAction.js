import axios from "axios";
import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,

  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,

  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  NEW_PRODUCT_RESET,

  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/productConstants";

export const getProduct =
  (keyword = "", currentPage = 1, price = [0, 25000], category) =>
  async (dispatch) => {
    try {
      // console.log(category, "hoi");
      dispatch({ type: ALL_PRODUCT_REQUEST });
      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`;

      if (category) {
        link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`;
      }
      const { data } = await axios.get(link);

      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: err.response.data.message,
      });
    }
  };

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/product/${id}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: err.response.data.message,
    });
  }
};

// clearing errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ typr: CLEAR_ERRORS });
};

// Fill inquiry form
export const submitInquiry = async (formData) => {
  try {
    const response = await axios.post('/api/v1/inquiry/new', formData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}


// Get all products for AdMIN

export const getAdminProduct = () => async (dispatch) => {
  try{
    dispatch({ type: ADMIN_PRODUCT_REQUEST });

    const { data } = await axios.get(`/api/v1/admin/products/`);

    dispatch({
      type: ADMIN_PRODUCT_SUCCESS,
      payload: data.products,
    });
  }catch(err){
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: err.response.data.message,
    });
  }
};

// Create Product
export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    // const productDataNew = {
    //   name: productData.get("name"),
    //   price: productData.get("price"),
    //   mrp: productData.get("mrp"),
    //   description: productData.get("description"),
    //   shortDescription: productData.get("shortDescription"),
    //   company_detail: productData.get("company_detail"),
    //   category: productData.get("category"),
    //   tags: productData.get("tags"),
    //   images: productData.get("images"),
    // }
    console.log(productData, "pro");


    const { data } = await axios.post(`/api/v1/admin/product/new`,
    productData,
    config
    );

    console.log(data);

    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data,
    });
    
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};
