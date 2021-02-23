import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ADMIN_ID } from "../../../utils/constants";
import {
  Form,
  Avatar,
  Input,
  Button,
  Radio,
  Checkbox,
  notification,
  Row,
  Col,
  Divider,
  Upload,
  Image,
  Card,
} from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import FormItem from "antd/lib/form/FormItem";
import {
  emailValidation,
  minLengthValidation,
} from "../../../utils/formValidation";

import "./EditProfileForm.scss";
import { getUserApi, getAvatarApi } from "../../../api/admin";
import { updateAdminApi } from "../../../api/admin";
import { uploadAvatarApi } from "../../../api/admin";
import { updateAdminPasswordApi } from "../../../api/admin";
import { getAccessTokenApi } from "../../../api/auth";

import NoAvatar from "../../../assets/img/png/no-avatar.png";

const RadioGroup = Radio.Group;

export default function EditProfileForm() {
  const token = getAccessTokenApi();

  const [formValid, setFormValid] = useState({
    email: false,
    name: false,
    lastname: false,
    password: false,
    repeatPassword: false,
    privilege: false,
  });

  const [userData, setUserData] = useState({});
  const [user, setUser] = useState({});
  const [avatar, setAvatar] = useState(null);

  const inputValidation = (e) => {
    const { type, name } = e.target;

    if (type === "email") {
      setFormValid({ ...formValid, [name]: emailValidation(e.target) });
    }

    if (type === "password") {
      setFormValid({ ...formValid, [name]: minLengthValidation(e.target, 6) });
    }
  };

  useEffect(() => {
    setUserData({
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      privilege: user.provilege,
      status: user.status,
      avatar: user.avatar,
    });
  }, [user]);

  useEffect(() => {
    getUserApi(token, localStorage.getItem(ADMIN_ID)).then((response) => {
      setUser(response.userData);
    });
  }, [token]);

  useEffect(() => {
    if (user.avatar) {
      getAvatarApi(user.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [user]);

  useEffect(() => {
    if (avatar) {
      setUserData({ ...userData, avatar: avatar.file });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatar]);

  useEffect(() => {
    const token = getAccessTokenApi();
    let userUpdate = userData;

    if (typeof userUpdate.avatar === "object") {
      uploadAvatarApi(token, userUpdate.avatar, user._id).then((response) => {
        userUpdate.avatar = response.avatarName;
        updateAdminApi(token, userUpdate, user._id).then((result) => {
          notification["success"]({
            message: result.message,
          });
        });
      });
    }
  });

  const updateUser = (e) => {
    //e.preventDefault();
    const token = getAccessTokenApi();
    let userUpdate = userData;

    updateAdminApi(token, userUpdate, user._id).then((result) => {
      notification["success"]({
        message: result.message,
      });
    });
  };

  const updateUserPassword = (e) => {
    //e.preventDefault();
    const token = getAccessTokenApi();
    let userUpdate = userData;

    updateAdminPasswordApi(token, userUpdate, user._id).then((result) => {
      notification["success"]({
        message: result.message,
      });
    });
  };

  return (
    <>
      <Divider orientation="center">
        <h2 className="title">Perfil de usuario</h2>
      </Divider>
      <Row className="row" type="flex">
        <Col className="row__col" flex={2}>
          <Card
            type="inner"
            size="small"
            title="Avatar"
            className="row__col__card"
          >
            <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
            <Divider>
              Cargo:{" "}
              {user.privilege == "1"
                ? "Administrador"
                : "Gestor de contenido"}
            </Divider>
          </Card>
        </Col>

        <Col className="row__col" flex={3}>
          <ProfileForm
            userData={userData}
            setUserData={setUserData}
            updateUser={updateUser}
            inputValidation={inputValidation}
            updateUserPassword={updateUserPassword}
          />
        </Col>
      </Row>
    </>
  );
}

function UploadAvatar(props) {
  const { avatar, setAvatar } = props;
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    if (avatar) {
      if (avatar.preview) {
        setAvatarUrl(avatar.preview);
      } else {
        setAvatarUrl(avatar);
      }
    } else {
      setAvatarUrl(null);
    }
  }, [avatar]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setAvatar({ file, preview: URL.createObjectURL(file) });
    },
    [setAvatar]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/jpeg, image/png, image/jpg",
    noKeyboard: true,
    onDrop,
  });

  return (
    <div className="upload-avatar" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Avatar size={150} src={NoAvatar} />
      ) : (
        <Avatar size={150} src={avatarUrl ? avatarUrl : NoAvatar} />
      )}
    </div>
  );
}

function ProfileForm(props) {
  const { userData, setUserData, updateUser, updateUserPassword } = props;

  return (
    <>
      <Card
        type="inner"
        size="small"
        title="Datos personales"
        className="row__col__card"
      >
        <Form
          className="row__col__card__editprofile-form"
          onFinish={updateUser}
        >
          <Form.Item>
            <Input
              prefix={<MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              type="email"
              name="email"
              placeholder="Correo electrónico"
              className="row__col__card__editprofile-form__input"
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              value={userData.email}
            />
          </Form.Item>

          <Form.Item>
            <Input
              prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              type="text"
              name="name"
              placeholder="Nombre"
              className="row__col__card__editprofile-form__input"
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
              value={userData.name}
            />
          </Form.Item>

          <Form.Item>
            <Input
              prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              type="text"
              name="lastname"
              placeholder="Apellido"
              className="row__col__card__editprofile-form__input"
              onChange={(e) =>
                setUserData({ ...userData, lastname: e.target.value })
              }
              value={userData.lastname}
            />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              className="row__col__card__editprofile-form__button"
            >
              Actualizar datos
            </Button>
          </Form.Item>
        </Form>
        <Divider></Divider>
        <Form
          className="row__col__card__editprofile-form"
          onFinish={updateUserPassword}
        >
          <Form.Item>
            <Input
              prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              name="password"
              placeholder="Contraseña"
              className="row__col__card__editprofile-form__input"
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item>
            <Input
              prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              name="repeatPassword"
              placeholder="Repetir contraseña"
              className="row__col__card__editprofile-form__input"
              onChange={(e) =>
                setUserData({ ...userData, repeatPassword: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              className="row__col__card__editprofile-form__button"
            >
              Actualizar contraseña
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
}
