import { Spin } from "antd";

function MainPageDash({ children, loading = false }) {
  return (
    <Spin spinning={loading}>
      <div>{children}</div>
    </Spin>
  );
}

export default MainPageDash;
