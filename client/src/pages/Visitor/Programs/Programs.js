import React, {useState, useEffect} from "react";
import { Menu, Button, Card, Row } from "antd";
import ListPrograms from "../../../components/Visitor/ProgramsSections/ListSections";
import { getProgramsVisitorApi } from "../../../api/program";

import { getAccessTokenApi } from "../../../api/auth";

import "./Programs.scss";

export default function Programs() {
  const [ programs, setPrograms] = useState([]);
  const [ reloadPrograms, setReloadPrograms ] = useState(false);
  const token = getAccessTokenApi();

  useEffect( () => {
    getProgramsVisitorApi().then(response => {
      setPrograms(response.programs);
    });
  },);
  
  return (
    <>
      <Row className="top-sponsor" > <div className="top-sponsor__div" > <Card className="top-sponsor__card"> Patrocinadores </Card> </div></Row>
      <Row className="bottom-programs"><ListPrograms programs={programs} /></Row>
    </>
  );
}
