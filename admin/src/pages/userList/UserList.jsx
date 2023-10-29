import "./userList.css";
import { DataGrid, GridSearchIcon } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import axios from "axios";
import useFetch from "../../hooks/useFetch";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UserList() {
  //const [data, setData] = useState(userRows);
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState();
  const { data, loading } = useFetch(`/${path}`);
  const { mode } = useContext(ThemeContext);

  useEffect(() => {
    setList(data);
  }, [data]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/${path}/${id}`);
      setList(list.filter((item) => item._id !== id));
      window.location.reload();
      toast.success("Utilisateur supprimé avec succès");
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
        return (
          <div
            className="userListUser"
            style={{ color: mode === "dark" ? "white" : "black" }}
          >
            {params.row._id}
          </div>
        );
      },
    },
    {
      field: "user",
      headerName: "Utilisateur",
      width: 200,
      renderCell: (params) => {
        return (
          <div
            className="userListUser"
            style={{ color: mode === "dark" ? "white" : "black" }}
          >
            <img className="userListImg" src={params.row.img} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "status",
      headerName: "Statut",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            {params.row.active ? (
              <span style={{ color: "green" }}>Active</span>
            ) : (
              <span style={{ color: "red" }}>Inactive</span>
            )}
          </div>
        );
      },
    },
    {
      field: "admin",
      headerName: "IsAdmin",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            {params.row.isAdmin ? (
              <span style={{ color: "green" }}>Yes</span>
            ) : (
              <span style={{ color: "red" }}>Non</span>
            )}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Modifier</button>
            </Link>
            <DeleteOutlineIcon
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList"
    style={{ backgroundColor: mode === "dark" ? "#222" : "white" }}
    >
      <div className="userTitleContainer">
        <h1 className="userTitle">Utilisateurs</h1>
        <Link to="/new-user">
          <button className="userAddButton">Créer</button>
        </Link>
      </div>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={(row) => row._id}
        loading={loading}
      />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
