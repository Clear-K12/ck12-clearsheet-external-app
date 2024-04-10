import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import COMMONCONSTANT from '@constants/commonConstant'
import React, { useEffect  } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const navigation = useRouter();
    useEffect(() => {
      navigation.push(COMMONCONSTANT.ROUTEPATH.REQUESTMOREINFO);
    }, [])
    
    return <div>Loading...</div>;
}
