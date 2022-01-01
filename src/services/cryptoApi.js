import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"

const cryptoApiHeaders={
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com', 
     'x-rapidapi-key': '0098efd089mshf6021cd7b754081p1113a6jsnac490f1b8199'
  
}

const baseUrl= 'https://coinranking1.p.rapidapi.com' ;

// need to pass the headers
const createRequest=(url)=>({url,headers:cryptoApiHeaders})

export const cryptoApi=createApi({
    reducerPath:"cryptoApi",
    baseQuery:fetchBaseQuery({baseUrl}),
    endpoints:(builder)=>({
        getCryptos:builder.query({
            query:(count)=> createRequest(`/coins?limit=${count}`),
        }),
        getCryptoDetails: builder.query({
            query:(coinId)=> createRequest(`/coin/${coinId}`),
        }),
        getCryptoHistory:builder.query({
            query:({coinId,timeperiod}) => createRequest(`/coin/${coinId}/history/${timeperiod}`),
        }),
        getExchanges:builder.query({
            query:()=> createRequest(`/exchages`),
        }),
    }),
});

// hook of api coins
export const {useGetCryptosQuery,useGetCryptoDetailsQuery,useGetCryptoHistoryQuery,useGetExchangesQuery}=cryptoApi;