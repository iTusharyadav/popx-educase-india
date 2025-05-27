import { useEffect, useState } from 'react';
import { getUser } from '../utils/storage';

interface UserData {
  fullName: string;
  email: string;
  profilePicture?: string;
}

function AccountSettingsScreen() {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const user = getUser();
    if (user) {
      setUserData(user);
    }
  }, []);

  if (!userData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-2">
        <div className="animate-pulse text-[#1D2226]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-[375px] h-[667px] bg-[#F7F8F9] flex flex-col animate-fadeIn">
        <div className="bg-white p-4 shadow-sm">
          <h1 className="text-lg font-medium text-[#1D2226]">Account Settings</h1>
        </div>

        <div className="p-6 bg-[#00000007] mt-2 flex-grow overflow-auto">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={userData.profilePicture}
                alt={userData.fullName}
                className="w-16 h-16 rounded-full object-cover ring-2 ring-white"
              />
            </div>
            <div>
              <h2 className="font-medium text-[15px] text-[#1D2226] capitalize">
                {userData.fullName}
              </h2>
              <p className="text-sm text-[#1D2226] capitalize">
                {userData.email}
              </p>
            </div>
          </div>

          <p className="mt-6 text-sm text-[#1D2226] leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>

          {/* Dashed line for separation */}
          <hr className="mt-6 border-dashed border-t border-[#CBCBCB]" />
        </div>
      </div>
    </div>
  );
}

export default AccountSettingsScreen;
