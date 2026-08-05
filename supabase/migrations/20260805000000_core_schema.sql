-- Enum for User Roles
CREATE TYPE user_role AS ENUM ('super_admin', 'ops_admin', 'client');
CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');

-- Profiles table (extends auth.users)
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    role user_role DEFAULT 'client',
    full_name TEXT NOT NULL,
    phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Locations table
CREATE TABLE locations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    map_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Coaches table
CREATE TABLE coaches (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    bio TEXT,
    photo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Batches table
CREATE TABLE batches (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    location_id UUID REFERENCES locations(id) ON DELETE CASCADE,
    coach_id UUID REFERENCES coaches(id) ON DELETE SET NULL,
    schedule TEXT NOT NULL,
    fee_amount DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Students table
CREATE TABLE students (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    batch_id UUID REFERENCES batches(id) ON DELETE RESTRICT,
    full_name TEXT NOT NULL,
    date_of_birth DATE,
    medical_info TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Fees table
CREATE TABLE fees (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    batch_id UUID REFERENCES batches(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    status payment_status DEFAULT 'pending',
    due_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Payments table
CREATE TABLE payments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    fee_id UUID REFERENCES fees(id) ON DELETE CASCADE,
    razorpay_order_id TEXT,
    razorpay_payment_id TEXT,
    amount DECIMAL(10,2) NOT NULL,
    status payment_status DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Row Level Security (RLS) setup

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE coaches ENABLE ROW LEVEL SECURITY;
ALTER TABLE batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE fees ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read their own profile. Admins can read all.
CREATE POLICY "Users can read own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role IN ('super_admin', 'ops_admin')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE POLICY "Admins can read all profiles" ON profiles
    FOR SELECT USING (is_admin());

CREATE POLICY "Admins can update all profiles" ON profiles
    FOR UPDATE USING (is_admin());

-- Locations: Anyone can read. Admins can modify.
CREATE POLICY "Anyone can read locations" ON locations FOR SELECT USING (true);
CREATE POLICY "Admins can modify locations" ON locations FOR ALL USING (is_admin());

-- Coaches: Anyone can read. Admins can modify.
CREATE POLICY "Anyone can read coaches" ON coaches FOR SELECT USING (true);
CREATE POLICY "Admins can modify coaches" ON coaches FOR ALL USING (is_admin());

-- Batches: Anyone can read. Admins can modify.
CREATE POLICY "Anyone can read batches" ON batches FOR SELECT USING (true);
CREATE POLICY "Admins can modify batches" ON batches FOR ALL USING (is_admin());

-- Students: Parents can read their students. Admins can read all.
CREATE POLICY "Parents can read own students" ON students 
    FOR SELECT USING (auth.uid() = profile_id);
CREATE POLICY "Parents can update own students" ON students 
    FOR UPDATE USING (auth.uid() = profile_id);
CREATE POLICY "Parents can insert own students" ON students 
    FOR INSERT WITH CHECK (auth.uid() = profile_id);
CREATE POLICY "Admins can modify students" ON students FOR ALL USING (is_admin());

-- Fees: Parents can read own students' fees. Admins can read/modify all.
CREATE POLICY "Parents can read own fees" ON fees 
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM students 
            WHERE students.id = fees.student_id AND students.profile_id = auth.uid()
        )
    );
CREATE POLICY "Admins can modify fees" ON fees FOR ALL USING (is_admin());

-- Payments: Parents can read own payments. Admins can read/modify all.
CREATE POLICY "Parents can read own payments" ON payments 
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM fees 
            JOIN students ON fees.student_id = students.id
            WHERE payments.fee_id = fees.id AND students.profile_id = auth.uid()
        )
    );
CREATE POLICY "Admins can modify payments" ON payments FOR ALL USING (is_admin());
