import { Spin } from "antd";
import React from "react";

function MainPageDash({ children,loading=false }) {
  return (
    <Spin spinning={loading}>
      <div>{children}</div>
    </Spin>
  );
}

export default MainPageDash;
