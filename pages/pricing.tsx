import QuoteForm from "@components/pricing/quoteform";
import COMMONCONSTANT from "@constants/commonConstant";
import Head from "next/head"
import { useState } from "react"
import { ToastContainer } from "react-toastify";

const Pricing = () => {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" />
        <link
          href="/static/css/signup.css"
          rel="stylesheet"
          key="signupcss"
        ></link>
      </Head>
      <QuoteForm/>
      <ToastContainer limit={1}/>
    </>
  )
}
export default Pricing