import { useNavigate } from 'react-router-dom';

function WelcomeScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      {/* Mobile-like container with fixed size and sharp edges */}
      <div
        className="bg-[#F7F8F9] w-[375px] h-[667px] p-6"
        style={{ borderRadius: 0 }}
      >
        <div className="flex flex-col justify-end items-center h-full">
          <div className="w-full max-w-sm pb-12">
            <div className="mb-10">
              <h1 className="text-[28px] font-medium text-[#1D2226] leading-[36px] font-rubik">
                Welcome to PopX
              </h1>
              <p className="text-[18px] text-[#1D2226] opacity-70 font-rubik leading-[26px] mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => navigate('/create-account')}
                className="w-full py-3 bg-[#6C25FF] text-white rounded-md font-medium text-[16px] leading-[17px] font-rubik"
              >
                Create Account
              </button>

              <button
                onClick={() => navigate('/sign-in')}
                className="w-full py-3 bg-[#CBCBCB] text-[#1D2226] rounded-md font-medium text-[16px] leading-[17px] font-rubik"
              >
                Already Registered? Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomeScreen;
