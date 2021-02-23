import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  Form,
  Input,
  Button,
  Radio,
  Checkbox,
  Avatar,
  notification,
  Row,
  Col,
  Divider,
  Upload,
  Image,
  Card,
  Select,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { getAccessTokenApi } from "../../../api/auth";
import {
  updateAdminApi,
  uploadAvatarApi,
  getAvatarApi,
} from "../../../api/admin";
import "./EditUserForm.scss";
import FormItem from "antd/lib/form/FormItem";
import {
  emailValidation,
  minLengthValidation,
} from "../../../utils/formValidation";
import NoAvatar from "../../../assets/img/png/no-avatar.png";

const RadioGroup = Radio.Group;

export default function EditUserForm(props) {
  const { user, setIsVisibleModal, setReloadUsers } = props;
  const [avatar, setAvatar] = useState(null);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    setUserData({
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      privilege: user.privilege,
      status: user.status,
      avatar: user.avatar,
    });
  }, [user]);

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

  const updateUser = (e) => {
    //e.preventDefault();
    const token = getAccessTokenApi();
    let userUpdate = userData;

    if (
      !userUpdate.name ||
      !userUpdate.lastname ||
      !userUpdate.email ||
      !userUpdate.privilege ||
      !userUpdate.status
    ) {
      notification["error"]({
        message: "Todos los campos son obligatorios",
      });
      return;
    }

    if (typeof userUpdate.avatar === "object") {
      uploadAvatarApi(token, userUpdate.avatar, user._id).then((response) => {
        userUpdate.avatar = response.avatarName;
        updateAdminApi(token, userUpdate, user._id).then((result) => {
          notification["success"]({
            message: result.message,
          });
          setIsVisibleModal(false);
          setReloadUsers(true);
        });
      });
    } else {
      updateAdminApi(token, userUpdate, user._id).then((result) => {
        notification["success"]({
          message: result.message,
        });
        setIsVisibleModal(false);
        setReloadUsers(true);
      });
    }
  };

  return (
    <>
      <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
      <EditForm
        userData={userData}
        setUserData={setUserData}
        updateUser={updateUser}
      />
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
    <Row className="register-form__row" type="flex">
      <Col flex={5}>
        <Card
          type="inner"
          size="small"
          title="Avatar"
          className="register-form__card"
        >
          <div className="upload-avatar" {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <Avatar  size={150} src={NoAvatar} />
            ) : (
              <Avatar
                size={150}
                src={avatarUrl ? avatarUrl : NoAvatar}
              />
            )}
          </div>
        </Card>
      </Col>
    </Row>
  );
}

function EditForm(props) {
  const { userData, setUserData, updateUser } = props;

  return (
    <Form className="register-form" onFinish={updateUser}>
      <Row className="register-form__row" type="flex">
        <Col flex={5}>
          <Card
            type="inner"
            size="small"
            title="Datos personales"
            className="register-form__row__card"
          >
            <Form.Item>
              <Input
                prefix={<MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                type="email"
                name="email"
                placeholder="Correo electrónico"
                className="register-form__row__card__input"
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
                className="register-form__row__card__input"
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
                className="register-form__row__card__input"
                onChange={(e) =>
                  setUserData({ ...userData, lastname: e.target.value })
                }
                value={userData.lastname}
              />
            </Form.Item>
          </Card>

          <Card
            type="inner"
            size="small"
            title="Permisos de la cuenta"
            className="register-form__row__card"
          >
            <Form.Item>
              <RadioGroup
                name="privilege"
                onChange={(e) =>
                  setUserData({ ...userData, privilege: e.target.value })
                }
                value={userData.privilege}
              >
                <Radio value="1">Administrador</Radio>
                <Radio value="2">Gestor de contenido</Radio>
              </RadioGroup>
            </Form.Item>
          </Card>

          <Card
            type="inner"
            size="small"
            title="Estado de la cuenta"
            className="register-form__row__card"
          >
            <Form.Item>
              <RadioGroup
                name="status"
                onChange={(e) =>
                  setUserData({ ...userData, status: e.target.value })
                }
                value={userData.status}
              >
                <Radio value="1">Activo</Radio>
                <Radio value="2">Inactivo</Radio>
              </RadioGroup>
            </Form.Item>
          </Card>

          <Form.Item>
            <Button htmlType="submit" className="register-form__row__button">
              <SaveOutlined />
              Guardar
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
