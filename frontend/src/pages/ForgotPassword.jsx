import React, { useState } from 'react';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { forgetPasswordAction } from '../store/actions/userAction';



export default function ForgetPassword() {
    const [email, setemail] = useState()
    const dispatch = useDispatch()
    const handleResetPassword = () => {
        dispatch(forgetPasswordAction(email))
    }

    return (
        <Box sx={{ maxWidth: "100%", margin: "10% 25%" }}>
            <Stack spacing={3}>

                <CardContent>
                    <Typography variant="h4" color="text.secondary" gutterBottom>
                        Trouble with logging in?

                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Enter your Email Address and we'll send you a link to reset your password.
                    </Typography>

                    <TextField
                        fullWidth
                        id="filled-basic"
                        label="Email"
                        variant="filled"
                        value={email}
                        onChange={e => setemail(e.target.value)}
                        size="small" />
                    <br /><br /><br />
                    <Button
                        size="medium"
                        variant="contained"
                        color="success"
                        onClick={handleResetPassword}
                    >Reset</Button>
                </CardContent>
            </Stack>
        </Box >
    );
}
