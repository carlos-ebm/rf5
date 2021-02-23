import React from "react";
import { Card } from "antd";

import "./News.scss";

export default function News(){
    const { Meta } = Card;

    return(
    <>
    <Card className="news"
    hoverable
    cover={<img className="news__img" alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
  >
    <Meta title="Prueba de noticia 1" description="www.instagram.com" />
    </Card>
    </>
    )
}