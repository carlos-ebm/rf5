import React, { useState, useCallback, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { publicationAddApi, uploadImageApi } from "../../../../api/publication";
import { useDropzone } from "react-dropzone";
import NoImage from "../../../../assets/img/png/no-image.png";
import { TimePicker } from 'antd';

import DatePicker from "react-datepicker";

import { registerLocale, setDefaultLocale } from  "react-datepicker";

import {
  Form,
  Input,
  Button,
  Radio,
  Avatar,
  Checkbox,
  notification,
  Row,
  Col,
  Divider,
  Upload,
  Image,
  Card,
} from "antd";

import "./PublicationForm.scss";
import "react-datepicker/dist/react-datepicker.css";

import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  UserAddOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import FormItem from "antd/lib/form/FormItem";
import { getAccessTokenApi } from "../../../../api/auth";

import moment from "moment";
import "moment/locale/es";
import es from 'date-fns/locale/es';
registerLocale('es', es);

const RadioGroup = Radio.Group;

export default function PublicationForm() {
  const [image, setImage] = useState(null);
  const [userData, setUserData] = useState({});
  const [date, setDate] = useState(new Date());

  const [inputs, setInputs] = useState({
    title: "",
    subtitle: "",
    image: "",
    content: "",
    author: "",
    visibility: "",
    section: "",
    creationDate: "",
    publicationDate: "",
    views: "",
  });

  const [formValid, setFormValid] = useState({
    title: false,
    subtitle: false,
    content: false,
    author: false,
    visibility: false,
    section: false,
    creationDate: false,
    publicationDate: false,
  });

  const [stateEditor, setStateEditor] = useState({
    content: EditorState.createEmpty(),
  });

  const onEditorStateChange = (content) => {
    setStateEditor({
      content,
    });
    setInputs({
      ...inputs,
      content: draftToHtml(
        convertToRaw(stateEditor.content.getCurrentContent())
      ),
    });
    //console.log(draftToHtml(convertToRaw(stateEditor.content.getCurrentContent())));
  };

  const changeForm = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
    //setInputs({...inputs, content: draftToHtml(convertToRaw(stateEditor.content.getCurrentContent()))});
  };

  const add = () => {
    const token = getAccessTokenApi();

    //setInputs({...inputs, content: draftToHtml(convertToRaw(stateEditor.content.getCurrentContent()))});
    const { title, subtitle, content, author, visibility, section } = formValid;
    const titleVal = inputs.title;
    const subtitleVal = inputs.subtitle;
    const contentVal = inputs.content;
    const authorVal = inputs.author;
    const visibilityVal = inputs.visibility;
    const sectionVal = inputs.section;
    //Fecha de creacion y fecha de publicacion separada en fecha y hora.
    inputs.creationDate = new Date();
    inputs.publicationDate=date;
    inputs.views = 0;

    if (
      !titleVal ||
      !subtitleVal ||
      image == null ||
      !contentVal ||
      !authorVal ||
      !visibilityVal ||
      !sectionVal
    ) {
      notification["error"]({
        message: "Todos los campos son obligatorios.",
      });
    }else {
      publicationAddApi(token, inputs).then((result) => {
        if (typeof image.file === "object") {
          uploadImageApi(token, image.file, result.publication._id).then(() => {
            notification["success"]({
              message: "Publicación agregada con exito.",
            });
            window.location.href = "/admin/publications";
          });
        }
      });
    }
  };

  return (
    <Card>
      <Divider orientation="center">
        <h2 className="publication-form__title">
          Formulario de nueva publicación
        </h2>
      </Divider>
      <UploadImage image={image} setImage={setImage} />
      <AddForm
        inputs={inputs}
        changeForm={changeForm}
        add={add}
        onEditorStateChange={onEditorStateChange}
        date={date}
        setDate={setDate}
      />
    </Card>
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
              <Avatar
                shape="square"
                size={200}
                src={imageUrl ? imageUrl : NoImage}
              />
            )}
          </div>
        </Card>
      </Col>
    </Row>
  );
}

function AddForm(props) {
  const {date, setDate, inputs, setInputs, changeForm, add, onEditorStateChange } = props;
  

  return (
    <Form className="publication-form" onChange={changeForm} onFinish={add}>
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
                prefix={<MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                type="text"
                name="title"
                placeholder="Titular"
                className="publication-form__row__col__card__input"
                value={inputs.title}
              />
            </Form.Item>

            <Form.Item>
              <Input
                prefix={<MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                type="text"
                name="subtitle"
                placeholder="Bajada"
                className="publication-form__row__col__card__input"
                value={inputs.subtitle}
              />
            </Form.Item>

            <Form.Item>
              <Input
                prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                type="text"
                name="author"
                placeholder="Autor"
                className="publication-form__row__col__card__input"
                value={inputs.author}
              />
            </Form.Item>
            <Card className="publication-form__row__col__card__card">
              <Editor
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
            <Col flex={1}>
              {" "}
              <Card
                type="inner"
                size="small"
                title="Visibilidad"
                className="publication-form__row__col__card"
              >
                <Form.Item>
                  <p><i>Si decea programar la publicación debe seleccionar la opción Oculto</i></p>
                  <RadioGroup name="visibility">
                    <Radio value={1}>Publico</Radio>

                    <Radio value={3}>Oculto</Radio>
                  </RadioGroup>
                </Form.Item>
              </Card>
            </Col>
            <Col flex={3}>
              <Card
                type="inner"
                size="small"
                title="Seccion"
                className="publication-form__row__col__card"
              >
                <Form.Item>
                  <RadioGroup name="section">
                    <Radio value={1}>Nacional</Radio>
                    <Radio value={2}>Internacional</Radio>
                    <Radio value={3}>Ciencia</Radio>
                    <Radio value={4}>Deporte</Radio>
                  </RadioGroup>
                </Form.Item>
              </Card>
            </Col>
            <Col flex={1}>
              {" "}
              <Card
                type="inner"
                size="small"
                title="Fecha de publicacion"
                className="publication-form__row__col__card"
              >
                <Form.Item>
                  <p><i>La publicación permanecera oculta hasta la fecha seleccionada</i></p>
                  <DatePicker
                  locale="es" 
                  selected={date} 
                  showTimeSelect
                  timeFormat="HH:mm"
                  injectTimes={[moment().hours(23).minutes(59)]}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  onChange={date=>{
                    setDate(date)
                  }}/>
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
              <FileAddOutlined />
              Agregar publicación
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
