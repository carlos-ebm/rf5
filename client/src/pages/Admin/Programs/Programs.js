import React, {useState, useEffect} from "react";
import { Menu, Button, Table } from "antd";
import ListPrograms from "../../../components/Admin/Programs/ListPrograms";
import { getProgramsApi } from "../../../api/program";

import { getAccessTokenApi } from "../../../api/auth";

import "./Programs.scss";

export default function Programs() {
  const [ programs, setPrograms] = useState([]);
  const [ reloadPrograms, setReloadPrograms ] = useState(false);
  const token = getAccessTokenApi();

  useEffect( () => {
    getProgramsApi(token).then(response => {
      setPrograms(response.programs);
    });
    setReloadPrograms(false);
  }, [token, reloadPrograms]);
  
  return (
    <>
      <ListPrograms programs={programs} setReloadPrograms={setReloadPrograms} />
    </>
  );
}
