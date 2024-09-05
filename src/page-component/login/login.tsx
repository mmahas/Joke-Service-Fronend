import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, FormProps, message, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useLogin } from './useLogin';
import styles from './login.module.less';
import Head from 'next/head';
import Product from '../../../public/joker.png';
import Image from 'next/image';
import Cookies from 'js-cookie';

interface FieldType {
  email: any;
  password: any;
}


export const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const history = useRouter();
  const { login } = useLogin()
  const role = Cookies.get('role');

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {

    login(values)
      .then(async () => {
        await history.push('/admin/moderate');
      })
      .catch((e: any) => message.error('Failed to Login. Please try again later.'));

  };

  return (
    <div className={styles.loginContainer} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login" />
        <link rel="icon" href={'/veye.png'} />
      </Head>

      <Card className={styles.card}>
        <div className={styles.title}>
            <h1>Jokes Login</h1>
        </div>
        <Form
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your Email!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" rev={undefined} />} placeholder="Email" className={styles.input} />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" rev={undefined} />}
              type="password"
              placeholder="Password"
              className={styles.input}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%', borderRadius: '10px', height: '40px' }}>
              Log In
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
