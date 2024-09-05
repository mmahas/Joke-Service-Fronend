import React, { useEffect, useState } from 'react';
import { Button, Modal, Row, Col, Form, Input, Select, message } from 'antd';
import styles from './moderate.module.less';
import { moderateService, submitService } from "../../service";

interface EditJokeModalProps {
    visible: boolean;
    onClose: (success: boolean) => void;
    joke: any;
}

const { TextArea } = Input;

export const EditJokeModal: React.FC<EditJokeModalProps> = ({ visible, onClose, joke }) => {
    const [form] = Form.useForm();
    const [totalJokeType, setTotalJokeType] = useState<any[]>([]);

    useEffect(() => {
        form.setFieldsValue(joke);
    }, [joke]);

    const handleFinish = async (values: typeof joke) => {
        try {
            await moderateService.updateJoke(joke._id, values);
            message.success("Joke information updated successfully");
            onClose(true);  // Pass true to indicate success
            form.resetFields();
        } catch (e: any) {
            message.error('Failed to update joke information. Please try again later.');
        }
    };

    const fetchJokeTypes = async () => {
        try {
            const joke_type = await submitService.getJokeTypes();
            setTotalJokeType(joke_type);
        } catch (error) {
            console.error("Error fetching joke type list:", error);
        }
    };

    useEffect(() => {
        fetchJokeTypes();
    }, []);

    return (
        <Modal
            open={visible}
            onCancel={() => onClose(false)}
            className={styles.modal}
            footer={null}
            width={800}
        >
            <div className={styles.header}>
                <div className={styles.title}>
                    <p>Update Joke Information</p>
                </div>
            </div>
            <Form
                form={form}
                onFinish={handleFinish}
                initialValues={joke}
                layout="vertical"
            >
                <Row gutter={16}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="content"
                            label="Content"
                            rules={[{ required: true, message: "Please input joke content" }]}
                        >
                            <TextArea rows={4} placeholder="Enter joke content" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="type"
                            label="Type"
                            rules={[{ required: true, message: "Please select joke type" }]}
                        >
                            <Select placeholder="Select joke type">
                                {totalJokeType.map((joke: { _id: React.Key | null | undefined; type: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) => (
                                    <Select.Option key={joke._id} value={joke.type}>
                                        {joke.type}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="status"
                            label="Status"
                            rules={[{ required: true, message: "Please select joke status" }]}
                        >
                            <Select placeholder="Select joke status">
                                <Select.Option value="approved">Approved</Select.Option>
                                <Select.Option value="rejected">Rejected</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item
                    wrapperCol={{
                        xs: { offset: 0, span: 24 },
                        sm: { offset: 8, span: 8 },
                        md: { offset: 18, span: 6 },
                        lg: { offset: 20, span: 4 }
                    }}>
                    <Button type="primary" htmlType="submit" block>
                        Confirm
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};
