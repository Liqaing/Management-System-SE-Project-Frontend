
import { Header } from 'antd/es/layout/layout'
import React, { Component } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  Menu,
  Button,
} from "antd";

function LayoutAuth() {
  return (
    <>
        {/* <div>LayoutAuth</div> */}
        
        <Outlet />
    </>
  )
}

export default LayoutAuth