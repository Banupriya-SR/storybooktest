import React from 'react'
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
export default function UserForm(props) {

    const { data, setData,type, open, handleClose, handleAdd, handleUpdate } = props
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <div className={"modal"}>
                <form className="form">
                    <TextField
                        className="text"
                        id="standard-basic"
                        label="Name"
                        onChange={(e) => {
                            setData({ ...data, name: e.target.value });
                        }}
                        value={data.name}
                    />
                    <TextField
                        className="text"
                        id="standard-basic"
                        label="Email"
                        value={data.email}
                        onChange={(e) => {
                            setData({ ...data, email: e.target.value });
                        }}
                    />
                    <TextField
                        className="text"
                        id="standard-basic"
                        label="Phone"
                        value={data.phone}
                        onChange={(e) => {
                            setData({ ...data, phone: e.target.value });
                        }}
                    />
                    <TextField
                        className="text"
                        id="standard-basic"
                        label="Website"
                        value={data.website}
                        onChange={(e) => {
                            setData({ ...data, website: e.target.value });
                        }}
                    />
                    <label>Address</label>
                    <TextField
                        className="text"
                        id="standard-basic"
                        label="Suite"
                        value={data.address && data.address.suite}
                        onChange={(e) => {
                            setData({
                                ...data,
                                address: { ...data.address, suite: e.target.value },
                            });
                        }}
                    />
                    <TextField
                        className="text"
                        id="standard-basic"
                        label="Street"
                        value={data.address && data.address.street}
                        onChange={(e) => {
                            setData({
                                ...data,
                                address: { ...data.address, street: e.target.value },
                            });
                        }}
                    />
                    <TextField
                        className="text"
                        id="standard-basic"
                        label="City"
                        value={data.address && data.address.city}
                        onChange={(e) => {
                            setData({
                                ...data,
                                address: { ...data.address, city: e.target.value },
                            });
                        }}
                    />

                    <TextField
                        className="text"
                        id="standard-basic"
                        label="Zip-code"
                        value={data.address && data.address.zipcode}
                        onChange={(e) => {
                            setData({
                                ...data,
                                address: { ...data.address, zipcode: e.target.value },
                            });
                        }}
                    />
                    {type === 1 ? (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleAdd()}
                        >
                            Add User
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleUpdate()}
                        >
                            Update User
                        </Button>
                    )}
                </form>
            </div>
        </Modal>
    )
}
