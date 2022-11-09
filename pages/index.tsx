import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [groupNumber, setGroupNumber] = useState(1)
  const [errorMessage, setErrorMessage] = useState('')

  // グループメンバーのダミーデータ
  const [groupMember] = useState([
    'ふじい',
    'あらかわ',
    'あさい',
    'いいだ',
    'いしざき',
    'なかむら',
    'なかしま',
    'にしかわ',
    'おぎや',
    'おおさか',
    'さんのう',
    'たなか',
  ])

  const [group, setGroup] = useState<string[][]>([groupMember])

  const randomGrouping = (groupNumber: number) => {
    const minMemberNum = groupMember.length / groupNumber
    const memberNumRest = groupMember.length % groupNumber
    let currentMember = 0
    const group = []

    for (let i = 0; i < groupNumber; i++) {
      if (i < memberNumRest) {
        group.push(
          groupMember.slice(currentMember, currentMember + minMemberNum + 1),
        )
        currentMember = currentMember + minMemberNum + 1
      } else {
        group.push(
          groupMember.slice(currentMember, currentMember + minMemberNum),
        )
        currentMember = currentMember + minMemberNum
      }
    }

    return group
  }

  const onChangeTextBox = (event: { target: { value: string } }) => {
    const targetValue = event.target.value
    setGroupNumber(parseInt(targetValue))

    groupMember.sort(() => 0.5 - Math.random())

    if (targetValue === '') {
      setErrorMessage('グループ数を指定してください')
    } else {
      setErrorMessage('')
    }

    setGroup(randomGrouping(parseInt(targetValue)))
    console.log(randomGrouping(parseInt(targetValue)))
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>random grouping app</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        <div>
          <p className={styles.label}>グループ数</p>
          <p className={styles.errorMessage}>{errorMessage}</p>
          <input
            type='number'
            min='1'
            max='20'
            value={groupNumber}
            onChange={onChangeTextBox}
          />
        </div>
        <div>
          <table border={1}>
            <thead className={styles.tableHead}>
              <tr>
                <th>1</th>
                <th>2</th>
                <th>3</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{groupMember[0]}</td>
                <td>{groupMember[1]}</td>
                <td>{groupMember[2]}</td>
              </tr>
              <tr>
                <td>{groupMember[3]}</td>
                <td>{groupMember[4]}</td>
                <td>{groupMember[5]}</td>
              </tr>
              <tr>
                <td>{groupMember[6]}</td>
                <td>{groupMember[7]}</td>
                <td>{groupMember[8]}</td>
              </tr>
              <tr>
                <td>{groupMember[9]}</td>
                <td>{groupMember[10]}</td>
                <td>{groupMember[11]}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}

export default Home
