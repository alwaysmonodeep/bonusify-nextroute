import React, { useState } from "react";
import {
  FaUser,
  FaSignOutAlt,
  FaEye,
  FaEyeSlash,
  FaCheck,
  FaPhoneAlt} from "react-icons/fa";
import { MdNumbers,MdMail } from "react-icons/md";
export default function MyAccountSection() {
  const [user, setUser] = useState({
    fname: "User",
    lname: "User",
    email: "care@gmail.com",
    mobile: "7123456789",
    CID: "123454",
  });

  const [activeTab, setActiveTab] = useState("personal");

  // Personal Details form state
  const [personalDetails, setPersonalDetails] = useState({
    fname: user.fname,
    lname: user.lname,
    email: user.email,
    mobile: user.mobile,
  });

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isUpdatingPersonal, setIsUpdatingPersonal] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [messages, setMessages] = useState({});

  const showMessage = (type, message) => {
    setMessages((prev) => ({ ...prev, [type]: message }));
    setTimeout(() => {
      setMessages((prev) => ({ ...prev, [type]: "" }));
    }, 3000);
  };

  const handlePersonalDetailsUpdate = async () => {
    setIsUpdatingPersonal(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setUser(personalDetails);
    setIsUpdatingPersonal(false);
    showMessage("personal", "Personal details updated successfully!");
  };

  const handlePasswordUpdate = async () => {
    if (newPassword !== confirmPassword) {
      showMessage("password", "New passwords do not match!");
      return;
    }

    if (newPassword.length < 8) {
      showMessage("password", "Password must be at least 8 characters long!");
      return;
    }

    setIsUpdatingPassword(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setIsUpdatingPassword(false);
    showMessage("password", "Password updated successfully!");
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      // Simulate logout process
      showMessage("logout", "Logging out...");
      setTimeout(() => {
        console.log("User logged out");
        // In a real app, you would redirect to login page
      }, 1000);
    }
  };

  const hasPersonalChanges = () => {
    return (
      personalDetails.fname !== user.fname ||
      personalDetails.lname !== user.lname ||
      personalDetails.email !== user.email ||
      personalDetails.mobile !== user.mobile
    );
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile Overview - Read Only */}
          <div className="bg-gray-50 rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-start space-x-4">
              {/* Profile Avatar */}
              <div className="w-16 h-16  rounded-full flex items-center justify-center flex-shrink-0">
                <FaUser className="w-8 h-8 text-gray-900" />
              </div>

              {/* Profile Details */}
              <div className="flex-1 min-w-0">
                <div className="mb-4">
                  <h4 className="text-xl font-semibold text-gray-900 mb-1">
                    {user.fname} {user.lname}
                  </h4>
                  <p className="text-sm text-gray-500">Account Holder</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center mr-3">
                      <MdNumbers className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {user.CID}
                      </p>
                      <p className="text-xs text-gray-500">Client Number</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center mr-3">
                      <MdMail className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {user.email}
                      </p>
                      <p className="text-xs text-gray-500">Email Address</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center mr-3">
                      <FaPhoneAlt className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {user.mobile}
                      </p>
                      <p className="text-xs text-gray-500">Mobile Number</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Status */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Account Status</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5"></div>
                  Active
                </span>
              </div>
            </div>
          </div>
          {/* Placeholder for second column in large screens */}
          <div className="hidden lg:block"></div>
        </div>

        {/* Account Settings Section with Tabs */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab("personal")}
                className={`py-2 px-1 border-b-2 font-medium text-md ${
                  activeTab === "personal"
                    ? "border-gray-900 text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Personal Details
              </button>
              <button
                onClick={() => setActiveTab("password")}
                className={`py-2 px-1 border-b-2 font-medium text-md ${
                  activeTab === "password"
                    ? "border-gray-900 text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Password
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === "personal" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={personalDetails.fname}
                    onChange={(e) =>
                      setPersonalDetails((prev) => ({
                        ...prev,
                        fname: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg "
                    placeholder="Enter first name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={personalDetails.lname}
                    onChange={(e) =>
                      setPersonalDetails((prev) => ({
                        ...prev,
                        lname: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg "
                    placeholder="Enter last name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={personalDetails.email}
                    onChange={(e) =>
                      setPersonalDetails((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg "
                    placeholder="Enter email address"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    value={personalDetails.mobile}
                    onChange={(e) =>
                      setPersonalDetails((prev) => ({
                        ...prev,
                        mobile: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg "
                    placeholder="Enter mobile number"
                    required
                  />
                </div>
              </div>

              {messages.personal && (
                <div className="flex items-center text-green-600 text-sm">
                  <FaCheck className="w-4 h-4 mr-2" />
                  {messages.personal}
                </div>
              )}

              <button
                onClick={handlePersonalDetailsUpdate}
                disabled={isUpdatingPersonal || !hasPersonalChanges()}
                className="bg-gray-900 text-white py-2 px-6 rounded-lg hover:bg-gray-600 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {isUpdatingPersonal ? "Updating..." : "Update Personal Details"}
              </button>
            </div>
          )}

          {activeTab === "password" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg "
                      placeholder="Enter current password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showCurrentPassword ? (
                        <FaEyeSlash className="w-4 h-4" />
                      ) : (
                        <FaEye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <p className="text-sm text-blue-600 hover:text-blue-500 hover:underline cursor-pointer pt-2 pl-1">
                    Forget password?
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg "
                      placeholder="Enter new password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showNewPassword ? (
                        <FaEyeSlash className="w-4 h-4" />
                      ) : (
                        <FaEye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg "
                      placeholder="Confirm new password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? (
                        <FaEyeSlash className="w-4 h-4" />
                      ) : (
                        <FaEye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {messages.password && (
                <div
                  className={`flex items-center text-sm ${
                    messages.password.includes("successfully")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  <FaCheck className="w-4 h-4 mr-2" />
                  {messages.password}
                </div>
              )}

              <button
                onClick={handlePasswordUpdate}
                disabled={
                  isUpdatingPassword ||
                  !currentPassword ||
                  !newPassword ||
                  !confirmPassword
                }
                className="bg-gray-800 text-white py-2 px-6 rounded-lg hover:bg-gray-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {isUpdatingPassword ? "Updating..." : "Update Password"}
              </button>
            </div>
          )}
        </div>

        {/* Logout Section */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Account Actions
              </h3>
              <p className="text-gray-600 text-sm">
                Manage your session and account access
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              <FaSignOutAlt className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
          {messages.logout && (
            <div className="mt-4 text-blue-600 text-sm">{messages.logout}</div>
          )}
        </div>
      </div>
    </div>
  );
}
