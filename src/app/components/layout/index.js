"use client";

import React, { useState, useEffect } from "react";
import { Layout, Typography, Row, Col, Spin, ConfigProvider } from "antd";
import Image from "next/image";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

export default function MainLayout({ children }) {
  const [loading, setLoading] = useState(false);

  return (
    <Row
      justify="space-around"
      align="middle"
      style={{ backgroundColor: "#f2f2f2", height: "100%" }}
    >
      <Col
        xs={24}
        sm={24}
        md={12}
        style={{ height: "100%", padding: "80px 0" }}
      >
        <Layout
          style={{
            backgroundColor: "unset",
            maxWidth: "375px",
            width: "100%",
            margin: "0 auto",
            background: "#fff",
            maxHeight: "736px",
            height: "100%",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Header
            style={{
              display: "flex",
              backgroundColor: "unset",
              padding: "0 10px",
              alignItems: "center",
            }}
          >
            <Image alt="logo" width={60} height={30} src={`/images/logo.png`} />
          </Header>
          <Content style={{ padding: "0 15px", height: "100%" }}>
            {children}
          </Content>
        </Layout>
      </Col>
    </Row>
  );
}
