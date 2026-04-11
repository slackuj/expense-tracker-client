import {useRegisterMutation} from "./authSlice.ts";
import {type ReactNode, useEffect} from "react";
import {useNavigate} from "react-router";
import {Box, Button, TextField, Typography} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import {toast} from "react-toastify";
import {UserRegisterRequestSchema} from "../../schemas/authSchema";
import type {UserRegisterRequest} from "../../types/auth.ts";

export const RegisterPage = () => {
    const [registerUser, { isLoading, isSuccess }] = useRegisterMutation();
    const navigate = useNavigate();

    const {
        handleSubmit,
        register,
        trigger,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(UserRegisterRequestSchema),
        mode: "onChange"
    });

    const onSubmit = async (data: UserRegisterRequest) => {
        try{
            await registerUser(data).unwrap();
        } catch (error) {
            console.error('Failed to Register', error);
            // handle error received explicitly
            toast("Error Registering: Please Try Again", {type: "error"});
        }
    };

    // if user is registered in, navigate to user's home page
    useEffect(() => {
        if (isSuccess) {
            navigate(`/login`);
            toast.success("Register successfully: Please Login",{
                autoClose: 5000,
                hideProgressBar: true,
            });
        }
    }, [isSuccess, navigate]);

    let boxContent: ReactNode = (
        <>
            <TextField label="Name" {...register("name")} error={!!errors.name} helperText={errors.name?.message} />
            <TextField label="Email" {...register("email")} error={!!errors.email} helperText={errors.email?.message} />
            {/* // Toggle password show/hide based on an icon. Use `useState` to track the password */}
            <TextField
                label="Password"
                {...register("password", {
                    onChange: () => {
                        trigger("confirmPassword");
                    }
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
                type={"password"}
            />
            <TextField
                label="Confirm Password" {...register("confirmPassword")}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                type={"password"}
            />
            <Button type='submit' variant='contained' color='primary' fullWidth disabled={isLoading} loading={isLoading}>Register</Button>
        </>
    );

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
                    }}>Register</Typography>
                </Box>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{
                        display:"flex",
                        flexDirection:"column",
                        gap:"2",
                        maxWidth:"400",
                        margin:"0 auto",
                    }}>
                        {boxContent}
                    </Box>
                </form>
            </Box>
        </>
    );
};