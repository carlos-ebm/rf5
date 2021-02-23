import React from "react";
import PublicationPreview from "../PublicationPreview";
import { Menu, Button, List, Space, Card, Divider, notification } from "antd";

import "./ListSections.scss";

export default function ListSections(props) {
  const { publications } = props;
  return (
    <div className="list-sections">
      <Publications publications={publications} />
    </div>
  );
}

function Publications(props) {
  const { publications } = props;
  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 3,
      }}
      dataSource={publications}
      /*footer={
      }*/
      renderItem={(publication) => 
          <Publication publication={publication}/>
       }
    />
  );
}

function Publication(props) {
  const { publication } = props;
  return (
    <>
      {publication.visibility==1?<PublicationPreview publication={publication} />:<></>}
    </>
  );
}
