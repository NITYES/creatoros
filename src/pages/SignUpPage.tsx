import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {  Rocket, Laptop, CheckCircle2 } from 'lucide-react';
import { useSignupUserMutation } from '../store/userApiService';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/userSlice'
import { useNavigate } from 'react-router-dom';
// 1. Schema with cross-version compatible validation
const signupSchema = z.object({
  name: z.string().min(2, 'Full name is required'),
  username: z.string()
    .min(3, 'Username is too short')
    .regex(/^[a-zA-Z0-9_]+$/, 'Only letters, numbers, and underscores allowed'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  location: z.string().min(2, 'Location is required'),

  // FIX: Using string() + refine() avoids the z.enum/z.union parameter errors
  type: z.string().refine((val) => ['paid', 'unpaid'].includes(val), {
    message: "Please select an account type",
  }),

  userType: z.string().refine((val) => ['brand', 'creator'].includes(val), {
    message: "Please select your role",
  }),

  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Include one uppercase letter')
    .regex(/[0-9]/, 'Include one number'),
});

type SignupFormData = z.infer<typeof signupSchema>;

const SignupPage = () => {
  const [signupUser, { isError }] = useSignupUserMutation();
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      type: 'unpaid',
      userType: 'creator'
    }
  });
  const navigate = useNavigate();


  const onSubmit = async (data: SignupFormData) => {
    try {
      // 1. Trigger API Call via RTK Query
      const userData = await signupUser(data).unwrap();

      // 2. Save to Global Redux State
      dispatch(setUser(userData));
      console.log(userData)
      // 3. Navigate to Dashboard
      navigate('/dashboard');
    } catch (err) {
      console.error('Signup failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-slate-100">

        {/* Branding Sidebar */}
        <div className="hidden md:flex md:w-2/5 bg-indigo-600 p-12 flex-col justify-between text-white">
          <div>
            <div className="flex items-center gap-2 mb-12">
              <Laptop size={28} />
              <span className="text-2xl font-black italic">creatorOS</span>
            </div>
            <h2 className="text-3xl font-bold leading-tight">Master your content workflow.</h2>
          </div>
          <div className="space-y-4">
            {['Analytics', 'Collaboration', 'Automation'].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-indigo-300" />
                <span className="text-indigo-100">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Container */}
        <div className="flex-1 p-8 md:p-12 bg-white">
          <header className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900">Create Account</h1>
          </header>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {isError ? <p className="text-xs text-rose-500 mt-1">Signup failed. Please try again.</p> : null}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">NAME</label>
                <input {...register('name')} className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Nitesh" />
                {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">USERNAME</label>
                <input {...register('username')} className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="nitesh_dev" />
                {errors.username && <p className="text-xs text-rose-500 mt-1">{errors.username.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">PHONE</label>
                <input {...register('phone')} className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="+91..." />
                {errors.phone && <p className="text-xs text-rose-500 mt-1">{errors.phone.message}</p>}
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">LOCATION</label>
                <input {...register('location')} className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="City, Country" />
                {errors.location && <p className="text-xs text-rose-500 mt-1">{errors.location.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">EMAIL</label>
              <input {...register('email')} className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="nitesh@example.com" />
              {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">ACCOUNT TYPE</label>
                <select {...register('type')} className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none">
                  <option value="unpaid">Free</option>
                  <option value="paid">Paid</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">USER ROLE</label>
                <select {...register('userType')} className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none">
                  <option value="creator">Creator</option>
                  <option value="brand">Brand</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">PASSWORD</label>
              <input type="password" {...register('password')} className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="••••••••" />
              {errors.password && <p className="text-xs text-rose-500 mt-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-xl font-bold mt-4 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? 'Processing...' : 'Sign Up'}
              <Rocket size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;