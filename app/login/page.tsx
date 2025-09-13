'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')

    const [errors, setErrors] = useState<{ [key: string]: string }>({})
    const [canSubmit, setCanSubmit] = useState(false)

    useEffect(() => {
        const newErrors: { [key: string]: string } = {}

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = 'Format email tidak valid'
        }

        if (password.length < 6 || !/\d/.test(password)) {
            newErrors.password = 'Minimal 6 karakter & mengandung angka'
        }

        if (confirm !== password) {
            newErrors.confirm = 'Konfirmasi password tidak cocok'
        }

        setErrors(newErrors)
        setCanSubmit(
            Object.keys(newErrors).length === 0 && email && password && confirm
        )
    }, [email, password, confirm])


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (canSubmit) {
            localStorage.setItem('token', 'fake_token')
            router.push('/users')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded shadow-md w-full max-w-sm space-y-4"
            >
                <h1 className="text-2xl font-bold text-center text-black">
                    Login
                </h1>

                <div>
                    <input
                        className="border p-2 rounded w-full text-black"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    {errors.email && (
                        <p className="text-sm text-red-500">{errors.email}</p>
                    )}
                </div>

                <div>
                    <input
                        className="border p-2 rounded w-full text-black"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    {errors.password && (
                        <p className="text-sm text-red-500">{errors.password}</p>
                    )}
                </div>

                <div>
                    <input
                        className="border p-2 rounded w-full text-black"
                        type="password"
                        placeholder="Konfirmasi Password"
                        value={confirm}
                        onChange={e => setConfirm(e.target.value)}
                    />
                    {errors.confirm && (
                        <p className="text-sm text-red-500">{errors.confirm}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={!canSubmit}
                    className={`w-full py-2 rounded text-white ${canSubmit
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-gray-400'
                        }`}
                >
                    Submit
                </button>
            </form>
        </div>
    )
}
