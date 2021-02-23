import React, { useState, useEffect } from "react";
import {
  Menu,
  Button,
  List,
  Avatar,
  Space,
  Card,
  Divider,
  Modal as ModalAntd,
  notification,
} from "antd";

import NoAvatar from "../../../assets/img/png/no-avatar.png";
import Modal from "../../Modal";

import EditUserForm from "../EditUserForm";

import {
  updateAdminApi,
  uploadAvatarApi,
  getAvatarApi,
  deleteUserApi,
} from "../../../api/admin";

import { getAccessTokenApi } from "../../../api/auth";

import {
  ConsoleSqlOutlined,
  UserSwitchOutlined,
  DeleteOutlined,
  EditOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

import "./ListUsers.scss";

const { confirm } = ModalAntd;

export default function ListUsers(props) {
  const { users, setReloadUsers } = props;
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  //console.log(users);

  return (
    <Card className="list-users__card">
      <div className="list-users__card-header">
        <Button className="button" type="primary" onClick={toUserAdd}>
          <UserAddOutlined />
          Agregar Usuario{" "}
        </Button>
      </div>

      <Users
        setIsVisibleModal={setIsVisibleModal}
        setModalTitle={setModalTitle}
        setModalContent={setModalContent}
        users={users}
        setReloadUsers={setReloadUsers}
      />

      <Modal
        className="list-users__card-modal"
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
      >
        {modalContent}
      </Modal>
    </Card>
  );
}

function Users(props) {
  const { users } = props;

  const {
    setIsVisibleModal,
    setModalTitle,
    setModalContent,
    setReloadUsers,
  } = props;

  const editUser = (user) => {
    setIsVisibleModal(true);
    setModalTitle(
      <h1>
        Editar {user.name ? user.name : "..."}{" "}
        {user.lastname ? user.lastname : "..."}
      </h1>
    );
    setModalContent(
      <EditUserForm
        user={user}
        setIsVisibleModal={setIsVisibleModal}
        setReloadUsers={setReloadUsers}
      />
    );
  };

  return (
    <List
      className="users"
      itemLayout="horizontal"
      dataSource={users}
      renderItem={(user) => (
        <User user={user} editUser={editUser} setReloadUsers={setReloadUsers} />
      )}
    />
  );
}

function User(props) {
  const { user, editUser, setReloadUsers } = props;
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (user.avatar) {
      getAvatarApi(user.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [user]);

  //console.log(user);

  const showDeleteConfirm = () => {
    const accesToken = getAccessTokenApi();

    confirm({
      title: "Eliminando usuario",
      content: `¿Estás seguro de que quieres eliminar a ${user.email}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteUserApi(accesToken, user._id)
          .then((response) => {
            notification["success"]({
              message: response,
            });
            setReloadUsers(true);
          })
          .catch((err) => {
            notification["error"]({
              message: err,
            });
          });
      },
    });
  };

  return (
    <>
      <List.Item
        actions={[
          <Button type="primary" onClick={() => editUser(user)}>
            <EditOutlined />
            Editar
          </Button>,
          <Button type="danger" onClick={showDeleteConfirm}>
            <DeleteOutlined />
            Eliminar
          </Button>,
        ]}
      >
        <List.Item.Meta
          avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
          title={`
                ${user.name ? user.name : "..."} 
                ${user.lastname ? user.lastname : "..."}
                ${user.privilege == 1 ? " / Admin" : " / Gestor de Contenido"}
                ${user.status == 1 ? " / Activo" : " / Inactivo"}
            `}
          description={user.email}
        />
      </List.Item>
    </>
  );
}

function toUserAdd() {
  window.location.href = "/admin/users/user-add";
}
