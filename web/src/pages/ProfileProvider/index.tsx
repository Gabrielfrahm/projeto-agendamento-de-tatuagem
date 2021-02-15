import React, { ChangeEvent, useCallback, useMemo, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import {
  FiArrowLeft,
  FiMail,
  FiUser,
  FiLock,
  FiCamera,
  FiPhone,
} from 'react-icons/fi';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';
import { useToast } from '../../hooks/Toast';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AvatarInput } from './styles';
import { useAuth } from '../../hooks/Auth';

interface ProfileFormData {
  name: string;
  email: string;
  password: string;
  old_password: string;
  password_confirmation: string;
  phone: string;
}

const ProfileProvider: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const { user, updateUser } = useAuth();

  const phoneRegExp = useMemo(() => {
    const numberCompare = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    return numberCompare;
  }, []);

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome Obrigatório'),
          email: Yup.string()
            .required('E-Mail Obrigatório')
            .email('Digite um Email valido'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: val => !!val.length,
            then: Yup.string().required(),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: val => !!val.length,
              then: Yup.string().required(),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password')], 'Confirmação incorreta'),
          phone: Yup.string()
            .min(11, 'inclua o numero com o DD')
            .matches(phoneRegExp, 'Numero de telefone não é valido'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        // pedir para confirma o password e password confirmation se for informado o old password
        const {
          name,
          email,
          old_password,
          password,
          password_confirmation,
          phone,
        } = data;

        const formData = {
          name,
          email,
          phone,
          ...(old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}),
        };

        const response = await api.put('/providers/profile', formData);

        updateUser(response.data);

        history.push('/dashboardProvider');

        addToast({
          type: 'success',
          title: 'Perfil atualizado 😁',
          description: 'Suas informações foram atualizadas  !',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }
        addToast({
          type: 'error',
          title: 'Erro ao Atualizar perfil 😥',
          description:
            'Ocorreu um erro ao tentar atualizar as informações de perfil tente novamente!',
        });
      }
    },
    [addToast, history, updateUser, phoneRegExp],
  );

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append('avatar', e.target.files[0]);

        api.patch('/providers/avatar', data).then(response => {
          updateUser(response.data);
          addToast({
            type: 'success',
            title: 'avatar atualizado',
          });
        });
      }
    },
    [addToast, updateUser],
  );

  return (
    <>
      <Container>
        <header>
          <div>
            <Link to="/dashboardProvider">
              <FiArrowLeft />
            </Link>
          </div>
        </header>
        <Content>
          <Form
            ref={formRef}
            initialData={{
              name: user.name,
              email: user.email,
              phone: user.phone,
            }}
            onSubmit={handleSubmit}
          >
            <AvatarInput>
              <img src={user.avatar_url} alt={user.name} />
              <label htmlFor="avatar">
                <FiCamera />

                <input type="file" id="avatar" onChange={handleAvatarChange} />
              </label>
            </AvatarInput>
            <h1>Meu perfil</h1>

            <Input name="name" icon={FiUser} placeholder="Nome" />
            <Input name="email" icon={FiMail} placeholder="E-Mail" />
            <Input
              containerStyle={{ marginTop: 24 }}
              name="old_password"
              icon={FiLock}
              type="password"
              placeholder="Senha atual"
            />

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Nova Senha"
            />

            <Input
              name="password_confirmation"
              icon={FiLock}
              type="password"
              placeholder="Confirmar Senha"
            />

            <Input name="phone" icon={FiPhone} placeholder="numero" />

            <Button type="submit">Confirmar mudanças</Button>
          </Form>
        </Content>
      </Container>
    </>
  );
};

export default ProfileProvider;
