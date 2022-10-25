import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react';
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {

  const [groupNumber, setGroupNumber] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');

  const onChangeTextBox = (event: { target: { value: string; }; }) => {
    const targetValue = event.target.value;
    setGroupNumber(parseInt(targetValue));

    if (targetValue === '') {
      setErrorMessage('グループ数を指定してください');
    } else {
      setErrorMessage('');
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>random grouping app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

        <div>
          <p className={styles.label}>グループ数</p>
          <p className={styles.errorMessage}>{errorMessage}</p>
          <input type="number" min="1" max="20" value={groupNumber} onChange={onChangeTextBox}/>
        </div>

      </main>
    </div>
  )
}

export default Home
