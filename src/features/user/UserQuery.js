import React, { useState, useEffect } from "react";
import {
    fetchUsers,
    updateUsers,
    addUsers,
    deleteUsers,
} from "./api";
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
import { useQuery, useMutation } from "react-query"

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



export function UserQuery(props) {
    const classes = useStyles();
    const [userState, getUsers] = useState([]);
    const [originalState, setOriginalState] = useState([]);
    const [search, setSearch] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const [datas, setData] = React.useState("");
    const [type, setType] = React.useState(1);

    const { data, isError, isLoading, refetch } = useQuery(["usersFetch"], fetchUsers, {
        refetchOnWindowFocus: false
    })

    useEffect(() => {
        console.log("here")
        if (isLoading) {
            getUsers([]);
            setOriginalState([]);
        }
        else {
            getUsers(data);
            setOriginalState(data);
        }
    }, [data]);

    const handleOpen = (type) => {
        setType(type);
        setOpen(true);
        setData("");
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

    const postUser = useMutation(
        async () => {
            return addUsers(datas);
        },
        {
            onSuccess: (res) => {
                getUsers([res, ...userState])
            },
            onError: (err) => {
                console.log(err.response?.data || err);
            },
        }
    );

    const updateUser = useMutation(
        async () => {
            return updateUsers({ ...datas, id: datas.id });
        },
        {
            onSuccess: (res) => {
                const objIndex =
                    userState &&
                    userState.findIndex((obj) => obj.id == datas.id);
                userState[objIndex] = res;
                getUsers([...userState])
            },
            onError: (err) => {
                console.log(err.response?.data || err);
            },
        }
    );

    const deleteUser = useMutation(
        async (val) => {
            return deleteUsers(val, userState);
        },
        {
            onSuccess: (res) => {
                getUsers([...res])
            },
            onError: (err) => {
                console.log(err.response?.data || err);
            },
        }
    );

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
                        // getUsers(originalState);
                        refetch()
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
                {!isLoading &&
                    <UserForm
                        data={datas}
                        open={open}
                        type={type}
                        setData={setData}
                        handleClose={() => setOpen(false)}
                        handleAdd={() => {
                            postUser.mutate()
                            setOpen(false);
                        }}
                        handleUpdate={() => {
                            updateUser.mutate()
                            setOpen(false);
                        }}
                    />}

                {!isLoading && userState.map((val, i) => {
                    return (
                        <Card className={classes.root} variant="outlined" key={i}>
                            <BasicCard
                                userDetails={
                                    {
                                        email: val.email || "",
                                        phone: val.phone || "",
                                        name: val.name || "",
                                        website: val.website || "",
                                        address: `${val.address && val.address.suite || ""},
                  ${val.address && val.address.street || ""},
                  ${val.address && val.address.zipcode || ""}`
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
                                        deleteUser.mutate(val);
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
