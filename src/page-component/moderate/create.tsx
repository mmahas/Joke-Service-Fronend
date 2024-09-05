import { LayoutM } from '../../layout/layoutM';
import React from 'react';
import { Button, Row, Col, Form, Input, message } from 'antd';
import styles from './moderate.module.less';
import { CloseCircleOutlined } from '@ant-design/icons';
import { moderateService } from '../../service';
import { useRouter } from 'next/router';
import Head from 'next/head';

interface FieldType {
    type?: string;
}

export const CreateJokeType = () => {
    const [form] = Form.useForm();
    const router = useRouter();

    const onFinish = async (values: FieldType) => {
        try {
            await moderateService.createJokeType(values);
            message.success("Joke Type Created successfully");
            form.resetFields();
        } catch (error) {
            console.error('Error creating joke type:', error);
            message.error('Failed to create. Please try again later.');
        }
    };

    const handleClosePage = () => {
        router.push('/admin/moderate');
    };

    return (
        <>
            <Head>
                <title>Create Joke Type</title>
                <link rel="icon" href='/joker.png' />
            </Head>
            <LayoutM>
                <div>
                    <div className={styles.header}>
                        <div className={styles.title}>
                            <p>Let's create a new joke type</p>
                        </div>
                        <Button onClick={handleClosePage} type="text" className={styles.closePageButton}>
                            <CloseCircleOutlined rev={undefined} />
                        </Button>
                    </div>
                    <Form
                        name="createJokeTypeForm"
                        form={form}
                        initialValues={{ remember: false }}
                        onFinish={onFinish}
                    >
                        <Row>
                            <Col
                                xs={{ span: 24 }}
                                sm={{ span: 16, offset: 4 }}
                                md={{ span: 10, offset: 1 }}
                                lg={{ span: 10, offset: 1 }}
                            >
                                <Form.Item
                                    name="type"
                                    hasFeedback
                                    rules={[{ required: true, message: 'Please input joke type' }]}
                                >
                                    <Input className={styles.input} placeholder="Joke Type" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item
                            wrapperCol={{
                                xs: { offset: 0, span: 24 },
                                sm: { offset: 4, span: 16 },
                                md: { offset: 1, span: 6 },
                                lg: { offset: 1, span: 4 }
                            }}
                        >
                            <Button className={styles.submitButton} block type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </LayoutM>
        </>
    );
};
