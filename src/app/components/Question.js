"use client";

import React from "react";
import { Rate, Radio, Space, Input, Form } from "antd";

const { TextArea } = Input;

export default function Question({ form, question, fieldName }) {
  if (!question) return null;

  const isRequired = question.settings?.some(
    setting => (setting.settingKey === "required" || setting.settingKey === "require") && 
               setting.settingValue === "true"
  );

  const renderRankQuestion = () => {
    const minSetting = question.settings.find((s) => s.settingKey === "min");
    const maxSetting = question.settings.find((s) => s.settingKey === "max");
    const minTitleSetting = question.settings.find(
      (s) => s.settingKey === "min_title"
    );
    const maxTitleSetting = question.settings.find(
      (s) => s.settingKey === "max_title"
    );

    const min = minSetting ? parseInt(minSetting.settingValue) : 1;
    const max = maxSetting ? parseInt(maxSetting.settingValue) : 5;
    const minTitle = minTitleSetting ? minTitleSetting.settingValue : "";
    const maxTitle = maxTitleSetting ? maxTitleSetting.settingValue : "";

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Form.Item
          name={fieldName}
          rules={[
            { 
              required: isRequired, 
              message: "กรุณาให้คะแนนความพึงพอใจ" 
            }
          ]}
          style={{ width: "100%", marginBottom: "0" }}
        >
          <Rate
            count={max}
            style={{ fontSize: 30 }}
          />
        </Form.Item>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            marginTop: "8px",
          }}
        >
          <span style={{ fontSize: "12px" }}>{minTitle}</span>
          <span style={{ fontSize: "12px" }}>{maxTitle}</span>
        </div>
      </div>
    );
  };

  const renderRadioQuestion = () => {
    const sortedOptions = [...question.options].sort(
      (a, b) => a.orderNum - b.orderNum
    );

    return (
      <Form.Item
        name={fieldName}
        rules={[
          { 
            required: isRequired, 
            message: "กรุณาเลือกคำตอบ" 
          }
        ]}
        style={{ marginTop: "10px" }}
      >
        <Radio.Group style={{ width: "100%" }}>
          <Space direction="vertical" style={{ width: "100%" }}>
            {sortedOptions.map((option) => (
              <Radio
                key={option.id}
                value={option.optionValue}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #e8e8e8",
                  borderRadius: "8px",
                  marginBottom: "8px",
                }}
              >
                {option.optionText}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      </Form.Item>
    );
  };

  const renderTextQuestion = () => {
    const maxLengthSetting = question.settings.find(s => s.settingKey === "max_length");
    const maxLength = maxLengthSetting ? parseInt(maxLengthSetting.settingValue) : null;

    return (
      <Form.Item
        name={fieldName}
        rules={[
          { 
            required: isRequired, 
            message: "กรุณากรอกคำตอบ" 
          }
        ]}
        style={{ marginTop: "10px" }}
      >
        <TextArea
          placeholder="กรุณาพิมพ์คำตอบของคุณที่นี่"
          maxLength={maxLength}
          autoSize={{ minRows: 3, maxRows: 6 }}
          showCount={maxLength !== null}
        />
      </Form.Item>
    );
  };

  const renderQuestionByType = () => {
    switch (question.type) {
      case "rank":
        return renderRankQuestion();
      case "radio":
        return renderRadioQuestion();
      case "text":
        return renderTextQuestion();
      default:
        return <div>ไม่รองรับประเภทคำถามนี้</div>;
    }
  };

  return (
    <>
      <span className="anuphan-semibold">
        {question.title}
      </span>
      {renderQuestionByType()}
    </>
  );
}