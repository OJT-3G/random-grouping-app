import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react';
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {

  const [groupNumber, setGroupNumber] = useState('');
  const [message, setMessage] = useState('');

  const onChangeTextBox = (event: { target: { value: any; }; }) => {
    const targetValue = event.target.value;
    setGroupNumber(targetValue);

    console.log(targetValue)

    if ((targetValue === '') || (Number.isInteger(Number(targetValue)) && targetValue > 0)) {
      setMessage('');
    } else {
      setMessage('1以上の整数を半角で入力してください');
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>random-grouping-app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {/* <h1 className={styles.title}>
          ランダムグループ分けアプリ
        </h1> */}

        <div>
          <p className={styles.description}>グループ数</p>
          <p className={styles.errorMessage}>{message}</p>
          <input type="text" value={groupNumber} onChange={onChangeTextBox}></input>
        </div>

      </main>
    </div>
  )
}

export default Home
