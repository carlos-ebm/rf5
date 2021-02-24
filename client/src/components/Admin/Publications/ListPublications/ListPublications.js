import React, { useState, useEffect } from "react";
import {
  Menu,
  Button,
  List,
  Space,
  Card,
  Divider,
  Modal as ModalAntd,
  notification,
} from "antd";

import Modal from "../../../Modal";
import moment from "moment";
import "moment/locale/es";

import EditPublicationForm from "../EditPublicationForm";

import {
  getPublicationsApi,
  deletePublicationApi,
} from "../../../../api/publication";

import { getAccessTokenApi } from "../../../../api/auth";

import {
  ConsoleSqlOutlined,
  UserSwitchOutlined,
  DeleteOutlined,
  EditOutlined,
  UserAddOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

import "./ListPublications.scss";

const { confirm } = ModalAntd;

export default function ListPublication(props) {
  const { publications, setReloadPublications } = props;
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  //console.log(users);

  const reload = ()=>{
    window.location.reload();
  }

  return (
    <Card className="list-publications__card">
      <div className="list-publications__card-header">
        <Button className="button" type="primary" onClick={toPublicationAdd}>
        <FileTextOutlined />
          Agregar Publicación{" "}
        </Button>
      </div>

      <Publications
        setIsVisibleModal={setIsVisibleModal}
        setModalTitle={setModalTitle}
        setModalContent={setModalContent}
        publications={publications}
        setReloadPublications={setReloadPublications}
      />

      <Modal
        className="list-publications__card-modal"
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
        onCancel={reload}
      >
        {modalContent}
      </Modal>
    </Card>
  );
}

function Publications(props) {
  const { publications } = props;

  const {
    setIsVisibleModal,
    setModalTitle,
    setModalContent,
    setReloadPublications,
  } = props;

  const editPublication = (publication) => {
    setIsVisibleModal(true);
    setModalTitle(
      <h1>
        Editar {publication.title ? publication.title : "..."}
      </h1>
    );
    setModalContent(
      <EditPublicationForm
        publication={publication}
        setIsVisibleModal={setIsVisibleModal}
        setReloadPublications={setReloadPublications}
      />
    );
  };

  return (
    <List
      className="publications"
      itemLayout="horizontal"
      dataSource={publications}
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 10,
      }}
      renderItem={(publication) => (
        <Publication publication={publication} editPublication={editPublication} setReloadPublications={setReloadPublications} />
      )}
    />
  );
}

function Publication(props) {
  const { publication, editPublication, setReloadPublications } = props;
  //const [avatar, setAvatar] = useState(null);

  /*useEffect(() => {
    if (user.avatar) {
      getAvatarApi(user.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [user]);*/

  //console.log(user);

  const showDeleteConfirm = () => {
    const accesToken = getAccessTokenApi();

    confirm({
      title: "Eliminando publicación",
      content: `¿Estás seguro de que quieres eliminar: ${publication.title}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deletePublicationApi(accesToken, publication._id)
          .then((response) => {
            notification["success"]({
              message: response,
            });
            setReloadPublications(true);
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
          <Button type="primary" onClick={() => editPublication(publication)}>
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
          //avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
          title={`
                ${publication.title ? publication.title : "..."} |
                ${publication.author ? publication.author : "..."}  
            `}
            description={`
              ${publication.visibility==1 ? "Publico" : 
              publication.visibility==2 ? "Privado" :
              publication.visibility==3 ? "Oculto" :"..."} / 
              ${publication.section==1 ? "Nacional" : 
              publication.section==2 ? "Internacional" : 
              publication.section==3 ? "Ciencia" : 
              publication.section==4 ? "Deportes" :"..." } | 
              Creado ${publication.creationDate ? moment(publication.creationDate).calendar() : "..."} -
              Modificado ${publication.modificationDate ? moment(publication.modificationDate).calendar() : "..."} -
              Programado para ${publication.publicationDate ? moment(publication.publicationDate).calendar() : "..."} |   
              Vista ${publication.views} ${publication.views==1 ? "vez": "veces"} 
            `}
        />
      </List.Item>
    </>
  );
}

function toPublicationAdd() {
  window.location.href = "/admin/publications/publication-add";
}
