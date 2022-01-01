import React, { useState } from 'react'
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';

import ReactTimeAgo from 'react-time-ago';
// import moment from 'moment';
import Loader from './Loader';

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';
const {Title,Text}=Typography;
const {Option}=Select;

const News = ({simplified}) => {
    const [newsCategory, setnewsCategory] = useState("Cryptocurrency")
    // renaming the data
    const {data:cryptoNews} = useGetCryptoNewsQuery({newsCategory,count:simplified ? 6:50});
    // const {data:cryptoNews} = useGetCryptoNewsQuery({newsCategory:'Cryptocurrency',count:simplified ? 6:50});
    const {data}=useGetCryptosQuery(100);

    // const cryptosList=data?.data?.coins;
    // console.log(cryptoNews?.value);


    if(!cryptoNews?.value) return <Loader/>;
    return (
        <>
        
             <Row gutter={[24,24]}>
             {!simplified && (
                <Col span={24}>
                    <Select showSearch
                        className='select-news'
                        placeholder='select a Crypto'
                        optionFilterProp='children'
                        onChange={(value)=> setnewsCategory(value)}
                        filterOption={(input,option)=>option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        <Option value="Cryptocurrency">Cryptocurrency</Option>
                        {data?.data?.coins.map((currency)=> <Option value={currency.name}>{currency.name}</Option>)}
                    </Select>
                </Col>
            )}
                {cryptoNews?.value?.map((news,i)=>(
                    <Col xs={24} sm={12} lg={8} key={i}>
                        <Card hoverable className="news-card">
                            <a href={news.url} target="_blank" rel="noreferrer">
                                <div className="news-image-container">
                                    <Title className="news-title" level={4}>{news.name}</Title>
                                      <img style={{maxHeight:'100px',maxWidth:'100px'}} src={news?.image?.thumbnail?.contentUrl || demoImage} alt="" />
                                </div>
                                <p>
                                    {news?.description > 100
                                     ? `${news?.description.substring(0, 100)}...` 
                                    : news?.description
                                    }
                                </p>
                                    <div>
                                        <Avatar src={news?.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="" />
                                        <Text className='provider-name'>{news.provider[0]?.name}</Text>
                                    </div>
                                        <Text>{new Date(news?.datePublished).toUTCString()}</Text>
                                            <div>
                                                <ReactTimeAgo date={news.datePublished} locale="en-US" />
                                            </div>
                            </a>
                        </Card >
                     </Col>
                ))}
             </Row> 

            </>
    )
    
}

export default News
