import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import {appPermissions} from "../constants/permissions";
import {appRoles} from "../constants/roles";
import {getUserAuth, getUserPermissions, getUserRoles, useLogoutMutation} from "../features/auth/authSlice.ts";
import {toast} from "react-toastify";
import {apiSlice} from "../api/apiSlice.ts";
import type {ReactNode} from "react";
import {clearTokens} from "../utils/tokenUtil.ts";

export const Navbar = () => {
    const navigate = useNavigate();
    const isAuthenticated = useAppSelector(getUserAuth);
    const roles = useAppSelector(getUserRoles);
    const permissions = useAppSelector(getUserPermissions);
    const [logoutUser] = useLogoutMutation();
    const dispatch = useAppDispatch();

    const handleLogout = async () => {
        // implement this globally later
        if (!navigator.onLine) {
            console.error("Offline: Please Check Your Internet Connection!");
            toast.error(
                "Offline: Please Check Your Internet Connection!",{
                    autoClose: false,
                    hideProgressBar: true,
                }
                );
        }
        try{
            await logoutUser().unwrap();
            navigate("/");
            dispatch(apiSlice.util.resetApiState());
            clearTokens();
        } catch (error) {
            console.error("logout failed on server", error);
        }
    };

    const typographyContent: ReactNode = (
        <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={() => navigate("/")}
        >
            Expense Tracker
        </Typography>
    );
    let boxContent: ReactNode;
    if (isAuthenticated) {
        const doesUserHaveViewPermission = roles!.includes(appRoles.SUPER_ADMIN.name) || permissions!.includes(appPermissions.VIEW_USERS.name);
        boxContent = (
            <>
                { doesUserHaveViewPermission &&
                    <Button color="inherit" onClick={() => navigate("/users")}>View All Users</Button>
                }
                <Button color="inherit" onClick={() => navigate("/users/me")}>Profile</Button>
                <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </>
        );
    } else {
        boxContent = (
            <>
                <Button color="inherit" onClick={() => navigate("/register")}>
                    Register
                </Button>
                <Button color="inherit" onClick={() => navigate("/login")}>
                    Login
                </Button>
            </>
        );
    }

    return (
        <AppBar position="static">
            <Toolbar>
                {typographyContent}
                <Box>
                    {boxContent}
                </Box>
            </Toolbar>
        </AppBar>
    );
};