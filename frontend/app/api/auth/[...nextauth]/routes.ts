import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import connectMongoDB from '../../../../lib/mongodb';
import User from '../../../../models/User';

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await connectMongoDB();
        const user = await User.findOne({ email: credentials?.email });
        if (!user) throw new Error('No user found');
        const isValid = await bcrypt.compare(credentials?.password!, user.password);
        if (!isValid) throw new Error('Invalid password');
        return { id: user._id.toString(), name: user.fullName, email: user.email, role: user.role };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.user.role = token.role;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/login',
  },
};

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);