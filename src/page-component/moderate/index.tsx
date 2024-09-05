import React, { useState, useEffect, useRef } from 'react';
import { List, Button, Space, Tag, message, Modal, Spin, Row, Col, Divider, Form } from 'antd';
import { EditOutlined, DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import styles from './moderate.module.less';
import { moderateService } from '../../service';
import { EditJokeModal } from './edit';
import { useRouter } from 'next/router';
import { LayoutM } from '../../layout/layoutM';
import Head from 'next/head';

interface Joke {
  _id: string;
  type: string;
  content: string;
}

export const JokesModeration = () => {
  const [selectedJoke, setSelectedJoke] = useState<Joke | null>(null);
  const [jokeList, setJokeList] = useState<Joke[]>([]);
  const [totalJokesCount, setTotalJokesCount] = useState<number>(0);
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const history = useRouter();

  // Handle the edit action
  const handleEdit = (joke: Joke) => {
    setSelectedJoke(joke);
    setIsEditModalVisible(true);
  };

  // Close the edit modal
  const handleCloseEditModal = () => {
    setIsEditModalVisible(false);
    fetchJokes();
  };

  // Route to create page
  const createJokeType = () => {
    history.push('/admin/moderate/create');
  };

  // Handle the delete action
  const handleDelete = async (joke: Joke) => {
    Modal.confirm({
      title: 'Confirmation',
      content: `Are you sure you want to remove the joke?`,
      onOk: async () => {
        try {
          await moderateService.deleteJoke(joke._id);
          fetchJokes();
          message.success(`Joke removed successfully.`);
        } catch (error) {
          message.error('Error deleting the joke. Please try again.');
        }
      },
    });
  };

  // Fetch the next joke for moderation
  const fetchJokes = async () => {
    setLoading(true);
    try {
      const { joke, totalJokes } = await moderateService.getNextJoke();
      setJokeList([joke]);
      setTotalJokesCount(totalJokes);
    } catch (error) {
      message.error('Error fetching jokes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJokes();
  }, []);

  return (
    <>
      <Head>
        <title>Jokes Moderation</title>
        <meta name="description" content="Jokes moderation management" />
        <link rel="icon" href="/joker.png" />
      </Head>
      <LayoutM>
        <div className={styles.container}>
          <Button onClick={createJokeType} className={styles.filterButton}>
            <PlusCircleOutlined rev={undefined} /> Create Joke Type
          </Button>
          <Tag className={styles.tag} color="purple">
            Total Submitted Jokes: {totalJokesCount}
          </Tag>
          <Divider />
          <List
            pagination={false}
            dataSource={jokeList}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  className={styles.listCard}
                  title={
                    <Row justify="space-between">
                      <Col>Type: {item.type}</Col>
                      <Col>
                        <Space>
                          <Button
                            type="link"
                            icon={<EditOutlined rev={undefined} />}
                            onClick={() => handleEdit(item)}
                            className={styles.editButton}
                          />
                          <Button
                            type="link"
                            icon={<DeleteOutlined rev={undefined} />}
                            onClick={() => handleDelete(item)}
                            danger
                          />
                        </Space>
                      </Col>
                    </Row>
                  }
                  description={<p>Joke Content: {item.content}</p>}
                />
              </List.Item>
            )}
          />
        </div>
        {loading && (
          <div className={styles.spinnerContainer}>
            <Spin />
          </div>
        )}
        {selectedJoke && (
          <EditJokeModal
            visible={isEditModalVisible}
            onClose={handleCloseEditModal}
            joke={selectedJoke}
          />
        )}
      </LayoutM>
    </>
  );
};
