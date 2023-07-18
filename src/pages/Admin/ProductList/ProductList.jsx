import React, { useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { clearErrors, getAdminProduct } from '../../../actions/productAction';
import { useAlert } from 'react-alert';
import { Button } from '@material-ui/core';
import styles from './ProductList.module.css';
import MetaData from '../../../components/shared/MetaData/MetaData';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Sidebar from '../../../components/shared/Sidebar/Sidebar';

const ProductList = () => {
    const dispatch = useDispatch();
  
    // const alert = useAlert();
  
    const { error, products } = useSelector((state) => state.products);

    // console.log(products);
  
    // const { error: deleteError, isDeleted } = useSelector(
    //   (state) => state.product
    // );
  
    // const deleteProductHandler = (id) => {
    //   dispatch(deleteProduct(id));
    // };
  
    useEffect(() => {
    //   if (error) {
    //     alert.error(error);
    //     dispatch(clearErrors());
    //   }
  
    //   if (deleteError) {
    //     alert.error(deleteError);
    //     dispatch(clearErrors());
    //   }
  
    //   if (isDeleted) {
    //     alert.success("Product Deleted Successfully");
    //     history.push("/admin/dashboard");
    //     dispatch({ type: DELETE_PRODUCT_RESET });
    //   }
  
      dispatch(getAdminProduct());
    }, [dispatch]);
  
    const columns = [
      { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
  
      {
        field: "name",
        headerName: "Name",
        minWidth: 350,
        flex: 1,
      },
      {
        field: "price",
        headerName: "Price",
        type: "number",
        minWidth: 270,
        flex: 0.5,
      },  
      {
        field: "actions",
        flex: 0.3,
        headerName: "Actions",
        minWidth: 150,
        type: "number",
        sortable: false,
        renderCell: (params) => {
          return (
            <>
              <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
                <EditIcon />
              </Link>
  
              <Button
                // onClick={() =>
                //   deleteProductHandler(params.getValue(params.id, "id"))
                // }
              >
                <DeleteIcon />
              </Button>
            </>
          );
        },
      },
    ];
  
    const rows = [];
  
    products &&
      products.forEach((item) => {
        rows.push({
          id: item._id,
          stock: item.Stock,
          price: item.price,
          name: item.name,
        });
      });
  
    return (
      <>
        <MetaData title={`ALL PRODUCTS - Admin`} />
  
        <div className={styles.dashboard}>
          <Sidebar />
          <div className={styles.productListContainer}>
            <h1 id={styles.productListHeading}>ALL PRODUCTS</h1>
  
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className={styles.productListTable}
              autoHeight
            />
          </div>
        </div>
      </>
    );
  };
  
  export default ProductList;