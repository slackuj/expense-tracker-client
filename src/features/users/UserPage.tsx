import {
    Box,
    CircularProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import {useAppSelector} from "../../hooks/storeHooks.ts";
import {selectUserById, useGetUserQuery} from "./usersSlice.ts";
import {useLocation, useParams} from "react-router";
import {getUserId} from "../auth/authSlice.ts";

export const UserPage = () => {
    const { id } = useParams();
    const { pathname } = useLocation();
    const currentUserId = useAppSelector(getUserId);
    const userId = id ?? pathname === '/users/me' ? currentUserId : undefined;

    const cachedUser = useAppSelector((state) => selectUserById(state, userId!));

    const {
        data: user,
        isLoading
    } = useGetUserQuery( userId!, { skip: !!cachedUser });

    const User = cachedUser ?? user;
    if (isLoading) return <CircularProgress />;
    if (!User) return <span>No User Found</span>;

    let tableHeader = (
        <TableHead>
            <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Roles</TableCell>
            </TableRow>
        </TableHead>
    );

    let tableBody = (
        <TableBody>
                <TableRow key={User.id}>
                    <TableCell component="th" scope="row">
                        {User.id}
                    </TableCell>
                    <TableCell align="right">{User.name}</TableCell>
                    <TableCell align="right">{User.email}</TableCell>
                    <TableCell align="right">{User.roles.map(role => role).join(", ")}</TableCell>
                </TableRow>
        </TableBody>
    );

    return (
            <Box sx={{
                margin:"40px auto",
                padding:"4",
                borderRadius:"2"
            }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="Table showing all User data">
                        {tableHeader}
                        {tableBody}
                    </Table>
                </TableContainer>
            </Box>
    );
};