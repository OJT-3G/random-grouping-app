import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import styles from '../styles/Home.module.css'

const divideGroups = (groupNumber: number, members: string[]) => {
  const minMemberNum = Math.floor(members.length / groupNumber)
  const restMemberNum = members.length % groupNumber
  let currentMemberIndex = 0
  const groups = []

  for (let i = 0; i < groupNumber; i++) {
    const group = members.slice(
      currentMemberIndex,
      currentMemberIndex + minMemberNum,
    )
    currentMemberIndex = currentMemberIndex + minMemberNum

    const shouldAddRestMember = i < restMemberNum
    if (shouldAddRestMember) {
      group.push(members[currentMemberIndex])
      currentMemberIndex++
    }

    groups.push(group)
  }

  return groups
}

const Home: NextPage = () => {
  const [groupNumber, setGroupNumber] = useState(1)
  const [errorMessage, setErrorMessage] = useState('')

  // グループメンバーのダミーデータ
  const [members] = useState([
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

  const [groups, setGroups] = useState<string[][]>([members])

  const onChangeTextBox = (event: { target: { value: string } }) => {
    const parsedTargetValue = parseInt(event.target.value)
    setGroupNumber(parsedTargetValue)

    if (isNaN(parsedTargetValue)) {
      setErrorMessage('グループ数を指定してください')
      return
    } else {
      setErrorMessage('')
    }

    members.sort(() => 0.5 - Math.random())
    setGroups(divideGroups(parsedTargetValue, members))
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
                <td>{members[0]}</td>
                <td>{members[1]}</td>
                <td>{members[2]}</td>
              </tr>
              <tr>
                <td>{members[3]}</td>
                <td>{members[4]}</td>
                <td>{members[5]}</td>
              </tr>
              <tr>
                <td>{members[6]}</td>
                <td>{members[7]}</td>
                <td>{members[8]}</td>
              </tr>
              <tr>
                <td>{members[9]}</td>
                <td>{members[10]}</td>
                <td>{members[11]}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}

export default Home
