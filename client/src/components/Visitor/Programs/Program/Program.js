import React, { useState, useEffect } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { Button } from "antd";
import { getProgramsVisitorApi } from "../../../../api/program";
import { Card } from "antd";

import "./Program.scss";

export default function Programs(props) {
  const { program } = props;

  return (
    <>
      <div className="program">
        <h1>{program.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: program.content }} />
        <h1>{program.author}</h1>
      </div>
    </>
  );
}
