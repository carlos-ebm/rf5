import React, {useEffect, useState} from "react";
import { PROGRAM_ID } from "../../../../utils/constants";
import { List, Card, Image, Avatar, Divider } from "antd"
import { StarOutlined, LikeOutlined, MessageOutlined} from "@ant-design/icons";

import moment from "moment";
import "moment/locale/es";

import NoImage from "../../../../assets/img/png/no-image.png";

import {
  getImageApi,
} from "../../../../api/program";



import "./ProgramPreview.scss";

export default function ProgramPreview(props) {
  const { program } = props;
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (program.image) {
      getImageApi(program.image).then((response) => {
        setImage(response);
      });
    } else {
      setImage(null);
    }
  }, [program]);

  //console.log(image);

  return (
    <>
    <Card
    hoverable
    className="card-program"
    onClick={()=> {
      localStorage.setItem(PROGRAM_ID, program._id);
      window.location.href=`/programs/${program._id}`;
    }}>
     <List.Item
      key={program.title}
      extra=
      {
        <>
        <Divider orientation="center" ></Divider>
        <img
          width={100}
          alt="logo"
          src={image ? image : NoImage}
        />
        <h1><i>{program.subtitle}</i></h1>
        <Divider orientation="center" ><h5>{ ` Con: `+program.author}</h5></Divider>
        </>
      }
      >
      <List.Item.Meta
        //image={<Avatar src={image ? image : NoImage} />}
        //image={program.image}//avatar={<Avatar src={program.avatar} />}
        title={<div className="card-program__title" ><b>{program.title}</b></div>}
        //title={program.title}
        //description={program.description}
      />
      </List.Item>
      </Card>
    </>
  );
}

