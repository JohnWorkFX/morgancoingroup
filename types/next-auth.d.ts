import "next-auth";

declare module "next-auth" {
    interface User {
        id: string;
        email?: string | null;
        username?: string | null;
        email_verified: boolean;
        accessToken: string;
    }
    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            username?: string | null;
            email_verified: boolean;
        };
        accessToken: string;
    }
    interface JWT {
        id: string;
        username: string;
        email_verified: boolean;
        accessToken: string;
    }
} 