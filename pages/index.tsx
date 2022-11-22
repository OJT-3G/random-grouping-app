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

const randomMembers = [...members]

const errorMessagesOfGroupNumber = {
  numOfGroups: {
    mustBeSpecified: 'グループ数を指定してください',
    oneOrMore: '1以上の整数を入力してください',
    memberNumberOrLess:
      'メンバー数(' + members.length + ')以下の整数を入力してください',
  },
}

const errorMessagesOfAdditionalMember = {
  nameOfMembers: {
    mustBeSpecified: '名前を入力してください',
    mustBeSpecifiedDifferent:
      'すでに存在する名前です、別の名前を入力してください',
  },
}

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
  const [additionalMember, setAdditionalMember] = useState('')
  const [errorMessageOfGroupNumber, setErrorMessageOfGroupNumber] = useState('')
  const [errorMessageOfAdditionalMember, setErrorMessageOfAdditionalMember] =
    useState('')

  const [groups, setGroups] = useState<string[][]>([members])

  const onChangeGroupNumber = (event: { target: { value: string } }) => {
    const parsedTargetValue = parseInt(event.target.value)
    setGroupNumber(parsedTargetValue)

    if (isNaN(parsedTargetValue)) {
      setErrorMessageOfGroupNumber(
        errorMessagesOfGroupNumber.numOfGroups['mustBeSpecified'],
      )
      return
    } else if (parsedTargetValue === 0) {
      setErrorMessageOfGroupNumber(
        errorMessagesOfGroupNumber.numOfGroups['oneOrMore'],
      )
      return
    } else if (parsedTargetValue > members.length) {
      setErrorMessageOfGroupNumber(
        errorMessagesOfGroupNumber.numOfGroups['memberNumberOrLess'],
      )
      return
    } else {
      setErrorMessageOfGroupNumber('')
    }

    randomMembers.sort(() => 0.5 - Math.random())
    setGroups(divideGroups(parsedTargetValue, randomMembers))
  }

  const onClickAddButton = () => {
    if (members.indexOf(additionalMember) >= 0) {
      setErrorMessageOfAdditionalMember(
        errorMessagesOfAdditionalMember.nameOfMembers[
          'mustBeSpecifiedDifferent'
        ],
      )
    } else if (additionalMember === '') {
      setErrorMessageOfAdditionalMember(
        errorMessagesOfAdditionalMember.nameOfMembers['mustBeSpecified'],
      )
    } else {
      members.push(additionalMember)
      randomMembers.push(additionalMember)
      setGroups(divideGroups(groupNumber, randomMembers))
      setAdditionalMember('')
      setErrorMessageOfAdditionalMember('')
    }
  }

  const onChangeAdditionalMember = (event: { target: { value: string } }) => {
    setAdditionalMember(event.target.value)
    setErrorMessageOfAdditionalMember('')
  }

  const memberNames: JSX.Element[] = []
  for (let i = 0; i < members.length; i++) {
    memberNames.push(
      <tr key={members[i]}>
        <td>{members[i]}</td>
      </tr>,
    )
  }

  const groupNames: JSX.Element[] = []
  for (let i = 0; i < groupNumber; i++) {
    groupNames.push(<th key={`th-${i}`}>{i + 1}</th>)
  }

  const groupMemberNames = transpose(groups).map((rowItems) => {
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
          <p>グループ数</p>
          <p className={styles.errorMessage}>{errorMessageOfGroupNumber}</p>
          <input
            type='number'
            min='1'
            max={members.length}
            value={groupNumber}
            onChange={onChangeGroupNumber}
          />
        </div>
        <p>メンバー一覧</p>
        <div>
          <table border={1}>
            <thead className={styles.tableHead}>
              <tr>
                <th>名前</th>
              </tr>
            </thead>
            <tbody>{memberNames}</tbody>
          </table>
        </div>
        <div>
          <p className={styles.errorMessage}>
            {errorMessageOfAdditionalMember}
          </p>
          <input
            type='text'
            maxLength={12}
            value={additionalMember}
            onChange={onChangeAdditionalMember}
          />
          <input
            type='button'
            value='追加'
            disabled={errorMessageOfGroupNumber !== ''}
            onClick={onClickAddButton}
          />
        </div>
        <p>グループ分け結果</p>
        <div>
          <table border={1}>
            <thead className={styles.tableHead}>
              <tr>{groupNames}</tr>
            </thead>
            <tbody>{groupMemberNames}</tbody>
          </table>
        </div>
      </main>
    </div>
  )
}

export default Home
