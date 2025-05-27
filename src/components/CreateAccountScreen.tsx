import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../utils/validation';
import { saveUser } from '../utils/storage';

interface FormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  password: string;
  companyName: string;
  isAgency: boolean;
}

function CreateAccountScreen() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phoneNumber: '',
    email: '',
    password: '',
    companyName: '',
    isAgency: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'radio' ? value === 'true' : value,
    }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.fullName) newErrors.fullName = 'Name is required';
    if (!validateEmail(formData.email)) newErrors.email = 'Invalid email';
    if (formData.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters';
    if (!formData.companyName) newErrors.companyName = 'Company name is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      saveUser({
        ...formData,
        profilePicture: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(formData.fullName)}`,
      });
      navigate('/account-settings');
    }
  };

  const renderInput = (
    name: keyof FormData,
    label: string,
    type: string = 'text'
  ) => (
    <div className="relative pt-4">
      <input
        type={type}
        name={name}
        value={(formData as any)[name]}
        onChange={handleChange}
        placeholder=" "
        required
        className={`peer w-full border rounded-md px-3 pt-4 pb-2 bg-[#F7F8F9] text-[14px] font-[Rubik] text-[#1D2226] border-[#CBCBCB] focus:outline-none focus:border-[#6C25FF] focus:ring-1 focus:ring-[#6C25FF] ${errors[name] ? 'border-[#DD4A3D]' : ''
          }`}
      />
      <label
        htmlFor={name}
        className="absolute left-3 top-1.5 text-[13px] font-[Rubik] bg-[#F7F8F9] px-1 transition-all duration-200
          text-[#6C25FF] 
          peer-placeholder-shown:top-3
          peer-placeholder-shown:text-sm
          peer-placeholder-shown:text-[#6C25FF] 
          peer-focus:top-1.5
          peer-focus:text-[13px]
          peer-focus:text-[#6C25FF]"
      >
        {label}
        <span className="text-[#DD4A3D]">*</span>
      </label>
      {errors[name] && (
        <p className="mt-1 text-[13px] text-[#DD4A3D]">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-2 py-6">
      <div className="w-[375px] h-[667px] bg-[#F7F8F9] p-6 flex flex-col justify-between" style={{ borderRadius: 0 }}>
        <div className="flex flex-col flex-grow overflow-hidden">
          <h1 className="text-[24px] leading-[32px] font-medium text-[#1D2226] mb-4">
            Create your PopX account
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col flex-grow justify-start space-y-3">
            {renderInput('fullName', 'Full Name')}
            {renderInput('phoneNumber', 'Phone number')}
            {renderInput('email', 'Email address', 'email')}
            {renderInput('password', 'Password', 'password')}
            {renderInput('companyName', 'Company name')}

            <div>
              <label className="text-[13px] text-[#1D2226]">
                Are you an Agency?<span className="text-[#DD4A3D]">*</span>
              </label>
              <div className="flex gap-6 mt-2">
                {[
                  { label: 'Yes', value: true },
                  { label: 'No', value: false },
                ].map(({ label, value }) => (
                  <label key={label} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="isAgency"
                      value={String(value)}
                      checked={formData.isAgency === value}
                      onChange={handleChange}
                      className="h-4 w-4 accent-[#6C25FF]"
                    />
                    <span className="ml-2 text-[13px] text-[#1D2226]">{label}</span>
                  </label>
                ))}
              </div>
            </div>
          </form>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-[#6C25FF] hover:bg-[#642AF5] text-white text-[16px] font-medium py-3 rounded-md shadow-md"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateAccountScreen;
