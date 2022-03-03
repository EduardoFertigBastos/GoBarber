import React, { useRef, useCallback } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { ValidationError } from 'yup';
import { getValidationErrors } from '../../utils/getValidationErros';

import logoImg from '../../assets/logo.svg';
import * as Yup from 'yup';
import Input from '../../components/Input';
import Button from '../../components/Button';

import  { Container, Content, Background } from './styles';

const SignIn: React.FC = () => {

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string()
          .min(6, 'No mínimo 6 dígitos')
      });

      await schema.validate(data, {
        abortEarly: false
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        formRef.current?.setErrors(getValidationErrors(error));
      }
      console.log(error)
    }
  }, []);

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="GoBarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1> Faça o seu login </h1>

          <Input name="email" icon={FiMail} type="text" placeholder="E-mail" />
          <Input name="password" icon={FiLock} type="password" placeholder="Senha" />

          <Button type="submit">Entrar</Button>

          <a href="forgot">Esqueci a minha senha</a>
        </Form>

        <a href="/login"> <FiLogIn /> Criar conta</a>
      </Content>

      <Background />
    </Container>
  );
}

export default SignIn;
