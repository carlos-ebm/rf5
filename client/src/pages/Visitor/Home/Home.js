import React, { useState, useEffect } from "react";
import ListMostViewed from "../../../components/Visitor/MostViewed/ListMostViewed";
import { Row, Col, Card, List } from "antd";
import PublicationsPreviewHome from "../../../components/Visitor/Publications/PublicationsPreviewHome";

import { 
  getSecondaryPublicationsVisitorApi, 
  getPrincipalPublicationVisitorApi, 
  getMostViewedPublicationBySectionVisitorApi,
  getPublicationsVisitorApi,
  setPublicPublicationApi 
} from "../../../api/publication";

import "./Home.scss";
import Password from "antd/lib/input/Password";

import moment from "moment";
import "moment/locale/es";

export default function Home() {
  const [publications, setPublications] = useState([]);
  const [secondaryPublications, setSecondaryPublications] = useState([]);
  const [lastNationalPublication, setLastNationalPublication] = useState([]);
  const [lastInternationalPublication, setLastInternationalPublication] = useState([]);
  const [lastSciencePublication, setLastSciencePublication] = useState([]);
  const [lastSportsPublication, setLastSportsPublication] = useState([]);
  const [publicationPrincipal, setPublicationPrincipal] = useState([]);

  useEffect(() => {
    getPublicationsVisitorApi().then((response)=>{
      setPublications(response.publications);
    });
    getSecondaryPublicationsVisitorApi().then((response) => {
      setSecondaryPublications(response.secondaryPublications);
    });
    getPrincipalPublicationVisitorApi().then((response)=>{
      if(response.publication){
        setPublicationPrincipal(response.publication);
      }
    });
    getMostViewedPublicationBySectionVisitorApi(1).then((response)=>{
      if(response){
      setLastNationalPublication(response);
      }
    });
    getMostViewedPublicationBySectionVisitorApi(2).then((response)=>{
      if(response){
      setLastInternationalPublication(response);
      }
    });
    getMostViewedPublicationBySectionVisitorApi(3).then((response)=>{
      if(response){
      setLastSciencePublication(response);
      }
    });
    getMostViewedPublicationBySectionVisitorApi(4).then((response)=>{
      if(response){
      setLastSportsPublication(response);
      }
    });
  },[]);

  const lastPublications = [];
  if(lastNationalPublication){
      lastPublications.push(lastNationalPublication);
  }
  if(lastInternationalPublication){
     lastPublications.push(lastInternationalPublication);
  }
  if(lastSciencePublication){
     lastPublications.push(lastSciencePublication)
  }
  if(lastSportsPublication){
      lastPublications.push(lastSportsPublication);
  }


  useEffect(()=>{
    var i=0;
    while (i < publications.length){
    var dateB = new Date();
    var dateC = moment(publications[i].publicationDate);
    var difCB = dateC.diff(dateB)
    //console.log(difCB);
      if(difCB <= 0){
        setPublicPublicationApi(publications[i],publications[i]._id);
      }
    i++;
    }
  })

  return (
<>
      <Row className="row">
        <Col className="row__col-left" span={16}>
            <PublicationsPreviewHome publicationPrincipal={publicationPrincipal} secondaryPublications={secondaryPublications}/>
        </Col>

        <Col className="row__col-right" span={6}>
          <Card className="row__col-right__mostviewed" title="Noticias recientes">
            <ListMostViewed lastPublications={lastPublications}/>
          </Card>
        </Col>
      </Row>
    </>
  );
}
