import React, { useState, useEffect } from "react";
import { Menu, Button, List, Space, Card, Divider, notification } from "antd";

import ProgramPreview from "../ProgramPreview";
import ProgramPreviewHome from "../ProgramPreview";

import "./ListPrograms.scss";

export default function ListPrograms(props) {
  const { programs, setReloadPrograms } = props;

  //console.log(users);

  return (
    <Card className="list-programs__card">
      <Programs programs={programs} setReloadPrograms={setReloadPrograms} />
    </Card>
  );
}

function Programs(props) {
  const { programs } = props;
  const { setReloadPrograms } = props;

  return (
    <List
      className="programs"
      grid={{ gutter: 16, column: 4 }}
      dataSource={programs}
      renderItem={(program) => <Program program={program} />}
    />
  );
}

function Program(props) {
  const { program } = props;
  return (
    <>
      <List.Item>
        <ProgramPreview program={program} />
      </List.Item>
    </>
  );
}
