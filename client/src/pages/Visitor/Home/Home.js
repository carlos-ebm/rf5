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
      setPublicationPrincipal(response.publication);
    });
  });

  useEffect(()=>{
    getMostViewedPublicationBySectionVisitorApi(1).then((response)=>{
      setLastNationalPublication(response);
    })
    getMostViewedPublicationBySectionVisitorApi(2).then((response)=>{
      setLastInternationalPublication(response);
    })
    getMostViewedPublicationBySectionVisitorApi(3).then((response)=>{
      setLastSciencePublication(response);
    })
    getMostViewedPublicationBySectionVisitorApi(4).then((response)=>{
      setLastSportsPublication(response);
    })
  })

  const lastPublications = [];
  if(lastNationalPublication){
    //if(lastNationalPublication.visibility==1){
      lastPublications.push(lastNationalPublication);
    //}
  }
  if(lastInternationalPublication){
    //if(lastInternationalPublication.visibility==1){
     lastPublications.push(lastInternationalPublication);
    //}
  }
  if(lastSciencePublication){
    //if(lastSciencePublication.visibility==1){
     lastPublications.push(lastSciencePublication)
    //}
  }
  if(lastSportsPublication){
    //if(lastSportsPublication.visibility==1){
      lastPublications.push(lastSportsPublication);
    //}
  }
  var i=34;
  while (i < publications.length){

  console.log(moment(publications[i].publicationDate));
  
  var dateB = new Date();
  var dateC = moment(publications[i].publicationDate);
  var difCB = dateC.diff(dateB)

  console.log('Difference is ', dateC.diff(dateB),'milliseconds');

  if(difCB <= 0){
    setPublicPublicationApi(publications[i],publications[i]._id);
  }
  i++;
  }

  //console.log(publications);
  /*var i = 29;
  while (i < publications.length){
    console.log(i);
    console.log(publications[i].publicationDate);
    console.log(moment().format('HH:mm:ss'));
    console.log(moment().format('L'));
    console.log(moment(publications[i].publicationTime).format('HH:mm:ss'));
    console.log(moment(publications[i].publicationDate).format('L'));
    console.log(moment(publications[i].publicationTime).diff(publications[i].publicationDate));
    //str1.localeCompare(str2);

    //if(moment(publications[i].publicationDate).format('L') >= moment().format('L'))

    i++;
  }*/


  return (
<>
      <Row className="row">
        <Col className="row__col-left" span={16}>
            <PublicationsPreviewHome publicationPrincipal={publicationPrincipal} secondaryPublications={secondaryPublications}/>
        </Col>

        <Col className="row__col-right" span={6}>
          <Card className="row__col-right__mostviewed" title="Noticias más vistas">
            <ListMostViewed lastPublications={lastPublications}/>
          </Card>
        </Col>
      </Row>
    </>
  );
}
