"use client";

import React, { useState, useEffect } from "react";
import { Row, Col, Button, Flex } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import MainLayout from "@/app/components/layout";
import Question from "@/app/components/Question";

export default function Home({ dataSeq, dataQuestion }) {
  const { id, status } = dataSeq;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLastQuestion, setIsLastQuestion] = useState(false);

  useEffect(() => {
    setIsLastQuestion(currentQuestionIndex === dataQuestion.length);
  }, [currentQuestionIndex, dataQuestion]);

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
            <LeftOutlined
              style={{ fontSize: "20px", display: isLastQuestion ? "none" : "unset"}}
              onClick={() => {
                currentQuestionIndex !== 0 &&
                  setCurrentQuestionIndex(currentQuestionIndex - 1);
              }}
            />
          </Col>
          <Col style={{ marginTop: "15px", padding: "0 10px" }}>
            <Question question={dataQuestion[currentQuestionIndex]} isLastQuestion={isLastQuestion}/>
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
                fontWeight: "bold",
                display: isLastQuestion ? "none" : "block"
              }}
              onClick={() => {
                if (!isLastQuestion) {
                  setCurrentQuestionIndex(currentQuestionIndex + 1);
                }
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
