import React, { useState, useEffect } from 'react';
import { List, Divider, Spin, Select, Button } from 'antd';
import styles from './deliver.module.less';
import { deliverService, submitService } from "../../service";
import { useRouter } from "next/router";
import { LayoutM } from '../../layout/layoutM';
import Head from "next/head";

const { Option } = Select;

interface Joke {
    _id: string;
    type: string;
    content: string;
}

export const DeliverJokes = () => {
    const [jokeType, setJokeType] = useState<string | undefined>('Select joke type');
    const [jokeList, setJokeList] = useState<Joke[]>([]);
    const [totalJokeType, setTotalJokeType] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const history = useRouter();

    const clearFilters = async () => {
        setJokeType('Select joke type');
        fetchJokes();
    };

    // Fetch the jokes based on the selected type
    const fetchJokes = async () => {
        try {
            setLoading(true);
            const joke = await deliverService.getJokes();
            const joke_type = await submitService.getJokeTypes();
            setTotalJokeType(joke_type);
            setJokeList(joke);
        } catch (error) {
            console.error("Error fetching jokes data:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchJokesByType = async (type: string | undefined) => {
        try {
            setLoading(true);
            const joke = await deliverService.getJokesByType(type);
            setJokeList(joke);
        } catch (error) {
            console.error("Error fetching jokes data:", error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch jokes on type change
    useEffect(() => {
        if (jokeType !== 'Select joke type') {
            fetchJokesByType(jokeType);
        }
    }, [jokeType]);

    useEffect(() => {
        fetchJokes();
    }, []);

    return (
        <>
            <Head>
                <title>Jokes Deliver</title>
                <meta name="description" content="Jokes deliver" />
                <link rel="icon" href={'/joker.png'} />
            </Head>
            <LayoutM>
                <div className={styles.container}>
                    {/* <Tag className={styles.tag} color="purple">Total Jokes: {totalJokesCount}</Tag> */}
                    <Button onClick={clearFilters} className={styles.filterButton}>Clear filters</Button>
                    <Divider />

                    {/* Select option to choose joke type */}
                    <Select
                        value={jokeType}
                        placeholder="Select joke type"
                        style={{ width: 200, marginBottom: 20 }}
                        onChange={(value) => setJokeType(value)}
                    >
                        {totalJokeType.map((joke: { _id: React.Key | null | undefined; type: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) => (
                            <Select.Option key={joke._id} value={joke.type}>
                                {joke.type}
                            </Select.Option>
                        ))}
                    </Select>



                    <Divider />

                    <List
                        pagination={false}
                        dataSource={jokeList}
                        renderItem={(item) => (
                            <List.Item>
                                <List.Item.Meta
                                    className={styles.listCard}
                                    title={`Type: ${item.type}`}
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
            </LayoutM>
        </>
    );
};
