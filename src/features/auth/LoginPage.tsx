import {getUserAuth, getUserId, useLoginMutation} from "./authSlice.ts";
import {useEffect} from "react";
import {useNavigate} from "react-router";
import {useAppSelector} from "../../hooks/storeHooks.ts";
import {Box, Button, TextField, Typography} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import {toast} from "react-toastify";
import {UserLoginRequestSchema} from "../../schemas/authSchema";
import type {UserLoginRequest} from "../../types/auth.ts";

export const LoginPage = () => {
    const [loginUser, { isLoading }] = useLoginMutation();
    const navigate = useNavigate();
    const isAuthenticated = useAppSelector(getUserAuth);
    const userId = useAppSelector(getUserId);

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(UserLoginRequestSchema),
        mode: "onBlur"
    });

    const onSubmit = async (data: UserLoginRequest) => {
        try{
            await loginUser(data).unwrap();
        } catch (error) {
            console.error('failed to log in', error);
            // handle error
            toast("Error logging in", {type: "error"});
        }
    };

    // if user is logged in, navigate to user's home page
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/users/me');
        }
    }, [isAuthenticated, userId, navigate]);

    return (
        <>
            <Box  sx={{
                margin:"40px auto",
                maxWidth:"600",
                padding:"4",
                boxShadow:"0 0 10px rgba(0,0,0,0.1)",
                borderRadius:"2",
            }}>
                <Box>
                    <Typography sx={{
                        variant:'h1',
                        fontSize:"36",
                    }}>Login</Typography>
                </Box>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{
                        display:"flex",
                        flexDirection:"column",
                        gap:"2",
                        maxWidth:"400",
                        margin:"0 auto",
                    }}>
                        <TextField label="Email" {...register("email")} error={!!errors.email} helperText={errors.email?.message} />
                        {/* // Toggle password show/hide based on an icon. Use `useState` to track the password */}
                        <TextField label="Password" {...register("password")} error={!!errors.password} helperText={errors.password?.message}  />
                        <Button type='submit' variant='contained' color='primary' fullWidth disabled={isLoading} loading={isLoading}>Login</Button>
                    </Box>
                </form>
            </Box>
        </>
    );
};