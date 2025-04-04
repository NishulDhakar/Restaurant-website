import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUserCircle, FaSignInAlt, FaUserPlus, 
  FaSignOutAlt, FaCog, FaHistory, FaHeart,
  FaCreditCard, FaMapMarkerAlt, FaQuestionCircle
} from 'react-icons/fa';
import './user.css';

const User = ({ onClose, darkMode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [activeTab, setActiveTab] = useState('profile');
  const [avatarHover, setAvatarHover] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    onClose();
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setIsRegistering(false);
    onClose();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setFormData({ email: '', password: '', name: '' });
    onClose();
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="tab-content">
            <div className="profile-section">
              <div 
                className="avatar-container"
                onMouseEnter={() => setAvatarHover(true)}
                onMouseLeave={() => setAvatarHover(false)}
              >
                <FaUserCircle className="user-avatar" />
                <AnimatePresence>
                  {avatarHover && (
                    <motion.div 
                      className="avatar-overlay"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      Change Avatar
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="user-details">
                <h4>{formData.name || 'Cosmic Explorer'}</h4>
                <p>{formData.email || 'explorer@cosmicbites.com'}</p>
                <div className="user-stats">
                  <div className="stat">
                    <span className="stat-number">42</span>
                    <span className="stat-label">Orders</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">8</span>
                    <span className="stat-label">Favorites</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'orders':
        return (
          <div className="tab-content">
            <div className="order-history">
              <div className="order-card">
                <div className="order-header">
                  <span className="order-id">#COSMIC-78945</span>
                  <span className="order-status delivered">Delivered</span>
                </div>
                <div className="order-date">March 15, 2023</div>
                <div className="order-items">3 items • $42.50</div>
                <button className="order-action">Reorder</button>
              </div>
              <div className="order-card">
                <div className="order-header">
                  <span className="order-id">#COSMIC-78231</span>
                  <span className="order-status preparing">Preparing</span>
                </div>
                <div className="order-date">March 10, 2023</div>
                <div className="order-items">5 items • $68.75</div>
                <button className="order-action">Track Order</button>
              </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="tab-content">
            <div className="settings-section">
              <div className="setting-item">
                <label>Notification Preferences</label>
                <select>
                  <option>All Notifications</option>
                  <option>Order Updates Only</option>
                  <option>Disabled</option>
                </select>
              </div>
              <div className="setting-item">
                <label>Theme</label>
                <select>
                  <option>System Default</option>
                  <option>Light Mode</option>
                  <option>Dark Mode</option>
                </select>
              </div>
              <div className="setting-item">
                <label>Language</label>
                <select>
                  <option>English</option>
                  <option>Español</option>
                  <option>Français</option>
                </select>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div 
      className={`user-dropdown ${darkMode ? 'dark' : ''}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
    >
      <div className="dropdown-arrow"></div>
      
      {isLoggedIn ? (
        <div className="user-menu">
          <div className="user-header">
            <div 
              className="avatar-container"
              onMouseEnter={() => setAvatarHover(true)}
              onMouseLeave={() => setAvatarHover(false)}
            >
              <FaUserCircle className="user-avatar" />
              <AnimatePresence>
                {avatarHover && (
                  <motion.div 
                    className="avatar-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Change
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="user-info">
              <h4>{formData.name || 'Cosmic Explorer'}</h4>
              <p>{formData.email || 'explorer@cosmicbites.com'}</p>
            </div>
          </div>
          
          <div className="user-tabs">
            <button 
              className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <FaUserCircle className="tab-icon" />
              Profile
            </button>
            <button 
              className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <FaHistory className="tab-icon" />
              Orders
            </button>
            <button 
              className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <FaCog className="tab-icon" />
              Settings
            </button>
          </div>
          
          {renderTabContent()}
          
          <div className="user-footer">
            <button className="footer-action">
              <FaQuestionCircle className="action-icon" />
              Help Center
            </button>
            <button 
              className="footer-action logout"
              onClick={handleLogout}
            >
              <FaSignOutAlt className="action-icon" />
              Sign Out
            </button>
          </div>
        </div>
      ) : isRegistering ? (
        <form className="auth-form" onSubmit={handleRegister}>
          <h3>Join the Cosmic Journey</h3>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
              minLength="6"
            />
          </div>
          <motion.button 
            type="submit" 
            className="auth-button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Create Account
          </motion.button>
          <button 
            type="button" 
            className="auth-switch"
            onClick={() => setIsRegistering(false)}
          >
            Already have an account? Sign in
          </button>
        </form>
      ) : (
        <form className="auth-form" onSubmit={handleLogin}>
          <h3>Welcome Back Explorer</h3>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <motion.button 
            type="submit" 
            className="auth-button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaSignInAlt className="auth-icon" />
            Sign In
          </motion.button>
          <button 
            type="button" 
            className="auth-switch"
            onClick={() => setIsRegistering(true)}
          >
            <FaUserPlus className="auth-icon" />
            New to our restraurent? Join us
          </button>
        </form>
      )}
    </motion.div>
  );
};

export default React.memo(User);
