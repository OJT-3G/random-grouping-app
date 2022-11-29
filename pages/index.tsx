import type { NextPage } from 'next'
import Head from 'next/head'
import { ChangeEvent, KeyboardEvent, useEffect, useMemo, useState } from 'react'
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
  const [lengthOfMembers, setLengthOfMembers] = useState(members.length)

  const errorMessages = useMemo(() => ({
    numOfGroups: {
      mustBeSpecified: 'グループ数を指定してください',
      oneOrMore: '1以上の整数を入力してください',
      memberNumberOrLess:
        'メンバー数(' + lengthOfMembers + ')以下の整数を入力してください',
      mustBeAdded: 'メンバーがいません、追加してください',
    },
    nameOfAdditionalMember: {
      mustBeSpecified: '名前を入力してください',
      mustBeSpecifiedDifferent:
        'すでに存在する名前です、別の名前を入力してください',
    },
  }), [lengthOfMembers])
  const [errorMessageOfGroupNumber, setErrorMessageOfGroupNumber] = useState('')
  const [errorMessageOfAdditionalMember, setErrorMessageOfAdditionalMember] =
    useState('')

  const [groups, setGroups] = useState<string[][]>([members])

  useEffect(() => {
    if (lengthOfMembers === 0) {
      setErrorMessageOfGroupNumber(errorMessages.numOfGroups.mustBeAdded)
      return
    }
    if (isNaN(groupNumber)) {
      setErrorMessageOfGroupNumber(errorMessages.numOfGroups.mustBeSpecified)
      return
    }
    if (groupNumber === 0) {
      setErrorMessageOfGroupNumber(errorMessages.numOfGroups.oneOrMore)
      return
    }
    if (groupNumber > lengthOfMembers) {
      setErrorMessageOfGroupNumber(errorMessages.numOfGroups.memberNumberOrLess)
      return
    }

    setErrorMessageOfGroupNumber('')
    randomMembers.sort(() => 0.5 - Math.random())
    setGroups(divideGroups(groupNumber, randomMembers))
  }, [groupNumber, lengthOfMembers, errorMessages])

  const onChangeGroupNumber = (event: ChangeEvent<HTMLInputElement>) => {
    const parsedTargetValue = parseInt(event.target.value)
    setGroupNumber(parsedTargetValue)
  }

  const onClickAddButton = () => {
    if (members.indexOf(additionalMember) >= 0) {
      setErrorMessageOfAdditionalMember(
        errorMessages.nameOfAdditionalMember.mustBeSpecifiedDifferent,
      )
      return
    }
    if (additionalMember === '') {
      setErrorMessageOfAdditionalMember(
        errorMessages.nameOfAdditionalMember.mustBeSpecified,
      )
      return
    }

    members.push(additionalMember)
    randomMembers.push(additionalMember)
    setGroups(divideGroups(groupNumber, randomMembers))
    setLengthOfMembers(members.length)
    setAdditionalMember('')
    setErrorMessageOfGroupNumber('')
    setErrorMessageOfAdditionalMember('')
  }

  const onClickDeleteButton = (deleteMember: string) => {
    const indexOfDeleteMember = members.indexOf(deleteMember)
    const indexOfDeleteRandomMembers = randomMembers.indexOf(deleteMember)
    members.splice(indexOfDeleteMember, 1)
    randomMembers.splice(indexOfDeleteRandomMembers, 1)
    setGroups(divideGroups(groupNumber, randomMembers))
    setLengthOfMembers(members.length)
  }

  const onChangeAdditionalMember = (event: ChangeEvent<HTMLInputElement>) => {
    setAdditionalMember(event.target.value)
    setErrorMessageOfAdditionalMember('')
  }

  const onClickEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && errorMessageOfGroupNumber == '') {
      onClickAddButton()
    }
  }

  const memberNames: JSX.Element[] = []
  for (let i = 0; i < members.length; i++) {
    memberNames.push(
      <tr key={members[i]}>
        <td>{members[i]}</td>
        <td>
          <input
            type='button'
            value='削除'
            disabled={errorMessageOfGroupNumber !== ''}
            onClick={() => onClickDeleteButton(members[i])}
          />
        </td>
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
            disabled={errorMessageOfGroupNumber === errorMessages.numOfGroups.mustBeAdded}
            onChange={onChangeGroupNumber}
          />
        </div>
        <p>メンバー一覧</p>
        <div>
          <table border={1}>
            <thead className={styles.tableHead}>
              <tr>
                <th>名前</th>
                <th />
                {/* 削除ボタン用の列 */}
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
            onKeyDown={onClickEnter}
          />
          <input
            type='button'
            value='追加'
            disabled={errorMessageOfGroupNumber !== '' && members.length !== 0}
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
