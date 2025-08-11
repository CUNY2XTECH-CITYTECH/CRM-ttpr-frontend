import { useState, useEffect } from 'react';
import Layout from '@/components/layout';
import { Topbar } from '@/components/topbar';

const StaffProfileUpdate = ({ userId }) => {
  const [currentUser,setCurrentUser] = useState(null)
  useEffect(async() => {
  }, [])
  
  const [staff, setStaff] = useState({
    name: '',
    profileImage: '',
    bio: '',
    pronouns: '',
    socialLinks: [
      'https://linkedin.com/in/staff-member',
      '',
      ''
    ],
    department: 'Computer Science',
    position: 'Professor'
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [localTime, setLocalTime] = useState('');

  // Update local time
  useEffect(() => {
    const updateTime = () => {
      setLocalTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStaff(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setStaff(prev => ({
        ...prev,
        profileImage: file
      }));
    }
  };

  const handleSocialLinkChange = (index, value) => {
    const newSocialLinks = [...staff.socialLinks];
    newSocialLinks[index] = value;
    setStaff(prev => ({
      ...prev,
      socialLinks: newSocialLinks
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Staff profile updated:', staff);
    alert('Profile updated successfully!');
  };

  return (
    <Layout>
        <div className="flex-1 flex flex-col overflow-hidden">
            <Topbar title="Staff Profile" mode="create" />
            <div className=" bg-gray-50 flex justify-start ">
              <div className="w-full max-w-2xl">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">{localTime}</h1>
                
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    {/* Profile Image and Name */}
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="relative">
                        <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden">
                          {imagePreview ? (
                            <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                          id="profileImage"
                        />
                        <label
                          htmlFor="profileImage"
                          className="absolute -bottom-2 -right-2 bg-blue-500 text-white p-1 rounded-full cursor-pointer hover:bg-blue-600"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                          </svg>
                        </label>
                      </div>
                      <div className="flex-1">
                        <input
                          type="text"
                          name="name"
                          value={staff.name}
                          onChange={handleChange}
                          placeholder="Full Name"
                          className="text-xl font-bold w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                          required
                        />
                        <input
                          type="text"
                          name="position"
                          value={staff.position}
                          onChange={handleChange}
                          placeholder="Position"
                          className="text-gray-600 w-full px-3 py-1 border-b border-gray-300 focus:outline-none focus:border-blue-500 mt-1"
                        />
                      </div>
                    </div>

                    {/* Bio */}
                    <div className="mb-6">
                      <label className="block text-gray-700 font-medium mb-2">Bio</label>
                      <textarea
                        name="bio"
                        value={staff.bio}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="3"
                      />
                    </div>

                    {/* Pronouns and Department */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">Pronouns</label>
                        <input
                          type="text"
                          name="pronouns"
                          value={staff.pronouns}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">Department</label>
                        <select
                          name="department"
                          value={staff.department}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="Computer Science">Computer Science</option>
                          <option value="Mathematics">Mathematics</option>
                          <option value="Physics">Physics</option>
                          <option value="Biology">Biology</option>
                          <option value="Chemistry">Chemistry</option>
                        </select>
                      </div>
                    </div>

                    {/* Social Accounts */}
                    <div className="mb-6">
                      <label className="block text-gray-700 font-medium mb-2">Social Accounts</label>
                      <div className="space-y-3">
                        {staff.socialLinks.map((link, index) => (
                          <div key={index} className="flex items-center">
                            <select
                              value={link.includes('linkedin') ? 'LinkedIn' : link.includes('twitter') ? 'Twitter' : 'Other'}
                              onChange={(e) => {
                                const platform = e.target.value;
                                let newLink = link;
                                if (platform === 'LinkedIn') newLink = 'https://linkedin.com/in/';
                                if (platform === 'Twitter') newLink = 'https://twitter.com/';
                                handleSocialLinkChange(index, newLink);
                              }}
                              className="mr-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="LinkedIn">LinkedIn</option>
                              <option value="Twitter">Twitter</option>
                              <option value="Other">Other</option>
                            </select>
                            <input
                              type="url"
                              value={link}
                              onChange={(e) => handleSocialLinkChange(index, e.target.value)}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder={`Social link ${index + 1}`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition cursor-pointer"
                    >
                      Save Profile
                    </button>
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
         <div className="bg-grey-50 flex ">
            <div className="w-full max-w-2xl ">
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">About Me Page</h2>
                <p className="text-gray-600 mb-4">
                  Here you can add any additional information or notes about the staff member.
                </p>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                  placeholder="Add any additional notes or information here..."
                ></textarea>
              </div>
            </div>
          </div>
    </Layout>
  );
};

export default StaffProfileUpdate;
