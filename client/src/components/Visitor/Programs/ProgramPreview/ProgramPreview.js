import React from "react";
import { Card, Space } from "antd";

import "./ProgramPreview.scss";

const { Meta } = Card;

export default function ProgramPreview(props) {
  const { program } = props;

  return (
    <>
 
        <Card
          hoverable
          className="card"
          cover={
            <img
              className="card__image"
              alt="example"
              src={"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"}
            />
          }
        >
          <Meta
            title={program.title}
            description={program.author}
          />
        </Card>
 
    </>
  );
}
