import React from "react";
import {List} from "antd";
import MostViewPreview from "../MostViewedPreview";

export default function ListMostViewed(props){
    const { lastPublications, publications, publicationsMostviewed } = props;

    return (
      <div>
        <Publications lastPublications={lastPublications} publications={publications} publicationsMostviewed={publicationsMostviewed}/>
      </div>
    );
  }
  
  function Publications(props) {
    const { lastPublications, publications, publicationsMostviewed } = props;
    return (
      <List
        itemLayout="vertical"
        size="large"
        dataSource={
                    lastPublications? lastPublications: 
                    publications? publications:
                    publicationsMostviewed? publicationsMostviewed:<></>
                  }
        /*footer={
        }*/
        renderItem={(publication) => 
           <Publication publication={publication}/>
         }
      />
    );
  }
  
  function Publication(props) {
    const { publication } = props;
    return (
      <>
        <MostViewPreview publication={publication} />
      </>
    );
  }