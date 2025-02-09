
const API_BASE_URL = 'http:192.168.1.60:5000'; // Replace with your IP address!

const LoginService = {
  registerUser: async (user: { fullname: any; email: any; pswd: any; }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullname: user.fullname,
          email: user.email,
          pswd: user.pswd, // ✅ ADD pswd here for registration
        }),
      });
      if (!response.ok) {
        const message = `Registration failed: ${response.status} - ${await response.text()}`; // Improved error message
        console.error("API Registration Error:", message); // Log detailed error
        return null; // Or handle error as needed
      }
      return await response.json(); // Or return appropriate data if needed
    } catch (error) {
      console.error("Error in registerUser:", error);
      return null; // Or handle error as needed
    }
  },

  loginUser: async (user: { email: any; pswd: any; }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          pswd: user.pswd,
        }),
      });
      if (!response.ok) {
        const message = `Login failed: ${response.status} - ${await response.text()}`; // Improved error message
        console.error("API Login Error:", message); // Log detailed error
        return null; // Or handle error as needed
      }
      return await response.json(); // Or return appropriate data if needed
    } catch (error) {
      console.error("Error in loginUser:", error);
      return null; // Or handle error as needed
    }
  },
};

export default LoginService;