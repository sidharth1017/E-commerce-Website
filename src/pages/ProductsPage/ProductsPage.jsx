import React, { useEffect, useState } from "react";
import styles from "./ProductPage.css";
import Product from "../Home/Product";
import { useParams } from "react-router-dom";
import { getProduct, clearErrors } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import Pagination from "react-js-pagination";

const categories = [
  "Gems and jewellery",
  "Engineering goods",
  "Auto parts and accessories",
  "Fashion and apparels",
  "Cotton yarn",
  "Leather products",
  "Handloom products",
  "Jute products",
];

const ProductsPage = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");

  const { loading, error, products, productsCount, resultPerPage } =
    useSelector((state) => state.products);

  const { keyword } = useParams();

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  console.log(category, "pro");

  useEffect(() => {
    dispatch(getProduct(keyword, currentPage, price, category));
  }, [dispatch, error, keyword, currentPage, price, category]);

  // let count = filteredProductsCount;

  return (
    <>
      <h1 className="heading">Products</h1>
      <div className="containerBox productDiv">
        <div className="filterBox">
          <h1 className="Filtersheading">Filters</h1>

          <Typography className="filtertitle">Price</Typography>
          <Slider
            value={price}
            onChange={priceHandler}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            min={0}
            max={25000}
          />
          <Typography className="filtertitle">Categories</Typography>
          <ul className="categoryBox">
            {categories.map((category) => (
              <li
                className="category-link"
                key={category}
                onClick={() => setCategory(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>

        <div className="productsCard">
          {products && products.map((product) => <Product product={product} />)}
        </div>

      </div>

      {resultPerPage < productsCount && (
        <div className="paginationBox">
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={resultPerPage}
            totalItemsCount={productsCount}
            onChange={setCurrentPageNo}
            nextPageText="Next"
            prevPageText="Prev"
            firstPageText="1st"
            lastPageText="Last"
            itemClass="page-item"
            linkClass="page-link"
            activeClass="pageItemActive"
            activeLinkClass="pageLinkActive"
          />
        </div>
      )}
    </>
  );
};

export default ProductsPage;
