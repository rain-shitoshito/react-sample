
import React, {memo, useState} from 'react';

/*
メモ化コンポーネント
親コンポーネントが再レンダリングされても、引数で渡しているpropsに変更がないかぎり
再描画されない
ただし、親コンポーネントが再レンダリングされたとき
変更は前回の状態と比較されるため、
プリミティブでないもの（Object型を継承しているもの）は
参照が変わっているため==でfalseとなり、変更とみなされ再描画される。
*/
type FizzProps = {
    isFizz: boolean
}

const Fizz = (props: FizzProps) => {
    const {isFizz} = props
    console.log(`Fizzが再描画されました, isFizz=${isFizz}`)
    return (
        <span>{ isFizz ? 'Fizz' : '' }</span>
    )
}

type BuzzProps = {
    isBuzz: boolean,
    list: string[],
}

const Buzz = memo<BuzzProps>((props: BuzzProps) => {
    const {isBuzz, list} = props
    console.log(`Buzzが再描画されました, isBuzz=${isBuzz}`)
    return (
        <span>{ isBuzz ? 'Buszz' : '' }</span>
    )
})

export const Parent = () => {
    
    const [count, setCount] = useState(1)
    const isFizz = count % 3 == 0
    const isBuzz = count % 5 == 0

     // プリミティブ型でないので再描画される
    const buzzClick = () => {
        console.log(`Buzzがクリックされました, ${isBuzz}`)
    }
    // プリミティブ型でないので再描画される
    const list: string[] = []
    
    console.log(`Parentが再描画されました, count=${count}`)

    return (
        <div>
            <button onClick={ () => setCount((c) => c + 1) }>+1</button>
            <p>{`現在のカウント: ${count}`}</p>
            <p>
                <Fizz isFizz={isFizz} />
                <Buzz isBuzz={isBuzz} list={list} />      
            </p>
        </div>
    )
}

