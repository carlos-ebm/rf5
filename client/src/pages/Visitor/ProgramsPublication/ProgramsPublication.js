import React, { useEffect, useState } from "react";
import Program from "../../../components/Visitor/Programs/Program";
import { PROGRAM_ID } from "../../../utils/constants";

import {Card} from "antd";
import "./ProgramPublication.scss";

import { getProgramVisitorApi } from "../../../api/program";
import { List } from "antd/lib/form/Form";

export default function ScienceProgram() {
  const [program, setProgram] = useState([]);

  useEffect(() => {
    getProgramVisitorApi(localStorage.getItem(PROGRAM_ID)).then(
      (response) => {
        setProgram(response.programData);
      }
    );
  });

  return (
    <>
   <div className="program-publication" >
    <Card className="program-publication__card" >
      <Program program={program} />
    </Card>
    </div> 
    </>
  );
}
