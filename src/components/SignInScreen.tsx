import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../utils/validation';
import { checkCredentials } from '../utils/storage';

function SignInScreen() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '', general: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length === 0) {
      if (checkCredentials(formData.email, formData.password)) {
        navigate('/account-settings');
      } else {
        newErrors.general = 'Invalid email or password';
      }
    }

    setErrors(newErrors);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 font-[Rubik] text-[14px]">
      {/* Mobile-like container with fixed size and sharp edges */}
      <div
        className="bg-[#F7F8F9] p-6"
        style={{ width: '375px', height: '667px', borderRadius: 0 }}
      >
        <div className="space-y-8 pt-8 h-full">
          <div className="space-y-3">
            <h1 className="text-[28px] font-medium text-[#1D2226] leading-tight">
              Signin to your PopX account
            </h1>
            <p className="text-lg text-[#1D2226] leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="relative pt-6">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder=" "
                required
                className={`peer w-full border rounded-md px-3 pt-5 pb-2 bg-[#F7F8F9] text-[14px] text-[#1D2226] border-[#CBCBCB] focus:outline-none focus:border-[#6C25FF] focus:ring-1 focus:ring-[#6C25FF] ${
                  errors.email ? 'border-[#DD4A3D]' : ''
                }`}
              />
              <label
                htmlFor="email"
                className="absolute left-3 top-2 text-[13px] bg-[#F7F8F9] px-1 font-[Rubik] text-[#6C25FF] transition-all duration-200
                  peer-placeholder-shown:top-3.5
                  peer-placeholder-shown:text-sm
                  peer-placeholder-shown:text-[#6C25FF]
                  peer-focus:top-2
                  peer-focus:text-[13px]
                  peer-focus:text-[#6C25FF]"
              >
                Email Address
              </label>
              {errors.email && (
                <p className="mt-1 text-[13px] text-[#DD4A3D]">{errors.email}</p>
              )}
            </div>

            {/* Password Input */}
            <div className="relative pt-6">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder=" "
                required
                className={`peer w-full border rounded-md px-3 pt-5 pb-2 bg-[#F7F8F9] text-[14px] text-[#1D2226] border-[#CBCBCB] focus:outline-none focus:border-[#6C25FF] focus:ring-1 focus:ring-[#6C25FF] ${
                  errors.password || errors.general ? 'border-[#DD4A3D]' : ''
                }`}
              />
              <label
                htmlFor="password"
                className="absolute left-3 top-2 text-[13px] bg-[#F7F8F9] px-1 font-[Rubik] text-[#6C25FF] transition-all duration-200
                  peer-placeholder-shown:top-3.5
                  peer-placeholder-shown:text-sm
                  peer-placeholder-shown:text-[#6C25FF]
                  peer-focus:top-2
                  peer-focus:text-[13px]
                  peer-focus:text-[#6C25FF]"
              >
                Password
              </label>
              {errors.password && (
                <p className="mt-1 text-[13px] text-[#DD4A3D]">{errors.password}</p>
              )}
            </div>

            {errors.general && (
              <p className="text-[#DD4A3D] text-[13px]">{errors.general}</p>
            )}

            <button
              type="submit"
              className={`w-full bg-[#CBCBCB] hover:bg-[#a6a6a6] text-white text-[16px] font-medium py-3 rounded-md ${
                !(formData.email && formData.password) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={!formData.email || !formData.password}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignInScreen;
