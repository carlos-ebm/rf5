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

import EditProgramForm from "../EditProgramForm";

import {
  getProgramsApi,
  deleteProgramApi,
} from "../../../../api/program";

import { getAccessTokenApi } from "../../../../api/auth";

import {
  ConsoleSqlOutlined,
  UserSwitchOutlined,
  DeleteOutlined,
  EditOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

import "./ListPrograms.scss";

const { confirm } = ModalAntd;

export default function ListProgram(props) {
  const { programs, setReloadPrograms } = props;
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  //console.log(users);

  return (
    <Card className="list-programs__card">
      <div className="list-programs__card-header">
        <Button className="button" type="primary" onClick={toProgramAdd}>
          <UserAddOutlined />
          Agregar Programa{" "}
        </Button>
      </div>

      <Programs
        setIsVisibleModal={setIsVisibleModal}
        setModalTitle={setModalTitle}
        setModalContent={setModalContent}
        programs={programs}
        setReloadPrograms={setReloadPrograms}
      />

      <Modal
        className="list-programs__card-modal"
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
      >
        {modalContent}
      </Modal>
    </Card>
  );
}

function Programs(props) {
  const { programs } = props;

  const {
    setIsVisibleModal,
    setModalTitle,
    setModalContent,
    setReloadPrograms,
  } = props;

  const editProgram = (program) => {
    setIsVisibleModal(true);
    setModalTitle(
      <h1>
        Editar {program.title ? program.title : "..."}
      </h1>
    );
    setModalContent(
      <EditProgramForm
      program={program}
        setIsVisibleModal={setIsVisibleModal}
        setReloadPrograms={setReloadPrograms}
      />
    );
  };

  return (
    <List
      className="programs"
      itemLayout="horizontal"
      dataSource={programs}
      renderItem={(program) => (
        <Program program={program} editProgram={editProgram} setReloadPrograms={setReloadPrograms} />
      )}
    />
  );
}

function Program(props) {
  const { program, editProgram, setReloadPrograms } = props;
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
      content: `¿Estás seguro de que quieres eliminar: ${program.title}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteProgramApi(accesToken, program._id)
          .then((response) => {
            notification["success"]({
              message: response,
            });
            setReloadPrograms(true);
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
          <Button type="primary" onClick={() => editProgram(program)}>
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
                ${program.title ? program.title : "..."} |
                ${program.author ? program.author : "..."}  
            `}
            description={`
              ${program.visibility==1 ? "Publico" : 
              program.visibility==2 ? "Privado" :
              program.visibility==3 ? "Oculto" :"..."} / 
              ${program.section==1 ? "Nacional" : 
              program.section==2 ? "Internacional" : 
              program.section==3 ? "Ciencia" : 
              program.section==4 ? "Deportes" :"..." } | 
              Creado ${program.creationDate ? moment(program.creationDate).calendar() : "..."} -
              Modificado ${program.modificationDate ? moment(program.modificationDate).calendar() : "..."}  
            `}
        />
      </List.Item>
    </>
  );
}

function toProgramAdd() {
  window.location.href = "/admin/programs/program-add";
}
