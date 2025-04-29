import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

interface LoginResponse {
    tokens: {
        access: string;
        refresh: string
    };
    user: {
        id: string;
        email: string;
        username: string;
        email_verified: boolean;
    };
    message: string;
}

interface User {
    id: string;
    email: string;
    username: string;
    email_verified: boolean;
    accessToken: string;
}

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' }
            },
            authorize: async (credentials) => {
                try {
                    const response = await fetch(process.env.BACK_END_URL + '/auth/login', {
                        method: "POST",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(credentials)
                    });

                    const data: LoginResponse = await response.json();

                    // Handle email verification error
                    if (response.status === 403 && data.message.includes('verify')) {
                        throw new Error('Please verify your email first');
                    }

                    if (!response.ok) {
                        throw new Error(data.message || 'Authentication failed');
                    }

                    if (data.tokens) {
                        const accessToken = data.tokens.access;
                        const user: User = {
                            ...data.user,
                            accessToken
                        };
                        return user;
                    }

                    throw new Error('Invalid credentials');
                } catch (error: any) {
                    throw new Error(error.message || 'Authentication failed');
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                const customUser = user as User;
                token.id = customUser.id;
                token.username = customUser.username;
                token.email_verified = customUser.email_verified;
                token.accessToken = customUser.accessToken;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user = session.user || {};
                session.user.id = token.id as string;
                session.user.username = token.username as string;
                session.user.email_verified = token.email_verified as boolean;
                session.accessToken = token.accessToken as string;
            }
            return session;
        }
    },
    pages: {
        signIn: '/login',
        error: '/login',
    },
    session: {
        maxAge: 2 * 60 * 60, // 2 hours
        updateAge: 60 * 60,  // Update session every hour
    },
})

export { handler as GET, handler as POST };