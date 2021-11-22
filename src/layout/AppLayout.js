import { Button, Col, Layout, Menu, Popconfirm, Row } from 'antd';
import { useCallback, useMemo } from 'react';
import { useNavigate, matchPath, useLocation } from 'react-router-dom';

import Logo from '../assets/catalisa.png';
import LocalStorageHelper from '../helpers/localstorage-helper';

const { Header, Footer } = Layout;

const MENU_ITEMS = [        //array do header
  {
    path: '/tasks',
    label: 'Minhas tarefas',
  },
  {
    path: '/tasks/new',
    label: 'Nova tarefa',
  },
];

const AppLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedKeys = useMemo(() => {
    const cuerrentRoute = MENU_ITEMS.find(item => {
      return matchPath(item.path, location.pathname);
    });

    if (!cuerrentRoute) return [];

    return [cuerrentRoute.path];
  }, [location]);

  const renderMenuItem = (item) => {
    return (
      <Menu.Item
        key={item.path}
        onClick={() => {
          navigate(item.path);
        }}
      >
        {item.label}
      </Menu.Item>
    );
  };

  const handleLogout = useCallback(() => {
    LocalStorageHelper.removeToken();
    navigate('/login');
  }, [navigate]);

  return (
    <div>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'nowrap',
        }}
      >
        <img
          src={Logo}
          style={{
            height: 40,
            marginLeft: 16,
            marginRight: 16
          }}
          alt="Catalisa Tech"
        />

        <Menu
          style={{
            flex: 1
          }}
          selectedKeys={selectedKeys}
          mode="horizontal"
          theme="dark"
        >
          {MENU_ITEMS.map(renderMenuItem)}
        </Menu>

        <Popconfirm
          onConfirm={handleLogout}
          okText="Sair"
          okType="danger"
          cancelText="Cancelar"
          title="Deseja sair do sistema?"
          placement="leftTop"
        >
          <Button
            type="text"
            danger
          >
            Sair
          </Button>
        </Popconfirm>
      </Header>

      {children}

      <Footer>
        <Row justify="center">
          <Col>
            Catalisa Bootcamp Tech ©2021
          </Col>
        </Row>
      </Footer>
    </div >
  );
}

export default AppLayout;
