import React, { useState, Suspense } from 'react'

// --- 1️⃣ Fake async API ---
function fetchUser(userId: number): Promise<{ id: number; name: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: userId, name: `User ${userId}` })
    }, 1000) // simulate 1 second network delay
  })
}

// --- 2️⃣ Suspense-compatible resource ---
function createUserResource(promise: Promise<{ id: number; name: string }>) {
  let status = 'pending'
  let result: { id: number; name: string }
  let error: unknown

  const suspender = promise.then(
    (r) => {
      status = 'success'
      result = r
    },
    (e) => {
      status = 'error'
      error = e
    }
  )

  return {
    read() {
      if (status === 'pending') throw suspender // tells React to suspend
      if (status === 'error') throw error      // lets React ErrorBoundary catch it
      return result                             // data ready
    },
  }
}

// --- 3️⃣ Cache resources by userId ---
const userResourceCache = new Map<number, ReturnType<typeof createUserResource>>()

function getUserResource(userId: number) {
  if (!userResourceCache.has(userId)) {
    userResourceCache.set(userId, createUserResource(fetchUser(userId)))
  }
  return userResourceCache.get(userId)!
}

// --- 4️⃣ Component that reads the resource ---
function UserProfile({ userId }: { userId: number }) {
  // No loading state! Suspense handles it.
  const user = getUserResource(userId).read()

  return (
    <div style={{ border: '1px solid gray', padding: '1rem', margin: '1rem' }}>
      <h3>User Profile</h3>
      <p>ID: {user.id}</p>
      <p>Name: {user.name}</p>
    </div>
  )
}

// --- 5️⃣ App with Suspense fallback ---
export default function App() {
  const [userId, setUserId] = useState(1)

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
      <h2>React Suspense User Loader</h2>
      <button onClick={() => setUserId((id) => id + 1)}>
    Load Next User
      </button>

      <Suspense fallback={<p>Loading user...</p>}>
        <UserProfile userId={userId} />
      </Suspense>
    </div>
  )
}
