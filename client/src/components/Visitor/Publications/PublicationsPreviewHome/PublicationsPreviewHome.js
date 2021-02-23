import React from "react";
import { Card, List, Row } from "antd";

import "./PublicationsPreviewHome.scss";

import PublicationPreview from "../PublicationPreview";
import PublicationPreviewPrincipal from "../PublicationPreviewPrincipal";
import Publications from "../../../../pages/Admin/Publications/Publications";

export default function PublicationsPreviewHome(props) {
  const { publicationPrincipal, publications } = props;

  return (
    <>
      <Row className="row-principal">
        <PublicationPreviewPrincipal
          publicationPrincipal={publicationPrincipal}
        />
      </Row>

      <Row className="row-secondary">
        <List
          size="small"
          //grid={{ gutter: 8, column: 2 }}
          grid={{
            gutter: 16,
            xs: 1,
            sm: 1,
            md: 2,
            lg: 2,
            xl: 2,
            xxl: 2,
            column: 2
          }}
          dataSource={publications}
          renderItem={(publication) => (
            <List.Item>
             <div className="row-secondary__item" ><PublicationPreview publication={publication} /></div>
            </List.Item>
          )}
        />
      </Row>
    </>
  );
}
