import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./ProductDetails.module.css";
import ReactStars from "react-rating-stars-component";
import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../actions/productAction";
import ReviewCard from "../../components/shared/ReviewCard/ReviewCard.jsx";
import MetaData from "../../components/shared/MetaData/MetaData";
import InquiryForm from "../../components/shared/InquiryForm/InquiryForm";

const ProductDetails = () => {
  const dispatch = useDispatch();

  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const { id } = useParams();

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 15 : 20,
    value: product.rating,
    isHalf: true,
  };

  let discount = product.mrp - product.price;
  let discountPercntage = (discount / product.mrp) * 100;
  let newdic = discountPercntage.toFixed(0);

  return (
    <>
      {/* Meta Tags, title, description Start */}
      <MetaData
        title={product.name}
        description={product.shortDescription}
        keyword={product.tags}
      />
      {/* Meta Tags, title, description end */}

      {/* Path design Start */}
      <span className={styles.path}>
        <Link className={styles.pathlink} to="/">
          Home
        </Link>
        /<Link className={styles.pathlink}> {product.category} </Link> /
        <Link className={styles.pathlink}> {product.name}</Link>
      </span>
      {/* Path design end */}

      {/* Upper Section start */}
      <div className={styles.containerBox + " " + styles.ProductDetails}>
        <div className={styles.leftBox}>
          <div className={styles.productImg}>
            <Carousel>
              {product.images &&
                product.images.map((item, i) => (
                  <img
                    className={styles.CarouselImage}
                    key={i}
                    src={item.url}
                    alt={`${i} Slide`}
                  />
                ))}
            </Carousel>
          </div>
        </div>
        <div className={styles.rightBox}>
          <h2>{product.name}</h2>
          <p>{product.shortDescription}</p>
          <div className={styles.review}>
            <ReactStars {...options} />{" "}
            <span> ({product.numOfReviews} Reviews)</span>
          </div>
          <span className={styles.pricing}>Price - ₹ {product.price}</span>
          <span className={styles.mrp}>MRP - ₹ {product.mrp}</span>
          <span className={styles.discount}> {newdic}%</span>

          <div className={styles.inquireBtn}>
            <button onClick={handleButtonClick}>Inquire Now</button>
            {showForm && (
              <button onClick={closeForm} className={styles.close}>
                close
              </button>
            )}
            {showForm && <InquiryForm id={product._id} />}
          </div>
        </div>
      </div>
      {/* Upper Section end */}


      {/* Description Section Start */}
      <h3 className={styles.reviewHeading}>Product Description</h3>

      <div className={styles.containerBox}>
      <div dangerouslySetInnerHTML={{ __html: product.description }}></div>

      </div>
      {/* Description Section end */}

      {/* Reviews Section Start */}
      <h3 className={styles.reviewHeading}>Reviews</h3>

      <div className={styles.containerBox + " " + styles.otherDetails}>
        <div className={styles.reviewDesign}>
          <div className={styles.firstSection}>
            <h5>Total Reviews</h5>
            <span>10.0K</span>
            <p>Growth in reviews on this year</p>
          </div>

          <hr />

          <div className={styles.secondSection}>
            <h5>Average Rating</h5>
            <span>
              <p>{product.rating}.0</p> <ReactStars {...options} />
            </span>
            <p>Average rating on this year</p>
          </div>

          <hr />

          <div className={styles.thirdSection}>
            <div className={styles.rateBox}>
              <span className={styles.value}>★ 5</span>
              <div className={styles.progressBar}>
                <span className={styles.progress}></span>
              </div>
              <span className={styles.count}>0</span>
            </div>
            <div className={styles.rateBox}>
              <span className={styles.value}>★ 4</span>
              <div className={styles.progressBar}>
                <span className={styles.progress}></span>
              </div>
              <span className={styles.count}>0</span>
            </div>
            <div className={styles.rateBox}>
              <span className={styles.value}>★ 3</span>
              <div className={styles.progressBar}>
                <span className={styles.progress}></span>
              </div>
              <span className={styles.count}>0</span>
            </div>
            <div className={styles.rateBox}>
              <span className={styles.value}>★ 2</span>
              <div className={styles.progressBar}>
                <span className={styles.progress}></span>
              </div>
              <span className={styles.count}>0</span>
            </div>
            <div className={styles.rateBox}>
              <span className={styles.value}>★ 1</span>
              <div className={styles.progressBar}>
                <span className={styles.progress}></span>
              </div>
              <span className={styles.count}>0</span>
            </div>
          </div>
        </div>

        <div className="reviewdb">
          {product.reviews && product.reviews[0] ? (
            <div className={styles.reviews}>
              {product.reviews &&
                product.reviews.map((review) => <ReviewCard review={review} />)}
            </div>
          ) : (
            <p className={styles.noReviews}>No Reviews Yet</p>
          )}
        </div>
      </div>
      {/* Reviews Section Send */}

    </>
  );
};

export default ProductDetails;
