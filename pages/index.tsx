import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import styles from '../styles/Home.module.css'

// グループメンバーのダミーデータ
const members = [
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
]

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

const transpose = (twoDimensionalArray: string[][]) => {
  const transposedArray: string[][] = []

  for (let i = 0; i < twoDimensionalArray[0].length; i++) {
    transposedArray[i] = []
  }

  for (let i = 0; i < twoDimensionalArray.length; i++) {
    for (let j = 0; j < twoDimensionalArray[i].length; j++) {
      transposedArray[j].push(twoDimensionalArray[i][j])
    }
  }

  return transposedArray
}

const Home: NextPage = () => {
  const [groupNumber, setGroupNumber] = useState(1)
  const [errorMessage, setErrorMessage] = useState('')

  const [groups, setGroups] = useState<string[][]>([members])

  const onChangeTextBox = (event: { target: { value: string } }) => {
    const parsedTargetValue = parseInt(event.target.value)
    setGroupNumber(parsedTargetValue)

    if (isNaN(parsedTargetValue)) {
      setErrorMessage('グループ数を指定してください')
      return
    } else if (parsedTargetValue === 0) {
      setErrorMessage('1以上の整数を入力してください')
      return
    } else if (parsedTargetValue > members.length) {
      setErrorMessage(
        'メンバー数(' + members.length + ')以下の整数を入力してください',
      )
      return
    } else {
      setErrorMessage('')
    }

    members.sort(() => 0.5 - Math.random())
    setGroups(divideGroups(parsedTargetValue, members))
  }

  const thNodes: JSX.Element[] = []
  for (let i = 0; i < groupNumber; i++) {
    thNodes.push(<th key={`th-${i}`}>{i + 1}</th>)
  }

  const tbodyChildren = transpose(groups).map((rowItems) => {
    const tds = rowItems.map((item) => {
      return <td key={item}>{item}</td>
    })
    return <tr key={rowItems[0]}>{tds}</tr>
  })

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
            max={members.length}
            value={groupNumber}
            onChange={onChangeTextBox}
          />
        </div>
        <div>
          <table border={1}>
            <thead className={styles.tableHead}>
              <tr>{thNodes}</tr>
            </thead>
            <tbody>{tbodyChildren}</tbody>
          </table>
        </div>
      </main>
    </div>
  )
}

export default Home
