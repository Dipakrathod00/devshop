import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllOrderAction, removePlacedOrderAction, updateOrderStatusAction } from "../store/actions/orderAction";
import { Button, Container, FormControl, InputLabel, MenuItem, Modal, Select, Typography } from "@mui/material";
import { Box } from "@mui/system";
import SelectInput from "@mui/material/Select/SelectInput";
import axios from "axios";
import { format } from "date-fns";
//moment-fns

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

export default function OrderHistory() {
    const dispatch = useDispatch();
    const { orders } = useSelector((state) => state.order);
    // const { login } = useSelector((state) => state.user);

    const [detailId, setDetailId] = React.useState();
    const [status, setstatus] = React.useState();
    const [orderId, setorderId] = React.useState();

    const [open, setOpen] = React.useState(false);
    // const [deleteOrder, setdeleteOrder] = React.useState();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // const handleChangeStatus = async () => {
    //     const config = {
    //         headers: {
    //             "Authorization": login.token
    //         }
    //     }
    //     const { data } = await axios.put(`/order/status/${orderId}`, { status }, config)
    //     console.log(data);
    // }

    useEffect(() => {
        dispatch(getAllOrderAction());
    }, [])


    return (<>
        <TableContainer component={Paper} style={{ overflow: "hidden" }}>
            {/* {JSON.stringify(orders)} */}
            <Table>
                <TableHead style={{ backgroundColor: "lightblue" }}>
                    <TableRow>
                        <TableCell>Sr no</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Mode</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Products</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map((item, index) => (
                        <>
                            <TableRow>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{format(new Date(item.createdAt), "dd-MMM-yyyy")}</TableCell>
                                <TableCell>{item.mode}</TableCell>
                                <TableCell>{item.status}</TableCell>
                                <TableCell>
                                    <ol>
                                        {item.products.map((single) => (
                                            <>
                                                <li>{single.productId.name}</li>
                                            </>
                                        ))}
                                    </ol>
                                </TableCell>
                                <TableCell><Button onClick={
                                    e => {
                                        handleOpen()
                                        setDetailId(index)
                                        setorderId(item._id)
                                    }
                                }>Details</Button></TableCell>
                            </TableRow>
                        </>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

        {/* modal */}
        <div>
            <Modal

                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Order Details
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Name : {orders[detailId]?.userId?.name}
                        <br />

                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="status"
                                value={status}
                                onChange={e => setstatus(e.target.value)}
                            >
                                <MenuItem value="placed">placed</MenuItem>
                                <MenuItem value="dispatch">Dispatched</MenuItem>
                                <MenuItem value="transit">In-transit</MenuItem>
                                <MenuItem value="delivered">Delivered</MenuItem>
                            </Select>
                            <Button onClick={e => {
                                // handleChangeStatus()
                                dispatch(updateOrderStatusAction(orderId, status))
                                dispatch(getAllOrderAction())
                            }}>Update Status</Button>
                        </FormControl>
                        <br />
                        Status : {orders[detailId]?.status}
                        <br />
                        Payment : {orders[detailId]?.mode}
                        <br />
                        {orders[detailId]?.products?.map(({ productId: { name, price, image, stock } }) =>
                            <>
                                <h2>Product : {name}</h2>
                                <h4>Price : {price}</h4>
                                <h4>Stock : {stock}</h4>
                                <img src={`http://localhost:5000/${image}`} height={150} width={150} alt="" />
                            </>
                        )}

                    </Typography>
                </Box>
            </Modal>
        </div>
        {/* modal end */}
    </>
    );
}