import {
    Button, Card,
    Col, Form, Layout, Row,
    Typography, Modal,Checkbox
  } from 'antd';
  import {useNavigate } from 'react-router-dom';
  import { useCallback, useState } from 'react';
  import axios from 'axios';
  
  import Logo from '../assets/catalisa.png';
  import InputText from '../components/InputText';

  const { Content } = Layout;
  const { Title } = Typography;
  
  const TaskCreatePage = () => {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState('')
    const [loading, setLoading] = useState(false);
    const [finalizada,setFinalizada] = useState(false)
    console.log(finalizada)
    const handleSubscription = useCallback(async () => {
      
      try {
        setLoading(true);
  
        const {titulo} = formValues;
        if (!titulo) return;
  
        const body = {
          titulo: titulo,
          concluida: finalizada,
        }
  
        await axios.post('/tarefas', body);
        
        Modal.success({
          title: 'Tarefa cadastrada com sucesso.',
        })
        navigate('/tasks');
      } catch (error) {
        console.warn(error);
        const { response } = error;
        if (response?.status === 400) {
          Modal.error({
            title: response.data.mensagem
          });
        } else {
          Modal.error({
            title: 'Não foi possivel cadastrar a tarefa, tente novamente mais tarde.'
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
        [name]: value,
      })
    }, [formValues]);

    const onChange = (event) => {
      setFinalizada(event.target.checked)
    };
  
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
                Cadastro de Tarefas
              </Title>
  
              <Form layout="vertical">
                <InputText
                  name="titulo"
                  label="Titulo"
                  size="large"
                  onChange={handleInputChange}
                  disabled={loading}
                  required
                /> 
                
                <Checkbox 
                name="concluida"
                onChange={onChange}
               >
                  Concluida
                  </Checkbox> 
          
                <Button
                  block
                  type="primary"
                  size="large"
                  onClick={handleSubscription}
                  loading={loading}
                >
                  Cadastrar Tarefa
                </Button>
  
                
              </Form>
            </Card>
          </Col>
        </Row>
      </Content>
    );
  }
  
  export default TaskCreatePage;
  
