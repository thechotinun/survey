"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import '@ant-design/v5-patch-for-react-19';

export default function ProviderWrapper({ children }) {
  return (
    <AntdRegistry>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: "var(--font-anuphan-light)",
            colorPrimary: "#E18837",
          },
          components: {
            Button: {
              fontFamily: "var(--font-anuphan-semibold)",
            },
            Typography: {
              fontWeightStrong: 600,
            }
          }
        }}
      >
        {children}
      </ConfigProvider>
    </AntdRegistry>
  );
}