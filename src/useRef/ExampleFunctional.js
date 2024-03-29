import React, { useEffect, useRef, useState } from 'react'

export default function ExampleFunctional() {
    const countRef = useRef(0);
    const ref = useRef(null);

    const obj = {
        current: 0,
    }

    const [count, setCount] = useState(0);

    const handleClick = () => {
        setCount(count + 1)
        countRef.current = countRef.current + 1;
        obj.current = obj.current + 1;
    }

    console.log(count, countRef, obj);


    //Stale Closure issue
    //Mới chỉ lưu trữ giá trị của count tại lúc vừa khởi tạo
    //Không truy vấn để lưu trữ giá trị biến count mới nhất
    //sau khi cập nhật với setCount
    // ==> Giải quyết: useRef

    //issue
    // setInterval(() => {
    //     setInterval(() => {
    //         setCount(count + 1);
    //         console.log(count);
    //         console.log(`count: ${count}`);
    //     }, 1000)
    // }, [])

    //resolve
    // setInterval(() => {
    //     setInterval(() => {
    //         countRef.current = countRef.current + 1;
    //         console.log(`countRef: ${countRef.current}`);
    //     }, 1000)
    // }, [])


    //with DOM
    console.log('ref', ref);
    useEffect(() => {
        ref.current.focus();
    }, [])

    return (
        <div className="bg-gray-100 p-6 rounded-md shadow-md max-w-md mx-auto">
            <pre className="text-blue-500 font-semibold">Functional Component</pre>
            <div>
                <p className="font-bold mb-2">count: {count}</p>
                <p className="font-bold mb-2">countRef: {countRef.current}</p>
                <p className="font-bold mb-2">obj: {obj.current}</p>
                <button
                    onClick={handleClick}
                    className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
                >
                    Add
                </button>
            </div>

            <pre className="mt-[20px] font-semibold">with DOM</pre>

            <div className='flex flex-row h-[38px]'>
                <input type='text' ref={ref} className="font-bold mr-2"></input>
                <button
                    onClick={() => { }}
                    className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
                >
                    Click
                </button>
            </div>
        </div>
    )
}

/**
 * useRef trả về object có
 * - field current: == initial value
 * 
 * Sự khác nhau giữa countRef (useRef) và obj (object thường)
 * countRef giữa mỗi lần componnet re-render thì
 * đều tham chiếu đến một object duy nhất, chứ không khởi tạo lại một object mới
 * 
 * 
 * Giống nhau với useState:
 * Đều có thể giữ lại giá trị trước đó của một biến giữa những lần
 * component re-render
 * Khác:
 * - useState có thể gây ra sự re-render lại của một component, khi giá trị của state được cập nhật lại
 * ở đay setCount đã cập nhật state mới cho count => component bị re-render
 *     const handleClick = () => {
            setCount(count + 1)
            countRef.current = countRef.current + 1;
            obj.current = obj.current + 1;
        }
 * - useRef thì không
    comment lại setCount
    ta thấy dù countRef có sự thay đổi(tăng lên 1) mỗi lần click
    nhưng component vẫn không bị re-render
        const handleClick = () => {
            // setCount(count + 1)
            countRef.current = countRef.current + 1;
            obj.current = obj.current + 1;
        }
 * 
 */

/**
 * Stale Closure
 */
