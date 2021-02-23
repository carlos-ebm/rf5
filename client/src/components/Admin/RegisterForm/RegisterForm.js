import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Radio,
  Checkbox,
  notification,
  Row,
  Col,
  Divider,
  Card,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { userAddApi } from "../../../api/admin";

import "./RegisterForm.scss";
import FormItem from "antd/lib/form/FormItem";
import {
  emailValidation,
  minLengthValidation,
} from "../../../utils/formValidation";

const RadioGroup = Radio.Group;

export default function RegisterForm() {
  const [inputs, setInputs] = useState({
    email: "",
    name: "",
    lastname: "",
    password: "",
    repeatPassword: "",
    privilege: "",
    status: "",
    avatar: "",
    privacyPolicy: false,
  });

  const [formValid, setFormValid] = useState({
    email: false,
    name: false,
    lastname: false,
    password: false,
    repeatPassword: false,
    privilege: false,
    status: false,
    avatar: false,
    privacyPolicy: false,
  });

  const changeForm = (e) => {
    if (e.target.name === "privacyPolicy") {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.checked,
      });
    } else {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.value,
      });
    }
  };

  const inputValidation = (e) => {
    const { type, name } = e.target;

    if (type === "email") {
      setFormValid({ ...formValid, [name]: emailValidation(e.target) });
    }

    if (type === "password") {
      setFormValid({ ...formValid, [name]: minLengthValidation(e.target, 6) });
    }

    if (type === "checkbox") {
      setFormValid({ ...formValid, [name]: e.target.checked });
    }
  };

  const register = (e) => {
    const { email, password, repeatPassword, privacyPolicy } = formValid;
    const emailVal = inputs.email;
    const passwordVal = inputs.password;
    const repeatPasswordVal = inputs.repeatPassword;
    const privacyPolicyVal = inputs.privacyPolicy;

    if (!emailVal || !passwordVal || !repeatPasswordVal || !privacyPolicyVal) {
      notification["error"]({
        message: "Todos los campos son obligatorios.",
      });
    } else {
      if (passwordVal !== repeatPasswordVal) {
        notification["error"]({
          message: "Las contraseñas deben ser iguales.",
        });
      } else {
        const result = userAddApi(inputs);
        notification["success"]({
          message: "Usuario registrado con exito.",
        });
        window.location.href = "/admin/users";
      }
    }
  };

  return (
    <>
      <Form className="register-form" onChange={changeForm} onFinish={register}>
        <Divider orientation="center">
          <h2 className="register-form__title">Formulario de nuevo usuario</h2>
        </Divider>
        <Row className="register-form__row" type="flex">
          <Col flex={3}>
            <Card
              type="inner"
              size="small"
              title="Datos personales"
              className="register-form__card"
            >
              <Form.Item>
                <Input
                  prefix={<MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                  type="email"
                  name="email"
                  placeholder="Correo electrónico"
                  className="register-form__input"
                  onChange={inputValidation}
                  value={inputs.email}
                />
              </Form.Item>

              <Form.Item>
                <Input
                  prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                  type="text"
                  name="name"
                  placeholder="Nombre"
                  className="register-form__input"
                  onChange={inputValidation}
                  value={inputs.name}
                />
              </Form.Item>

              <Form.Item>
                <Input
                  prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                  type="text"
                  name="lastname"
                  placeholder="Apellido"
                  className="register-form__input"
                  value={inputs.lastname}
                />
              </Form.Item>

              <Form.Item>
                <Input
                  prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  className="register-form__input"
                  onChange={inputValidation}
                  value={inputs.password}
                />
              </Form.Item>

              <Form.Item>
                <Input
                  prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                  type="password"
                  name="repeatPassword"
                  placeholder="Repetir contraseña"
                  className="register-form__input"
                  onChange={inputValidation}
                  value={inputs.repeatPassword}
                />
              </Form.Item>
            </Card>
          </Col>

          <Col flex={2}>
            <Card
              type="inner"
              size="small"
              title="Permisos de la cuenta"
              className="register-form__card"
            >
              <Form.Item>
                <RadioGroup name="privilege">
                  <Radio value={1}>Administrador</Radio>
                  <Radio value={2}>Gestor de contenido</Radio>
                </RadioGroup>
              </Form.Item>
            </Card>

            <Card
              type="inner"
              size="small"
              title="Estado de la cuenta"
              className="register-form__card"
            >
              <Form.Item>
                <RadioGroup name="status">
                  <Radio value={1}>Activo</Radio>
                  <Radio value={2}>Inactivo</Radio>
                </RadioGroup>
              </Form.Item>
            </Card>
          </Col>
        </Row>
        <Row className="register-form__row" type="flex">
          <Col className="register-form__row__col" flex={5}>
            <FormItem>
              <Checkbox
                name="privacyPolicy"
                checked={inputs.privacyPolicy}
                onChange={inputValidation}
              >
                He leído y acepto la política de privacidad.
              </Checkbox>
            </FormItem>

            <Form.Item>
              <Button htmlType="submit" className="register-form__button">
                <UserAddOutlined />
                Agregar usuario
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
}
