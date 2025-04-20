"use client";

import React, { useState, useEffect } from "react";
import { Rate, Radio, Space, Input } from "antd";

const { TextArea } = Input;

export default function Question({ question, isLastQuestion }) {

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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "10px 0",
            width: "100%",
          }}
        >
          <Rate
            count={max}
            style={{ fontSize: 30 }}
          />
        </div>
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
      <Radio.Group
        style={{ width: "100%", marginTop: "10px" }}
      >
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
    );
  };

  const renderTextQuestion = () => {
    const maxLengthSetting = question.settings.find(s => s.settingKey === "max_length");
    const maxLength = maxLengthSetting ? parseInt(maxLengthSetting.settingValue) : null;

    return (
      <TextArea
        placeholder="กรุณาพิมพ์คำตอบของคุณที่นี่"
        maxLength={maxLength}
        autoSize={{ minRows: 3, maxRows: 6 }}
        showCount={maxLength !== null}
        style={{marginTop: "10px"}}
      />
    );
  };

  const renderQuestionByType = () => {
    switch (question?.type) {
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
      {isLastQuestion ? (
        <span className="anuphan-semibold">ขอบคุณที่ร่วมตอบแบบสอบถาม</span>
      ) : (
        <>
          <span className="anuphan-semibold">
            {question ? question.title : ""}
          </span>
          {renderQuestionByType()}
        </>
      )}
    </>
  );
}
