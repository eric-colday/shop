import "./productList.css";
import { DataGrid, GridSearchIcon } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { productRows } from "../../dummyData";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

export default function ProductList() {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState();
  //const [data, setData] = useState(productRows);
  const { data, loading } = useFetch(`/${path}`);

  useEffect(() => {
    setList(data);
  }, [data]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/${path}/${id}`);
      setList(list.filter((item) => item._id !== id));
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 230,
      renderCell: (params) => {
        return <div className="productListItem">{params.row._id}</div>;
      },
    },
    {
      field: "product",
      headerName: "Produit",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    {
      field: "stock",
      headerName: "Stock",
      width: 200,
      renderCell: (params) => {
        return <div className="productListItem">{params.row.inStock}</div>;
      },
    },
    {
      field: "status",
      headerName: "Statut",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.active ? (
              <span style={{ color: "green" }}>En Stock</span>
            ) : (
              <span style={{ color: "red" }}>Rupture de stock</span>
            )}
          </div>
        );
      },
    },
    {
      field: "price",
      headerName: "Prix",
      width: 160,
      renderCell: (params) => {
        return <div className="productListItem">{params.row.price}€</div>;
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}>
              <button className="productListEdit">Modifier</button>
            </Link>
            <DeleteOutlineIcon
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <div className="productTitleContainer">
        <h1 className="productTitle">Produits</h1>
        <Link to="/new-product">
          <button className="productAddButton">Créer</button>
        </Link>
      </div>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
}
