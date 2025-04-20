"use client";

import React, { useState, useEffect } from "react";
import { Row, Col, Button, Flex, Form } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import axios from "axios";
import MainLayout from "@/app/components/layout";
import Question from "@/app/components/Question";

export default function Home({ dataSeq, dataQuestions }) {
  const { data } = dataSeq;
  const [form] = Form.useForm();
  const [allAnswers, setAllAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLastQuestion, setIsLastQuestion] = useState(false);
  const [isSurveyCompleted, setIsSurveyCompleted] = useState(false);
  
  useEffect(() => {
    setIsLastQuestion(currentQuestionIndex === dataQuestions.length - 1);
  }, [currentQuestionIndex, dataQuestions]);

  const currentQuestion = dataQuestions[currentQuestionIndex];

  const handleSubmitSurvey = async (finalAnswers) => {
    try {
      const formattedAnswers = Object.keys(finalAnswers).map(key => {
        const questionId = key.replace('question_', '');
        const question = dataQuestions.find(q => q.id === questionId);
        
        if (!question) return null;
        
        const answer = finalAnswers[key];
        
        switch (question.type) {
          case 'rank':
            return {
              questionId,
              optionId: null,
              textValue: answer.toString(),
              numericValue: 0
            };
            
          case 'radio':
            const selectedOption = question.options.find(opt => opt.optionValue === answer);
            return {
              questionId,
              optionId: selectedOption ? selectedOption.id : null,
              textValue: null,
              numericValue: parseInt(answer)
            };
            
          case 'text':
            return {
              questionId,
              optionId: null,
              textValue: answer,
              numericValue: 0
            };
            
          default:
            return null;
        }
      }).filter(item => item !== null);

      const payload = {
        ipAddress: "192.168.1.1",
        userAgent: "test",
        answers: formattedAnswers
      };
      const response = await axios.post(
        `/api/answer/${data.id}`,
        payload
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNext = async () => {
    try {
      await form.validateFields([`question_${currentQuestion.id}`]);

      const currentAnswer = form.getFieldValue(
        `question_${currentQuestion.id}`
      );
      setAllAnswers((prev) => ({
        ...prev,
        [`question_${currentQuestion.id}`]: currentAnswer,
      }));

      if (isLastQuestion) {

        const finalAnswers = {
          ...allAnswers,
          [`question_${currentQuestion.id}`]: currentAnswer,
        };

        await handleSubmitSurvey(finalAnswers);
        setIsSurveyCompleted(true);
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    } catch (errorInfo) {
      console.log("Validation failed:", errorInfo);
    }
  };

  useEffect(() => {
    form.setFieldsValue(allAnswers);
  }, [currentQuestionIndex, form, allAnswers]);

  if (isSurveyCompleted) {
    return (
      <MainLayout>
        <Row
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "center",
            textAlign: "center",
            padding: "20px",
          }}
        >
          <Col span={24}>
            <span className="anuphan-semibold" style={{ fontSize: "18px" }}>
              ขอบคุณที่ร่วมตอบแบบสอบถาม
            </span>
          </Col>
        </Row>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Form
        form={form}
        layout="vertical"
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Row
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            height: "100%",
          }}
        >
          <Col span={24} style={{ flex: "0 0 auto" }}>
            <Col>
              {currentQuestionIndex > 0 && (
                <LeftOutlined
                  style={{
                    fontSize: "20px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setCurrentQuestionIndex(currentQuestionIndex - 1);
                  }}
                />
              )}
            </Col>
            <Col style={{ marginTop: "15px", padding: "0 10px" }}>
              <Question
                form={form}
                question={currentQuestion}
                fieldName={`question_${currentQuestion?.id}`}
              />
            </Col>
          </Col>

          <Col span={24} style={{ flex: "1 0 auto" }} />

          <Col
            span={24}
            style={{
              flex: "0 0 auto",
              marginTop: "auto",
              padding: "20px 0",
              position: "sticky",
              bottom: 0,
              backgroundColor: "white",
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
                }}
                onClick={handleNext}
              >
                {isLastQuestion ? "ส่งคำตอบ" : "ถัดไป"}
              </Button>
            </Flex>
          </Col>
        </Row>
      </Form>
    </MainLayout>
  );
}
