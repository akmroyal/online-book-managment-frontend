import React, { Children } from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = ({ children }) => {
    const token = localStorage.getItem('token')
    if (!token) {
        return <Navigate to="/admin" replace={true} />
    }
    return children ? children : <Outlet />

}

export default AdminRoute;