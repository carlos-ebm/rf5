import React, { useEffect, useState } from "react";
import { Card, List } from "antd";
import "./MostViewedPreview.scss";
import { PUBLICATION_ID } from "../../../../utils/constants";

import { getImageApi, addViewToPublicationApi } from "../../../../api/publication";

import moment from "moment";
import "moment/locale/es";

import NoImage from "../../../../assets/img/png/no-image.png";

export default function MostViewedPreview(props) {
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
        className="card-mostviewed"
        cover={<img alt="Portada" src={image ? image : NoImage} />}
        onClick={() => {
          localStorage.setItem(PUBLICATION_ID, publication._id);
          addView();
          publication.section==1?window.location.href=`/national/${publication._id}`:
          publication.section==2?window.location.href=`/international/${publication._id}`:
          publication.section==3?window.location.href=`/science/${publication._id}`:
          publication.section==4?window.location.href=`/sports/${publication._id}`:window.location.reload()
        }}
      >
        <List.Item
          key={publication.title}
          actions={[
            publication.section==1?<i>{"Nacional"}</i>:
            publication.section==2?<i>{"Internacional"}</i>:
            publication.section==3?<i>{"Ciencia"}</i>:
            publication.section==4?<i>{"Deportes"}</i>:"Otros"
          ]}
          //extra={<img width={272} alt="logo" src={image ? image : NoImage} />}
        >
          <List.Item.Meta
            //image={<Avatar src={image ? image : NoImage} />}
            //image={program.image}//avatar={<Avatar src={program.avatar} />}
            title={publication.title} //title={<a href={program.href}>{program.title}</a>}
            //description={program.description}
          />
          
        </List.Item>
      </Card>
    </>
  );
}
