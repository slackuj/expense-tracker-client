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
import {selectAllUsers, useGetUsersQuery} from "./usersSlice.ts";
import {useNavigate} from "react-router";

export const AllUsersPage = () => {

    const {
        isLoading,
        isError,
        error
    } = useGetUsersQuery();

    const users = useAppSelector(selectAllUsers);
    const navigate = useNavigate();
    if (isLoading) return <CircularProgress />;
    if (isError) {
        console.error(error);
        //toast.error(`${error}`);
        return <span>Error loading users.</span>;
    }

    if (!users) {
        return (
            <span>No Users Found</span>
        );
    }

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
            {Object.values(users).map((user) => (
                <TableRow key={user.id}>
                    <TableCell component="th" scope="row" onClick={() => navigate(`/users/${user.id}`)}>
                        {user.id}
                    </TableCell>
                    <TableCell align="right">{user.name}</TableCell>
                    <TableCell align="right">{user.email}</TableCell>
                    <TableCell align="right">{user.roles.map(role => role).join(", ")}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    );

    return (
            <Box sx={{
                margin:"40px auto",
                padding:"4",
                borderRadius:"2"
            }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="Table showing all user data">
                        {tableHeader}
                        {tableBody}
                    </Table>
                </TableContainer>
            </Box>
    );
};