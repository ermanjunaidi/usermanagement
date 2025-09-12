import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addUser } from '@/store/userSlice'

export default function AddUserForm() {
    const dispatch = useDispatch()
    const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '' })
    const [status, setStatus] = useState<string | null>(null)

    const validateAndAdd = async () => {
        setStatus('Memvalidasi...')
        try {
            let valid = false

            if (form.email) {
                const res = await fetch(
                    `https://emailvalidation.abstractapi.com/v1/?api_key=${process.env.NEXT_PUBLIC_ABSTRACT_EMAIL_KEY}&email=${form.email}`
                )
                const data = await res.json()
                valid = data.is_valid_format?.value
            } else if (form.phone) {
                const res = await fetch(
                    `https://phonevalidation.abstractapi.com/v1/?api_key=${process.env.NEXT_PUBLIC_ABSTRACT_PHONE_KEY}&phone=${form.phone}`
                )
                const data = await res.json()
                valid = data.valid
            }

            if (!valid) {
                setStatus('❌ Email/Telepon tidak valid')
                return
            }

            dispatch(addUser({ id: Date.now(), ...form }))
            setStatus('✅ Valid - pengguna ditambahkan')
            setForm({ firstName: '', lastName: '', email: '', phone: '' })
        } catch (err) {
            setStatus('⚠️ Gagal memvalidasi')
        }
    }

    return (
        <div className="p-4 border rounded shadow-sm">
            <h2 className="text-lg font-semibold mb-2">Tambah Pengguna</h2>
            <div className="grid gap-2">
                <input className="border p-2 rounded" placeholder="Nama Depan"
                    value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} />
                <input className="border p-2 rounded" placeholder="Nama Belakang"
                    value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} />
                <input className="border p-2 rounded" placeholder="Email"
                    value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                <input className="border p-2 rounded" placeholder="No Telepon"
                    value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />

                <button onClick={validateAndAdd}
                    className="px-4 py-2 bg-blue-600 text-white rounded mt-2">
                    Validate & Add
                </button>

                {status && <p className="text-sm mt-1">{status}</p>}
            </div>
        </div>
    )
}
