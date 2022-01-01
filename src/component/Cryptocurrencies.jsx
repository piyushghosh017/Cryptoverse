import React,{useEffect, useState} from 'react'
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card,Row,Col,Input } from 'antd';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';

const Cryptocurrencies = ({simplified}) => {

    const count =simplified ? 10: 100;
    const {data,isFetching}=useGetCryptosQuery(count);
    const cryptosList=data?.data?.coins;
    // console.log(cryptosList);

    const [cryptos, setCryptos] = useState([]);
    const [searchTerm,setSearchTerm]=useState("");


    useEffect(()=>{
        const filterData=cryptosList.filter((coin)=> coin?.name.toLowerCase().includes(searchTerm.toLowerCase()));
        setCryptos(filterData);
    },[cryptosList,searchTerm]);

    if(isFetching) return <Loader/>;


    return (
        <>
            {!simplified && (
                <div className="search-crypto">
                <Input placeholder="Search Cryptocurrency" onChange={(e) => setSearchTerm(e.target.value.toLowerCase())} />
            </div>
            )}
            <Row gutter={[32, 32]} className="crypto-card-container">
                {cryptos?.map((e)=>(
                    <Col xs={24} sm={12} lg={6} className="crypto-card" key={e.id}>
                        <Link to={`/crypto/${e.id}`}>
                            <Card title={`${e.rank}. ${e.name}`} extra={<img className="crypto-image" src={e.iconUrl} />} hoverable>
                                <p>Price: {millify(e.price)}</p>
                                <p>Market Cap: {millify(e.marketCap)}</p>
                                <p>Daily Change: {e.change}%</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default Cryptocurrencies
