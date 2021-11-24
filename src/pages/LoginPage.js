import {
  Button, Card,
  Col, Form, Layout, Row,
  Typography, Modal
} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';
import axios from 'axios';

import Logo from '../assets/catalisa.png';
import InputText from '../components/InputText';
import { validateEmail, validatePassword } from '../helpers/validation-helper';
import LocalStorageHelper from '../helpers/localstorage-helper';

const { Content } = Layout;
const { Title } = Typography;

const LoginPage = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({})
  const [loading, setLoading] = useState(false);
  console.log(loading)
  const handleLogin = useCallback(async () => {
    try {
      setLoading(true);     //desabilita a entrada de dados
      
      const { email, password } = formValues;  //recebe os valores
      
      if (!email || !password) return;    //verifica se os campos estão preenchidos
 
      const body = {   //cria objeto para enviar para backend
        email: email,
        senha: password,
      }
      
      const response = await axios.post('/usuarios/login', body); //post com axios(onde,oque será enviado)
      console.log(response)
      LocalStorageHelper.setToken(response.data.token); //retorna .data (objeto com token)
      
      navigate('/tasks');   //completa o processo de login 

    } catch (error) {    //Tratamento de erros
      console.warn(error);
      const { response } = error;
      if (response?.status === 401) {   //credenciais invalidas
        Modal.error({
          title: response.data.mensagem
        });
      } else {
        Modal.error({               //outros erros
          title: 'Não foi possível efetuar login, tente novamente mais tarde.'
        })
      }
    } finally {
      setLoading(false);
    }
  }, [formValues, navigate]);

  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target;
    
    setFormValues({
      ...formValues,
      [name]: value,  //recebe name = email e password
    })
  }, [formValues]);

  return (
    <Content>
      <Row
        justify="center"
      >
        <Col xs={24} sl={14} md={12} lg={10} xl={8}>
          <Card style={{ margin: 24 }}>
            <div style={{ textAlign: 'center' }}>
              <img
                src={Logo}
                alt="Catalisa Tech"
                style={{ maxWidth: '100%' }}
              />
            </div>

            <Title
              level={3}
              type="secondary"
              style={{ textAlign: 'center', marginTop: 8 }}
            >
              Faça login para continuar
            </Title>

            <Form layout="vertical">
              <InputText
                name="email"
                label="E-mail"
                size="large"
                onChange={handleInputChange}
                validate={validateEmail}
                disabled={loading}
                required
              />

              <InputText
                name="password"
                label="Senha"
                type="password"
                size="large"
                onChange={handleInputChange}
                validate={validatePassword}
                disabled={loading}
                required
              />

              <Button
                block
                type="primary"
                size="large"
                onClick={handleLogin}
                loading={loading}
              >
                Entrar
              </Button>

              <Link to="/subscription" className="ant-btn ant-btn-link ant-btn-lg ant-btn-block">
                Cadastre-se
              </Link>
            </Form>
          </Card>
        </Col>
      </Row>
    </Content>
  );
}

export default LoginPage;
