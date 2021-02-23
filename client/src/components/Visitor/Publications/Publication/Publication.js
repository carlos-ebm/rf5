import React, { useState, useEffect } from "react";
import { Card } from "antd";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { Button } from "antd";
import { getPublicationsVisitorApi } from "../../../../api/publication";
import moment from "moment";
import "moment/locale/es";

import {
  getImageApi,
} from "../../../../api/publication";

import "./Publication.scss";

import NoImage from "../../../../assets/img/png/no-image.png";

export default function Publications(props) {
  const { publication } = props;

  const [image, setImage] = useState(null);

  useEffect(() => {
    if (publication.image) {
      getImageApi(publication.image).then((response) => {
        setImage(response);
      });
    } else {
      setImage(null);
    }
  }, [publication]);

  return (
    <>
      <Card className="card-publication" >
      <h1><b>{publication.title}</b></h1>
      <h4><i>{moment(publication.creationDate).calendar()+` por `+
        publication.author}</i></h4>
      <h1>{publication.subtitle}</h1>
      <img
              className="card-publication__image"
              alt="example"
              src={image ? image : NoImage}
            />
        <div dangerouslySetInnerHTML={{ __html: publication.content }} />
        <h1>{publication.author}</h1>
      </Card>
    </>
  );
}
