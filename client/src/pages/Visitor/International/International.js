import React, { useEffect, useState} from "react";
import "./International.scss";
import News from "../../../components/Visitor/News";
import ListMostViewed from "../../../components/Visitor/MostViewed/ListMostViewed";
import ListSections from "../../../components/Visitor/Sections/ListSections";
import {getPublicationsSectionVisitorApi} from "../../../api/publication";


import { Row, Col, Card } from "antd";

export default function International() {
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    getPublicationsSectionVisitorApi(2).then((response) => {
      setPublications(response);
    });
  });

  return (
    <>
      <Row className="row">
        <Col className="row__left-news" flex={4}>
          <ListSections publications={publications}/>
        </Col>
        <Col className="row__right-news" flex={1}>
          <Card className="row__right-news__ads">
            <h1>Anuncios</h1>
          </Card>
          <Card className="row__right-news__related" title="Noticias relacionadas">
            <ListMostViewed publications={publications}/>
          </Card>
          </Col>
      </Row>
      <Card className="sponsors">
        <h1>Patrocinadores</h1>
      </Card>
    </>
  );
}
