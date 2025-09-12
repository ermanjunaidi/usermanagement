'use client'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { setUsers } from '@/store/userSlice'
import { dummy } from '@/utils/api'
import UserCard from './UserCard'
import AddUserForm from './AddUserForm'

export default function UsersPage() {
    const dispatch = useDispatch()
    const users = useSelector((state: RootState) => state.users)
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(0)

    useEffect(() => {
        const loadUsers = async () => {
            const res = await dummy.get(`/users?limit=10&skip=${page * 10}`)
            dispatch(setUsers(res.data.users))
        }
        loadUsers()
    }, [page, dispatch])

    const filtered = users.filter(
        u =>
            u.firstName.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-4 text-center">User Manager</h1>

                <div className="flex gap-2 mb-4">
                    <input
                        className="border border-gray-300 bg-white p-2 flex-1 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                        placeholder="Cari nama atau email..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    {filtered.map(user => (
                        <UserCard key={user.id} user={user} />
                    ))}
                </div>

                <div className="flex justify-between mt-6">
                    <button
                        onClick={() => setPage(p => Math.max(0, p - 1))}
                        className="px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded text-blue-800 font-medium disabled:opacity-50"
                        disabled={page === 0}
                    >
                        Prev
                    </button>
                    <button
                        onClick={() => setPage(p => p + 1)}
                        className="px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded text-blue-800 font-medium"
                    >
                        Next
                    </button>
                </div>

                <hr className="my-8 border-gray-300" />

                <AddUserForm />
            </div>
        </div>
    )
}
