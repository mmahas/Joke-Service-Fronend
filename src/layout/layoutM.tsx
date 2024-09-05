import React, { useState, useEffect } from 'react';
import { Menu, Layout, Button, Space, Row, Col, Dropdown, Typography } from 'antd';
import { useRouter } from 'next/router';
import styles from './layoutm.module.less';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  LogoutOutlined,
  CaretDownFilled,
  LoginOutlined,
  MehOutlined,
  UploadOutlined
} from '@ant-design/icons';
import { useLogout } from '../page-component/login/useLogout';
import Mahas from '../../public/mahas.jpeg';
import Joker from '../../public/joker.png';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { authService } from '../service';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;


export const LayoutM = (props: any) => {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const history = useRouter();
  const { logout } = useLogout();
  const [auth, setAuth] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [idCookie, setIdCookie] = useState<any>();


  let defaultSelectedKey = history.pathname === '/' ? '/' : history.pathname.split('/')[2];;

  const handleRoute = (e: { key: string }) => {
    const routes: { [key: string]: string } = {
      submit: '/jokes/submit',
      moderate: '/admin/moderate',
      deliver: '/jokes/deliver'
    };
    history.push(routes[e.key]);
  };

  const menuItems = [
    {
      key: 'deliver',
      icon: <MehOutlined rev={undefined} />,
      label: 'Deliver Jokes',
    },
    {
      key: 'submit',
      icon: <UploadOutlined rev={undefined} />,
      label: 'Submit Jokes',
    },
  ];

  if (idCookie) {
    menuItems.push({
      key: 'moderate',
      icon: <TeamOutlined rev={undefined} />,
      label: 'Moderate',
    });
  }


  const toggleCollapsed = () => {
    const newCollapsedState = !collapsed;
    setCollapsed(newCollapsedState);
    if (typeof window !== 'undefined') {
      localStorage.setItem('collapsed', newCollapsedState.toString());
    }
  };

  const handleLogin = () => {
    history.push('/login');
  }

  const fetchUserInfo = async (userId: string | undefined) => {
    const user = await authService.getUser(userId);
    setUser(user);
  }


  useEffect(() => {
    if (Cookies.get('id') !== undefined) {
      setAuth(true);
      fetchUserInfo(Cookies.get('id'));
      setIdCookie(Cookies.get('id'));
    } else {
      setAuth(false);
    }

    if (typeof window !== 'undefined') {
      const storedCollapsedState = localStorage.getItem('collapsed');
      if (storedCollapsedState === 'false') {
        setCollapsed(false);
      }
      if (window.innerWidth <= 550) {
        setCollapsed(true);
        localStorage.setItem('collapsed', 'true');
      }
    }
  }, [])

  const menuLogout = [
    {
      key: 'logout',
      label: (
        <span
          onClick={() => {
            logout();
            history.push('/login');
          }}
        >
          <LogoutOutlined rev={undefined} /> Logout
        </span>
      ),
    },
  ];

  return (
    <Layout className={styles.layoutContainer}>
      <Sider onCollapse={toggleCollapsed} trigger={null} collapsible collapsed={collapsed} className={styles.slider}>
        <div className={styles.productAlignment}>
          <div className={styles.sliderTitle}>
            {collapsed ?
              <h3 >JOKES</h3> :
              <h2 >JOKES</h2>
            }
          </div>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[defaultSelectedKey]}
          onClick={handleRoute}
          items={menuItems}
        />
        {!collapsed &&
          <div className={styles.bottomStyle}>
            <Image src={Joker} alt='joker' width={70} className={styles.bottomStyleImage} />
            <p>Mahas Milhar (Code94 Assignment)</p>
          </div>}
      </Sider>
      <Layout className={styles.header}>
        <Header>
          <Row className={styles.navButtons} justify="space-between" align="top">
            <Col>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined rev={undefined} /> : <MenuFoldOutlined rev={undefined} />}
                onClick={toggleCollapsed}
                className={styles.sliderButton}
              />
            </Col>
            <Col>
              <Space>
                {auth &&
                  <div className={styles.profileAlignment}>
                    <Image src={Mahas} alt={''} width={45} height={45} style={{ borderRadius: '50%' }} />
                    <div className={styles.profileDetails}>
                      <div className={styles.profileTitle}>
                        <Text strong>{user?.name}</Text>
                      </div>
                      <div className={styles.profileDescription}>

                        <Text type="secondary">{user?.email}</Text>
                        <Dropdown menu={{ items: menuLogout }} trigger={['click']}>
                          <CaretDownFilled style={{ marginLeft: '8px', cursor: 'pointer' }} rev={undefined} />
                        </Dropdown>
                      </div>
                    </div>
                  </div>
                }
                {
                  !auth && <Button
                    onClick={handleLogin}
                  >
                    <LoginOutlined rev={undefined} /> Login
                  </Button>
                }
              </Space>
            </Col>
          </Row>
        </Header>

        <Content className={styles.content}>
          <div className={styles.childerClass}>{props.children}</div>
        </Content>
      </Layout>
    </Layout>
  );
};
