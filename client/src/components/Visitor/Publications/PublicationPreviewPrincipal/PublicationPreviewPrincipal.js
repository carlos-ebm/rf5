import React, {useState, useEffect} from "react";
import { Space, Card } from "antd";
import { PUBLICATION_ID } from "../../../../utils/constants";
import NoImage from "../../../../assets/img/png/no-image.png";
import {
  getImageApi, addViewToPublicationApi,
} from "../../../../api/publication";

import "./PublicationPreviewPrincipal.scss";
const { Meta } = Card;

export default function PublicationPreviewPrincipal(props) {
  const { publicationPrincipal } = props;
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (publicationPrincipal.image) {
      getImageApi(publicationPrincipal.image).then((response) => {
        setImage(response);
      });
    } else {
      setImage(null);
    }
  }, [publicationPrincipal]);

  const addView = ()=> {
    const result = addViewToPublicationApi(publicationPrincipal, publicationPrincipal._id);
  }

  return (
    <>
        <Card
          hoverable
          className="card-principal"
          onClick={()=> {
            localStorage.setItem(PUBLICATION_ID, publicationPrincipal._id);
            addView();
            publicationPrincipal.section==1?window.location.href=`/national/${publicationPrincipal._id}`:
            publicationPrincipal.section==2?window.location.href=`/international/${publicationPrincipal._id}`:
            publicationPrincipal.section==3?window.location.href=`/science/${publicationPrincipal._id}`:
            publicationPrincipal.section==4?window.location.href=`/sports/${publicationPrincipal._id}`:window.location.reload()
          }}
          cover={
            <img
              className="card-principal__image"
              alt="Portada"
              src={image ? image : NoImage}
            />
          }
        >
          <Meta
            title={publicationPrincipal.title}
            description={publicationPrincipal.subtitle}
          />
        </Card>
    </>
  );
}
