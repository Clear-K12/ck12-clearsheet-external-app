import DistrictQuoteForm from "@components/pricing/districtquoteform";
import SchoolQuoteForm from "@components/pricing/schoolquoteform";
import Head from "next/head"
import { useState } from "react"

const Pricing = () => {
    const [quoteType, setQuoteType] = useState<string>('school');
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
            <div className="q-form-wrapper signupContainer">
            <div className="cursor-pointer" onClick={()=>setQuoteType('school')}>School Quote</div>
            <div className="cursor-pointer" onClick={()=>setQuoteType('district')}>District Quote</div>
            {quoteType === 'school' ?
                <SchoolQuoteForm /> : <DistrictQuoteForm />
            }
            </div>
        </>
    )
}
export default Pricing