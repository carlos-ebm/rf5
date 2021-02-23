import React, {useState, useEffect} from "react";
import { Space, Card } from "antd";
import { PUBLICATION_ID } from "../../../../utils/constants";
import NoImage from "../../../../assets/img/png/no-image.png";
import {
  getImageApi, addViewToPublicationApi,
} from "../../../../api/publication";

import "./PublicationPreview.scss";

const { Meta } = Card;

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
          className="card-secondary"
          onClick={()=> {
            localStorage.setItem(PUBLICATION_ID, publication._id);
            addView();
            publication.section==1?window.location.href=`/national/${publication._id}`:
            publication.section==2?window.location.href=`/international/${publication._id}`:
            publication.section==3?window.location.href=`/science/${publication._id}`:
            publication.section==4?window.location.href=`/sports/${publication._id}`:window.location.reload()
          }}
          cover={
            <img
              className="card-secondary__image"
              alt="example"
              src={image ? image : NoImage}
            />
          }
        >
          <Meta
            title={publication.title}
            description={
              publication.subtitle,
              <h5>por <i>{publication.author}</i></h5>
            }
          />
        </Card>
 
    </>
  );
}
