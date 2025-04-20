"use client";

import React, { useState, useEffect } from "react";
import { Layout, theme, Row, Col, Pagination, Button, Flex } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import MainLayout from "./components/layout";

export default function Home() {
  return (
    <MainLayout>
      <Row
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Col span={24} style={{ flex: "0 0 auto" }}>
          <Col>
            <LeftOutlined style={{ fontSize: "20px" }} />
          </Col>
          <Col style={{ marginTop: "10px" }}>
            <span>test</span> <br />
          </Col>
        </Col>
        <Col span={24} style={{ flex: "1 0 auto" }} />
        <Col
          span={24}
          style={{
            flex: "0 0 auto",
            marginTop: "auto",
            paddingBottom: "20px",
          }}
        >
          <Flex vertical gap="small" style={{ width: "100%" }}>
            <Button
              block
              style={{
                color: "#FFFFFF",
                backgroundColor: "#E18837",
                borderRadius: "16px",
              }}
            >
              ถัดไป
            </Button>
          </Flex>
        </Col>
      </Row>
    </MainLayout>
  );
}
