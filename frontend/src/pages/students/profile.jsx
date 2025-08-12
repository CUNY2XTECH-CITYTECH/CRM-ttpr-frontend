import { useState, useEffect } from 'react';
import Layout from '@/components/layout';
import { Topbar } from '@/components/topbar';
import { useAuth } from '@/lib/dataContext';
import { useNavigate } from 'react-router';
const StudentProfileUpdate = ({ userId }) => {
  const { currentUser, token } = useAuth()
  const navigate = useNavigate()
  const [student, setStudent] = useState({
    name: '',
    profileImage: '',
    bio: '',
    pronouns: 'she/her',
    company: false,
    location: 'New York, USA',
    showLocalTime: true,
    website: '',
    socialLinks: [
      '',
      '',
      '',
      ''
    ],
    achievements: [],
    organizations: []
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [localTime, setLocalTime] = useState('');

  useEffect(() => {
    if (currentUser?.role !== 'student') {
      navigate('/not-authorized')
    }
    if (!token) {
      navigate('/login')
    }

    const updateTime = () => {
      setLocalTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, [token]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setStudent(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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
      setStudent(prev => ({
        ...prev,
        profileImage: file
      }));
    }
  };

  const handleSocialLinkChange = (index, value) => {
    const newSocialLinks = [...student.socialLinks];
    newSocialLinks[index] = value;
    setStudent(prev => ({
      ...prev,
      socialLinks: newSocialLinks
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile updated:', student);
    alert('Profile updated successfully!');
  };

  return (
    <>
      {currentUser &&
        <Layout user={currentUser}>
          <div className="flex-1 flex flex-col overflow-hidden">
            <Topbar title="Student Profile" mode="create" />
            <div className="min-h-screen bg-gray-50 flex justify-start p-8">
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
                        value={student.name}
                        onChange={handleChange}
                        placeholder="Full Name"
                        className="text-xl font-bold w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <h2 className="text-xl font-semibold mb-4">Profile Details</h2>

                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Bio</label>
                    <textarea
                      name="bio"
                      value={student.bio}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="3"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      You can @mention other users and organisations to link to them.
                    </p>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Pronouns</label>
                    <div className="flex space-x-2 mb-2">
                      <input
                        type="text"
                        name="pronouns"
                        value={student.pronouns}
                        onChange={handleChange}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Social accounts</label>
                    <div className="space-y-2">
                      {student.socialLinks.map((link, index) => (
                        <input
                          key={index}
                          type="url"
                          value={link}
                          onChange={(e) => handleSocialLinkChange(index, e.target.value)}
                          placeholder={`Link to social profile ${index + 1}`}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold mb-4">Achievements</h3>

                  <h4 className="font-medium mb-2">Organizations</h4>
                  <div className="space-y-2">
                    {student.organizations.length > 0 ? (
                      student.organizations.map((org, index) => (
                        <div key={index} className="flex items-center">
                          <span>{org}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No organizations added yet</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      }
    </>
  );
};

export default StudentProfileUpdate;
