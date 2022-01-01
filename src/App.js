import { BrowserRouter as Router,Routes,Route, Link } from 'react-router-dom';
import React from 'react';
import {Layout,Typography,Space} from "antd";

import {Navbar,Exchanges,Homepage,News,CryptoDetails,Cryptocurrencies} from "./component";
import "./App.css"

function App() {
  return (
    <div className='app'>
      <Router>
        <div className="navbar">
          <Navbar/>
        </div>
           <div className='main'>
             <Layout>
               <div className='routes'>
                 <Routes>
                  <Route path="/" element={<Homepage/>} />
                  <Route path="/exchanges" element={<Exchanges/>} />
                  <Route path="/cryptocurrencies" element={<Cryptocurrencies/>} />
                  <Route path="/crypto/:coinId" element={<CryptoDetails/>} />
                  <Route path="/news" element={<News/>} />
                </Routes>
               </div>
             </Layout>
             <div className="footer" style={{ background: '#000000' }}>
                <Typography.Title level={5} style={{ color: 'white', textAlign: 'center' }}>Copyright © 2021
                  <Link to="/"style={{ color: 'white'}} >
                    Cryptoverse Inc.
                  </Link> <br />
                  All Rights Reserved.
                </Typography.Title>
                <Space>
                  <Link to="/" style={{color: '#CCAA00'}}>Home</Link>
                  <Link to="/Cryptocurrencies" style={{color: '#CCAA00'}}>Cryptocurrencies</Link>
                  <Link to="/exchanges" style={{color: '#CCAA00'}}>Exchanges</Link>
                  <Link to="/news" style={{color: '#CCAA00'}}>News</Link>
                </Space>
              </div>

            </div>
         {/* <Footer/> */}
      </Router>
    </div>
   
  );
}

export default App;
