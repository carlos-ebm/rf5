import React, { useState , useEffect } from "react";
import PublicationsPreviewHome from "../../../components/Visitor/Publications/PublicationsPreviewHome";

import {
    getPublicationsVisitorApi,
  } from "../../../api/publication";

import "./Home.scss";

export default function Home() {

    const [ publications, setPublications] = useState([]);

    useEffect( () => {
        getPublicationsVisitorApi().then(response => {
          setPublications(response.publications);
        });
      });

      console.log(publications.length);

    return(
        <div></div>
    )

}

