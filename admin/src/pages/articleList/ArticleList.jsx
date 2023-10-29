import React from "react";
import "../productList/ProductList";
import { DataGrid, GridSearchIcon } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { productRows } from "../../dummyData";
import { Link, useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const ArticleList = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState();
  //const [data, setData] = useState(productRows);
  const PF = "http://localhost:5500/images/";
  const { data, loading } = useFetch("/articles");

  useEffect(() => {
    setList(data);
  }, [data]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/articles/${id}`);
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
      field: "article",
      headerName: "Article",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img
              className="productListImg"
              src={PF + params.row.photo}
              alt=""
            />
            {params.row.title}
          </div>
        );
      },
    },
    {
      field: "author",
      headerName: "Auteur",
      width: 200,
      renderCell: (params) => {
        return <div className="productListItem">{params.row.username}</div>;
      },
    },
    {
      field: "category",
      headerName: "Category",
      width: 150,
      renderCell: (params) => {
        return <div className="productListItem">{params.row.categories}</div>;
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/article/" + params.row._id}>
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
        <h1 className="productTitle">Articles</h1>
        <Link to="/write">
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
};

export default ArticleList;
