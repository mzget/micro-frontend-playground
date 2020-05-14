import React from "react";
import Sidenav from "./Sidenav";
import MobileSidenav from "./MobileSidenav";

const SidenavContainer = ({ children }) => (
    <div className="app-sidenav-container">
        <MobileSidenav />
        <Sidenav>{children}</Sidenav>
    </div>
);

export default SidenavContainer;
