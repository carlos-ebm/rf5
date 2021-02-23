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
  EditOutlined,
  LineOutlined,
} from "@ant-design/icons";
import NoImage from "../../../../assets/img/png/no-image.png";

import { getAccessTokenApi } from "../../../../api/auth";

import "./EditPublicationForm.scss";
import { updatePublicationApi, getImageApi, uploadImageApi } from "../../../../api/publication";
const RadioGroup = Radio.Group;

export default function EditPublicationForm(props) {
  const { publication, setIsVisibleModal, setReloadPublications } = props;
  const [publicationData, setPublicationData] = useState({});
  const [image, setImage] = useState(null);

  //Editor de texto
  const blocksFromHtml = htmlToDraft(publication.content);
  const { contentBlocks, entityMap } = blocksFromHtml;
  const state = ContentState.createFromBlockArray(contentBlocks, entityMap);
  const [stateEditor, setStateEditor] = useState({
    content: EditorState.createWithContent(state),
  });

  const cDate = new Date();

  useEffect(() => {
    setPublicationData({
      title: publication.title,
      subtitle: publication.subtitle,
      image: publication.image,
      content: publication.content,
      author: publication.author,
      visibility: publication.visibility,
      section: publication.section,
      modificationDate: cDate,
    });
  }, [publication]);

  useEffect(() => {
    if (publication.image) {
      getImageApi(publication.image).then((response) => {
        setImage(response);
      });
    } else {
      setImage(null);
    }
  }, [publication]);

  useEffect(() => {
    if (image) {
      setPublicationData({ ...publicationData, image: image.file });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

  const updatePublication = (e) => {
    const token = getAccessTokenApi();
    let publicationUpdate = publicationData;

    if (
      !publicationUpdate.title ||
      !publicationUpdate.subtitle ||
      !publicationUpdate.content ||
      !publicationUpdate.author ||
      !publicationUpdate.visibility ||
      !publicationUpdate.section
    ) {
      notification["error"]({
        message: "Todos los campos son obligatorios.",
      });
    }else{
     updatePublicationApi(token, publicationUpdate, publication._id).then((result) => {
        if (typeof image.file === "object") {
          uploadImageApi(token, image.file, publication._id).then(() => {
          });
        }
        notification["success"]({
          message: "Publicación editada con exito.",
        });
        setIsVisibleModal(false);
        setReloadPublications(true);
        window.location.href="/admin/publications";
      });
    }
  };

  return (
    <>
    <UploadImage image={image} setImage={setImage} />
    <EditForm
      publicationData={publicationData}
      setPublicationData={setPublicationData}
      stateEditor={stateEditor}
      setStateEditor={setStateEditor}
      updatePublication={updatePublication}
    />
    </>
  );
}

function UploadImage(props) {
  const { image, setImage } = props;
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (image) {
      if (image.preview) {
        setImageUrl(image.preview);
      } else {
        setImageUrl(image);
      }
    } else {
      setImageUrl(null);
    }
  }, [image]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setImage({ file, preview: URL.createObjectURL(file) });
    },
    [setImage]
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
          title="Imagen principal"
          className="register-form__card"
        >
          <div className="upload-image" {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <Avatar shape="square" size={200} src={NoImage} />
            ) : (
              <Avatar shape="square" size={200} src={imageUrl ? imageUrl : NoImage} />
            )}
          </div>
        </Card>
      </Col>
    </Row>
  );
}

function EditForm(props) {
  const {
    publicationData,
    setPublicationData,
    stateEditor,
    setStateEditor,
    updatePublication,
  } = props;

  const onEditorStateChange = (content) => {
    setStateEditor({
      content,
    });
    setPublicationData({
      ...publicationData,
      content: draftToHtml(
        convertToRaw(stateEditor.content.getCurrentContent())
      ),
    });
    //console.log(draftToHtml(convertToRaw(stateEditor.content.getCurrentContent())));
  };

  return (
    <Form className="publication-form" onFinish={updatePublication}>
      <Row className="publication-form__row" type="flex">
        <Col className="publication-form__row__col" flex={4}>
          <Card
            type="inner"
            size="small"
            title="Datos de la noticia"
            className="publication-form__row__col__card"
          >
            <Form.Item>
              <Input
                prefix={<LineOutlined  style={{ color: "rgba(0,0,0,.25)" }} />}
                type="text"
                name="title"
                placeholder="Titular"
                className="publication-form__row__col__card__input"
                onChange={(e) =>
                  setPublicationData({
                    ...publicationData,
                    title: e.target.value,
                  })
                }
                value={publicationData.title}
              />
            </Form.Item>

            <Form.Item>
              <Input
                prefix={<LineOutlined  style={{ color: "rgba(0,0,0,.25)" }} />}
                type="text"
                name="subtitle"
                placeholder="Bajada"
                className="publication-form__row__col__card__input"
                onChange={(e) =>
                  setPublicationData({
                    ...publicationData,
                    subtitle: e.target.value,
                  })
                }
                value={publicationData.subtitle}
              />
            </Form.Item>

            <Form.Item>
              <Input
                prefix={<LineOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                type="text"
                name="author"
                placeholder="Autor"
                className="publication-form__row__col__card__input"
                onChange={(e) =>
                  setPublicationData({
                    ...publicationData,
                    author: e.target.value,
                  })
                }
                value={publicationData.author}
              />
            </Form.Item>
            <Card className="publication-form__row__col__card__card">
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

        <Col className="publication-form__row__col" flex={1}>
          <Row>
            <Col flex={2}>
              {" "}
              <Card
                type="inner"
                size="small"
                title="Visibilidad"
                className="publication-form__row__col__card"
              >
                <Form.Item>
                  <RadioGroup
                    name="visibility"
                    onChange={(e) =>
                      setPublicationData({
                        ...publicationData,
                        visibility: e.target.value,
                      })
                    }
                    value={publicationData.visibility}
                  >
                    <Radio value="1">Publico</Radio>

                    <Radio value="3">Oculto</Radio>
                  </RadioGroup>
                </Form.Item>
              </Card>
            </Col>
            <Col flex={3}>
              {" "}
              <Card
                type="inner"
                size="small"
                title="Sección"
                className="publication-form__row__col__card"
              >
                <Form.Item>
                  <RadioGroup
                    name="section"
                    onChange={(e) =>
                      setPublicationData({
                        ...publicationData,
                        section: e.target.value,
                      })
                    }
                    value={publicationData.section}
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
        </Col>
      </Row>

      <Row className="publication-form__row" type="flex">
        <Col className="publication-form__row__col" flex={5}>
          <Form.Item>
            <Button
              htmlType="submit"
              className="publication-form__row__col__button"
            >
              <SaveOutlined />
              Guardar
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
