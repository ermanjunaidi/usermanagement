import Image from 'next/image'

type User = {
    firstName: string
    lastName: string
    email: string
    phone: string
    image?: string
    isNew?: boolean
}

export default function UserCard({ user }: { user: User }) {
    return (
        <div className="border p-4 rounded shadow-sm flex items-center gap-4">
            <Image
                src={user.image || 'dummyjson.com'}
                alt={user.firstName}
                width={80}
                height={80}
                className="rounded-full"
            />
            <div className="flex-1">
                <h2 className="font-semibold">
                    {user.firstName} {user.lastName}{' '}
                    {user.isNew && <span className="text-xs text-green-600">NEW</span>}
                </h2>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-600">{user.phone}</p>
            </div>
        </div>
    )
}
