import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectMongoDB from '../../../lib/mongodb';
import User from '../../../models/User';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
  }

  await connectMongoDB();
  const students = await User.find({ role: 'student' });
  return NextResponse.json(students);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
  }

  const { fullName, email, phoneNumber, course, enrollmentYear } = await request.json();
  await connectMongoDB();
  const user = new User({
    fullName,
    email,
    phoneNumber,
    role: 'student',
    course,
    enrollmentYear,
    status: 'Active',
    password: await bcrypt.hash('defaultPassword123', 10),
  });
  await user.save();
  return NextResponse.json({ message: 'Student added' }, { status: 201 });
}