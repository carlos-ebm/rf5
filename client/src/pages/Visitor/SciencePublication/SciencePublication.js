import React, { useEffect, useState } from "react";
import Publication from "../../../components/Visitor/Publications/Publication";
import { PUBLICATION_ID } from "../../../utils/constants";

import {Card} from "antd";

import { getPublicationVisitorApi } from "../../../api/publication";

export default function SciencePublication() {
  const [publication, setPublication] = useState([]);

  useEffect(() => {
    getPublicationVisitorApi(localStorage.getItem(PUBLICATION_ID)).then(
      (response) => {
        setPublication(response.publicationData);
      }
    );
  });

  return (
    <>
      <Publication publication={publication} />
    </>
  );
}
