import React, { useState, useEffect, useCallback } from "react";
import { Editor } from "react-draft-wysiwyg";
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
  convertFromRaw,
} from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
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
import { getAccessTokenApi } from "../../../../api/auth";

import "./EditProgramForm.scss";
import { updateProgramApi } from "../../../../api/program";
const RadioGroup = Radio.Group;

export default function EditProgramForm(props) {
  const { program, setIsVisibleModal, setReloadPrograms } = props;
  const [programData, setProgramData] = useState({});

  const blocksFromHtml = htmlToDraft(program.content);
  const { contentBlocks, entityMap } = blocksFromHtml;
  const state = ContentState.createFromBlockArray(contentBlocks, entityMap);

  const [stateEditor, setStateEditor] = useState({
    content: EditorState.createWithContent(state),
  });

  const cDate = new Date;

  useEffect(() => {
    setProgramData({
      title: program.title,
      subtitle: program.subtitle,
      image: program.image,
      content: program.content,
      author: program.author,
      visibility: program.visibility,
      section: program.section,
      modificationDate: cDate,
    });
  }, [program]);

  const updateProgram = (e) => {
    const token = getAccessTokenApi();
    let programUpdate = programData;

    if (
      !programUpdate.title ||
      !programUpdate.subtitle ||
      !programUpdate.image ||
      !programUpdate.content ||
      !programUpdate.author ||
      !programUpdate.visibility ||
      !programUpdate.section
    ) {
      notification["error"]({
        message: "Todos los campos son obligatorios.",
      });
    }

    updateProgramApi(token, programUpdate, program._id).then(
      (result) => {
        notification["success"]({
          message: result.message,
        });
        setIsVisibleModal(false);
        setReloadPrograms(true);
      }
    );
  };

  return (
    <EditForm
      programData={programData}
      setProgramData={setProgramData}
      stateEditor={stateEditor}
      setStateEditor={setStateEditor}
      updateProgram={updateProgram}
    />
  );
}

function EditForm(props) {
  const {
    programData,
    setProgramData,
    stateEditor,
    setStateEditor,
    updateProgram,
  } = props;

  const onEditorStateChange = (content) => {
    setStateEditor({
      content,
    });
    setProgramData({
      ...programData,
      content: draftToHtml(
        convertToRaw(stateEditor.content.getCurrentContent())
      ),
    });
    //console.log(draftToHtml(convertToRaw(stateEditor.content.getCurrentContent())));
  };

  return (
    <Form className="program-form" onFinish={updateProgram}>
      <Divider orientation="center">
        <h2 className="program-form__title">
          Formulario de nueva publicación
        </h2>
      </Divider>
      <Row className="program-form__row" type="flex">
        <Col className="program-form__row__col" flex={4}>
          <Card
            type="inner"
            size="small"
            title="Datos de la noticia"
            className="program-form__row__col__card"
          >
            <Form.Item>
              <Input
                prefix={<MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                type="text"
                name="title"
                placeholder="Titular"
                className="program-form__row__col__card__input"
                onChange={(e) =>
                  setProgramData({
                    ...programData,
                    title: e.target.value,
                  })
                }
                value={programData.title}
              />
            </Form.Item>

            <Form.Item>
              <Input
                prefix={<MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                type="text"
                name="subtitle"
                placeholder="Bajada"
                className="program-form__row__col__card__input"
                onChange={(e) =>
                  setProgramData({
                    ...programData,
                    subtitle: e.target.value,
                  })
                }
                value={programData.subtitle}
              />
            </Form.Item>

            <Form.Item>
              <Input
                prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                type="text"
                name="image"
                placeholder="Imagen"
                className="program-form__row__col__card__input"
                onChange={(e) =>
                  setProgramData({
                    ...programData,
                    image: e.target.value,
                  })
                }
                value={programData.image}
              />
            </Form.Item>

            <Form.Item>
              <Input
                prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                type="text"
                name="author"
                placeholder="Autor"
                className="program-form__row__col__card__input"
                onChange={(e) =>
                  setProgramData({
                    ...programData,
                    author: e.target.value,
                  })
                }
                value={programData.author}
              />
            </Form.Item>
            <Card className="program-form__row__col__card__card">
              <Editor
                defaultEditorState={stateEditor.content}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
                onEditorStateChange={onEditorStateChange}
              />
            </Card>
          </Card>
        </Col>

        <Col className="program-form__row__col" flex={1}>
          <Card
            type="inner"
            size="small"
            title="Visibilidad"
            className="program-form__row__col__card"
          >
            <Form.Item>
              <RadioGroup
                name="visibility"
                onChange={(e) =>
                  setProgramData({
                    ...programData,
                    visibility: e.target.value,
                  })
                }
                value={programData.visibility}
              >
                <Radio value="1">Publico</Radio>
                <Radio value="2">Privado</Radio>
                <Radio value="3">Oculto</Radio>
              </RadioGroup>
            </Form.Item>
          </Card>

          <Card
            type="inner"
            size="small"
            title="Seccion"
            className="program-form__row__col__card"
          >
            <Form.Item>
              <RadioGroup
                name="section"
                onChange={(e) =>
                  setProgramData({
                    ...programData,
                    section: e.target.value,
                  })
                }
                value={programData.section}
              >
                <Radio value="1">Nacional</Radio>
                <Radio value="2">Internacional</Radio>
                <Radio value="3">Ciencia</Radio>
                <Radio value="4">Deporte</Radio>
              </RadioGroup>
            </Form.Item>
          </Card>
        </Col>
      </Row>

      <Row className="program-form__row" type="flex">
        <Col className="program-form__row__col" flex={5}>
          <Form.Item>
            <Button
              htmlType="submit"
              className="program-form__row__col__button"
            >
              Guardar Cambios
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
