import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message, Row, Col, Select } from 'antd';
import Head from 'next/head';
import { LayoutM } from '../../layout/layoutM';
import { deliverService, submitService } from '../../service';
import styles from './submit.module.less';

const { TextArea } = Input;

interface FieldType {
    content?: string;
    type?: string;
}

export const SubmitJokes = () => {
    const [form] = Form.useForm();
    const [totalJokeType, setTotalJokeType] = useState<any[]>([]);

    const onFinish = async (values: FieldType) => {
        try {
            await submitService.submitJokes(values);
            message.success('Joke submitted successfully');
            form.resetFields();
        } catch (error) {
            message.error('Submission failed. Please try again later.');
        }
    };

    const fetchJokeTypes = async () => {
        try {
            const joke_type = await deliverService.getJokeTypes();
            setTotalJokeType(joke_type);
        } catch (error) {
            console.error("Error fetching joke type data:", error);
        }
    };

    useEffect(() => {
        fetchJokeTypes();
    }, []);

    return (
        <>
            <Head>
                <title>Submit Jokes</title>
                <link rel="icon" href="/joker.png" />
            </Head>
            <LayoutM>
                <div>
                    <div className={styles.header}>
                        <div className={styles.title}>
                            <p>Submit a New Joke</p>
                        </div>
                    </div>
                    <Form
                        form={form}
                        name="submitJokesForm"
                        onFinish={onFinish}
                        initialValues={{ remember: false }}
                    >
                        <Row>
                            <Col
                                xs={{ span: 24 }}
                                sm={{ span: 16, offset: 4 }}
                                md={{ span: 10, offset: 1 }}
                                lg={{ span: 10, offset: 1 }}
                            >
                                <Form.Item
                                    name="content"
                                    rules={[{ required: true, message: 'Please input the joke content' }]}
                                >
                                    <TextArea
                                        className={styles.input}
                                        placeholder="Enter joke content"
                                        rows={5}
                                    />
                                </Form.Item>
                            </Col>
                            <Col
                                xs={{ span: 24 }}
                                sm={{ span: 16, offset: 4 }}
                                md={{ span: 10, offset: 2 }}
                                lg={{ span: 10, offset: 2 }}
                            >
                                <Form.Item
                                    name="type"
                                    rules={[{ required: true, message: 'Please select a joke type' }]}
                                >
                                    <Select
                                        className={styles.input}
                                        placeholder="Select joke type"
                                    >
                                       {totalJokeType.map((joke: { _id: React.Key | null | undefined; type: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) => (
                                            <Select.Option key={joke._id} value={joke.type}>
                                                {joke.type}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item
                            wrapperCol={{
                                xs: { offset: 0, span: 24 },
                                sm: { offset: 4, span: 16 },
                                md: { offset: 17, span: 6 },
                                lg: { offset: 19, span: 4 }
                            }}
                        >
                            <Button
                                className={styles.submitButton}
                                block
                                type="primary"
                                htmlType="submit"
                            >
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </LayoutM>
        </>
    );
};
