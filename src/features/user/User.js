import React, { useState, useEffect } from "react";
import {
  fetchUsers,
  userList,
  updateUsers,
  addUsers,
  deleteUsers,
} from "./userSlice";
import { useSelector, useDispatch } from "react-redux";
import "./User.css";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import { CardActions, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { BasicCard } from "../../stories/BasicCard";
import { Input } from "../../stories/Input";
import UserForm from "./UserForm";
// import _ from "lodash";
const useStyles = makeStyles({
  root: {
    minWidth: 500,
    margin: 30,
    textAlign: "left",
  },
  title: {
    fontSize: 17,
    whiteSpace: "nowrap",
    fontweight: "bold",
  },
});
export function User(props) {
  console.log(process.env.API_URL);
  const classes = useStyles();
  const users = useSelector(userList);
  const [userState, getUsers] = useState(users);
  const [originalState, setOriginalState] = useState(users);
  const [search, setSearch] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState("");
  const [type, setType] = React.useState(1);
  let dispatch = useDispatch();
  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUsers());
    }
    getUsers(users);
    setOriginalState(users);
  }, [users]);

  const handleOpen = (type) => {
    setType(type);
    setOpen(true);
    setData("");
  };

  const handleClose = () => {
    setOpen(false);
  };
  const formData = (value, index) => {
    setOpen(true);
    setType(2);
    setData(value);
  };
  const handleSearch = (data) => {
    if (search.length > 0) {
      let a = originalState.filter((val) => val.name.toUpperCase().startsWith(search.toUpperCase()));
      getUsers(a);
    }

    else {
      getUsers(originalState)
    }
  };
  const handleAdd = () => {
    dispatch(addUsers(data));
    setOpen(false);
  };
  const handleUpdate = () => {
    dispatch(updateUsers({ ...data, id: data.id }));
    setOpen(false);
  };
  const handleDelete = (data) => {
    dispatch(deleteUsers(data));
  };
  console.log(props);
  return (
    <React.Fragment>
      <h1 style={{ textAlign: "center" }}>Resource</h1>
      <div className="searchContainer">
        <div className="searchBtn">
          <Input
            className="text"
            id="standard-basic"
            label="Search"
            onChange={(e) => {
              setSearch(e);
            }}
            value={search}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleSearch({ search })}
          className="searchButton"
        >
          Search
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            getUsers(originalState);
            setSearch("")
          }}
          className="searchButton"
        >
          Clear
        </Button>
        <Button variant="contained" color="primary" onClick={() => handleOpen(1)}>
          Add User
        </Button>
      </div>
      <div className={"container"}>
        <UserForm
          data={data} 
          open={open} 
          type={type}
          setData={setData} 
          handleClose={handleClose}
          handleAdd={handleAdd} 
          handleUpdate={handleUpdate}
        />
        {userState.map((val, i) => {
          return (
            <Card className={classes.root} variant="outlined" key={i}>
              <BasicCard
                userDetails={
                  {
                    email: val.email,
                    phone: val.phone,
                    name: val.name,
                    website: val.website,
                    address: `${val.address && val.address.suite},
                  ${val.address && val.address.street},
                  ${val.address && val.address.zipcode}`
                  }
                }
              />
              <CardActions disableSpacing>
                <IconButton
                  aria-label="Edit Data"
                  onClick={() => {
                    formData(val, i);
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="Delete"
                  onClick={() => {
                    handleDelete(val);
                  }}
                >
                  <Delete />
                </IconButton>
              </CardActions>
            </Card>
          );
        })}
      </div>
    </React.Fragment>
  );
}
