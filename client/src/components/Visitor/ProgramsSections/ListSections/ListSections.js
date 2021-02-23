import React from "react";
import ProgramPreview from "../ProgramPreview";
import { Menu, Button, List, Space, Card, Divider, notification, Row, Col } from "antd";

import "./ListSections.scss";

export default function ListSections(props) {
  const { programs } = props;
  return (
    <>
      <Programs programs={programs} />
    </>
  );
}

function Programs(props) {
  const { programs } = props;
  return (
    <List
      //itemLayout="horizontal"
      size="small"
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 4,
        xl: 4,
        xxl: 4
       }}
      //grid={{ gutter: 16, column: 2}}
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 4,
      }}
      dataSource={programs}
      /*footer={
      }*/
      renderItem={(program) => 
        <Program program={program}/>
       }
    />
  );
}

function Program(props) {
  const { program } = props;
  return (
    <>
      {program.visibility==1?<ProgramPreview program={program} />: <></>}
    </>
  );
}
