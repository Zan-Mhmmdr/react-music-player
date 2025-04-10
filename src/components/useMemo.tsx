import { useMemo, useState } from "react"

interface UseMemoProps {
    id: number
    friendsCount: number
}

const UseMemo = () => {
    const [user, setUsers] = useState<UseMemoProps>({
        id: 1,
        friendsCount: 2000
    })
    const [count, setCount] = useState<number>(0)

    const userStats = useMemo(() => ({
        isNew: user.id < 20,
        friendsCount: user.friendsCount > 1000
    }), [user])

    const handleUser = () => {
        setUsers((prev) => ({
            ...prev,
            id: prev.id + 1
        }))
        console.log("User ID:", user.id);
    }

    return (
        <>
            <div style={{
                color: userStats.isNew ? "green" : "red",
            }}>
                {userStats.isNew && <p>New Player</p>}
                {userStats.friendsCount && <p>Popular</p>}
                {count}
            </div>
            <button onClick={handleUser}>klik</button>
            <button onClick={() => setCount(count + 1)}>increment</button>
        </>
    )
}

export default UseMemo