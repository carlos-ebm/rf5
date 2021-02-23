import React, { useState, useEffect } from "react";
import { Menu, Button, List, Space, Card, Divider, notification } from "antd";

import PublicationPreview from "../PublicationPreview";
import PublicationPreviewHome from "../PublicationPreview";

import "./ListPublications.scss";

export default function ListPublications(props) {
  const { publications, setReloadPublications } = props;

  //console.log(users);

  return (
    <Card className="list-publications__card">
      <Publications
        publications={publications}
        setReloadPublications={setReloadPublications}
      />
    </Card>
  );
}

function Publications(props) {
  const { publications } = props;

  const { setReloadPublications } = props;

  return (
    <List
      className="publications"
      itemLayout="horizontal"
      dataSource={publications}
      renderItem={(publication) => (
        <Publication
          publication={publication}
          setReloadPublications={setReloadPublications}
        />
      )}
    />
  );
}

function Publication(props) {
  const { publication, setReloadPublications } = props;
    return (
      <>
        <List.Item>
          <PublicationPreview publication={publication} />
        </List.Item>
      </>
    );
}
