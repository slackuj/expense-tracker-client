import './App.css'
import {AppRoutes} from "./components/AppRoutes.tsx";
import {ToastContainer} from "react-toastify";
import {Navbar} from "./components/NavBar.tsx";
import {getSessionPersistence, getUserAuth, useRefreshMutation} from "./features/auth/authSlice.ts";
import {useAppSelector} from "./hooks/storeHooks.ts";
import {type ReactNode, useEffect} from "react";
import {Spinner} from "./components/Spinner.tsx";

const App = () => {

    const [refreshUser, { isLoading }] = useRefreshMutation();
    const isAuthenticated = useAppSelector(getUserAuth);
    const isSessionPersisted = useAppSelector(getSessionPersistence);

    useEffect(() => {
        const refresh = async() => {
            try{
                await refreshUser().unwrap();
            } catch (error) {
                console.log("session expired");
            }
        };
        if (!isAuthenticated && isSessionPersisted) {
            refresh();
        }
    }, []);

    let content: ReactNode;
    if (isLoading) {
        content = (
            <Spinner text="Loading..." />
        );
    } else {
        content = (
            <>
            <AppRoutes />
        <ToastContainer position="bottom-right" autoClose={3000} />
            </>
        );
    }
  return (
      <>
          <Navbar />
          {content}
      </>
  )
};

export default App
