import React from "react";
import {List} from "antd";
import MostViewPreview from "../MostViewedPreview";

export default function ListMostViewed(props){
    const { lastPublications, publications } = props;

    return (
      <div>
        <Publications lastPublications={lastPublications} publications={publications}/>
      </div>
    );
  }
  
  function Publications(props) {
    const { lastPublications, publications } = props;
    return (
      <List
        itemLayout="vertical"
        size="large"
        dataSource={lastPublications? lastPublications: publications}
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