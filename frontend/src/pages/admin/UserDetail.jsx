import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useDispatch, useSelector } from "react-redux";
import { Button, Container, FormControl, InputLabel, MenuItem, Modal, Select, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { adminGetAllUsersAction, userIsActiveAction, userIsAdminAction } from "../../store/actions/admin/adminAction";



// modal style
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
// modal style end

export default function UserDetail() {

    const dispatch = useDispatch();
    const { users } = useSelector((state) => state.admin);
    const [isActive, setisActive] = React.useState(false);
    const [isAdmin, setisAdmin] = React.useState(false);
    const [adminId, setadminId] = React.useState();



    const [open, setOpen] = React.useState(false);
    const [activeopen, setactiveOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleactiveOpen = () => setactiveOpen(true);
    const handleactiveClose = () => setactiveOpen(false);


    useEffect(() => {
        dispatch(adminGetAllUsersAction())
    }, [])


    return (<>
        <TableContainer component={Paper} >
            {/* {JSON.stringify(users)} */}
            <Table>
                <TableHead style={{ backgroundColor: "lightblue" }}>
                    <TableRow>
                        <TableCell>Sr no</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Avatar</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Mobile</TableCell>
                        <TableCell>Active</TableCell>
                        <TableCell>Admin</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((item, index) =>
                        <>
                            <TableRow>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell><img height={50} width={50} src={`http://localhost:5000/${item.Avatar}`}></img></TableCell>
                                <TableCell>{item.email}</TableCell>
                                <TableCell>{item.mobile}</TableCell>

                                <TableCell>
                                    {JSON.stringify(item.isActive)}
                                    <Button variant="contained" onClick={e => {
                                        handleactiveOpen()
                                        setadminId(item._id)
                                        setisActive(item.isActive)
                                    }}>Edit</Button>
                                </TableCell>

                                <TableCell>
                                    {/* {JSON.stringify(item.isAdmin)} */}
                                    <Button variant="contained" onClick={e => {
                                        handleOpen()
                                        setadminId(item._id)
                                        setisAdmin(item.isAdmin)
                                    }}>Edit</Button>
                                </TableCell>
                            </TableRow>
                        </>
                    )}
                </TableBody>
            </Table>
        </TableContainer>

        {/*isAdmin modal */}
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {isAdmin
                            ? "Remove user from admin?"
                            : "Make this user admin?"}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {
                            isAdmin
                                ? <Button color='error' onClick={e => {
                                    dispatch(userIsAdminAction(adminId, false))
                                    handleClose()
                                }}>Remove</Button>
                                : <Button color='error' onClick={e => {
                                    handleClose()
                                    dispatch(userIsAdminAction(adminId, true))
                                }}>Yes</Button>
                        }
                        <Button onClick={handleClose}>No</Button>
                    </Typography>
                </Box>
            </Modal>
        </div>
        {/* modal end */}
        {/*isActive modal */}
        <div>
            <Modal
                open={activeopen}
                onClose={handleactiveClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {isActive
                            ? "Are you sure you want to Deactivate User?"
                            : "Are you sure you want to Activate User?"}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {
                            isActive
                                ? <Button color='error' onClick={e => {
                                    dispatch(userIsActiveAction(adminId, false))
                                    handleClose()
                                }}>Deactivate</Button>
                                : <Button color='error' onClick={e => {
                                    handleClose()
                                    dispatch(userIsActiveAction(adminId, true))
                                }}>Activate</Button>
                        }
                        <Button onClick={handleactiveClose}>No</Button>
                    </Typography>
                </Box>
            </Modal>
        </div>
        {/* modal end */}

    </>
    );
}