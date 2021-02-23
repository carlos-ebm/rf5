import React from "react";
import {
  InstagramOutlined,
  YoutubeOutlined,
  FacebookOutlined,
  ForwardOutlined,
} from "@ant-design/icons";

import "./SocialBar.scss"

export default function SocialBar() {
  return (
    <div class="social-bar">
      <ul class="social-bar__list">
        <li class="social-bar__item">
          <a href="https://web.facebook.com/Actualizandoelmedio" target="_blank" class="social-bar__facebook">
            <FacebookOutlined/>
          </a>
        </li>
        <li class="social-bar__item">
          <a href="https://www.instagram.com/radio.f5/" target="_blank" class="social-bar__instagram">
            <InstagramOutlined />
          </a>
        </li>
        <li class="social-bar__item">
          <a href="https://www.youtube.com/channel/UCv_QICMiFoBdZIUu3PHv30g" target="_blank" class="social-bar__youtube">
            <YoutubeOutlined />
          </a>
        </li>
        <li class="social-bar__item">
          <a href="https://open.spotify.com/show/3LWhJT3PXGyYHoqhKGgbYq?si=G31Z408XQJKlcIa_mBV3Qw" target="_blank" class="social-bar__spotify">
            <ForwardOutlined />
          </a>
        </li>
      </ul>
    </div>
  );
}
