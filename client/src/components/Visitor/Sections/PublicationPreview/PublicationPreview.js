import React, {useEffect, useState} from "react";
import { PUBLICATION_ID } from "../../../../utils/constants";
import { List, Card, Image, Avatar } from "antd"
import { StarOutlined, LikeOutlined, MessageOutlined} from "@ant-design/icons";

import moment from "moment";
import "moment/locale/es";

import {
  getImageApi, addViewToPublicationApi,
} from "../../../../api/publication";

import NoImage from "../../../../assets/img/png/no-image.png";

import "./PublicationPreview.scss";

export default function PublicationPreview(props) {
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

const addView = ()=> {
    const result = addViewToPublicationApi(publication, publication._id);
}

  return (
    <>
    <Card 
    hoverable
    className="card-publication"
    onClick={()=> {
      localStorage.setItem(PUBLICATION_ID, publication._id);
      addView();
      publication.section==1?window.location.href=`/national/${publication._id}`:
      publication.section==2?window.location.href=`/international/${publication._id}`:
      publication.section==3?window.location.href=`/science/${publication._id}`:
      publication.section==4?window.location.href=`/sports/${publication._id}`:window.location.reload()
    }}>
     <List.Item
      key={publication.title}
      actions={[
        moment(publication.creationDate).calendar()+` por `+
        publication.author
      ]}
      extra=
      {
        <img
          width={272}
          alt="logo"
          src={image ? image : NoImage}
        />
      }
      >
      <List.Item.Meta
        //image={<Avatar src={image ? image : NoImage} />}
        //image={publication.image}//avatar={<Avatar src={publication.avatar} />}
        title={<h3><b>{publication.title}</b></h3>}//title={<a href={publication.href}>{publication.title}</a>}
        //description={publication.description}
      />
      {publication.subtitle}
      </List.Item>
      </Card>
    </>
  );
}


