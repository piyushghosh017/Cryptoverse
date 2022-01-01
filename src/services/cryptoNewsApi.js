import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"

const cryptoNewsHeaders={
        'x-bingapis-sdk': 'true',
        'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
        'x-rapidapi-key': '0098efd089mshf6021cd7b754081p1113a6jsnac490f1b8199'
    
}

const baseUrl= 'https://bing-news-search1.p.rapidapi.com' ;
const createRequest=(url)=>({url,headers:cryptoNewsHeaders});

export const cryptoNewsApi=createApi({
    reducerPath:'cryptoNewsApi',
    baseQuery:fetchBaseQuery({baseUrl}),
    endpoints:(builder)=>({
        getCryptoNews:builder.query({
            query: ({ newsCategory, count }) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
        })
    })
})


export const { useGetCryptoNewsQuery } = cryptoNewsApi;