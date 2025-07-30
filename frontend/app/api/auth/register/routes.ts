import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectMongoDB from '../../../../lib/mongodb';
import User from '../../../../models/User';

export async function POST(request: Request) {
  const { fullName, email, phoneNumber, password, role, course, enrollmentYear } = await request.json();

  try {
    await connectMongoDB();
    const existingUser = await User.findOne({ email });
    if (existingUser) return NextResponse.json({ message: 'User already exists' }, { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      fullName,
      email,
      phoneNumber,
      role: role || 'student',
      password: hashedPassword,
      ...(role === 'student' && { course, enrollmentYear, status: 'Active' }),
    });

    await user.save();
    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}