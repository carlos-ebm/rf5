import React, { useEffect, useState } from "react";
import Publication from "../../../components/Visitor/Publications/Publication";
import { PUBLICATION_ID } from "../../../utils/constants";

import { getPublicationVisitorApi } from "../../../api/publication";

export default function NationalPublication() {
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




