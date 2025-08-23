// Demo users for testing
export const initializeDemoUsers = () => {
  if (typeof window === 'undefined') return

  const existingUsers = localStorage.getItem('users')
  if (!existingUsers) {
    const demoUsers = [
      {
        id: '1',
        email: 'farmer@test.com',
        password: '123',
        name: 'John Farmer',
        bio: 'Experienced farmer with 10+ years in agriculture',
        profilePicture: '',
        lastActive: new Date().toISOString()
      },
      {
        id: '2',
        email: 'admin@test.com',
        password: 'admin',
        name: 'Admin User',
        bio: 'System administrator',
        profilePicture: '',
        lastActive: new Date().toISOString()
      },
      {
        id: '3',
        email: 'demo@test.com',
        password: 'demo',
        name: 'Demo User',
        bio: 'Demo account for testing',
        profilePicture: '',
        lastActive: new Date().toISOString()
      }
    ]
    
    localStorage.setItem('users', JSON.stringify(demoUsers))
    console.log('Demo users initialized:', demoUsers.map(u => ({ email: u.email, password: u.password })))
  }
}