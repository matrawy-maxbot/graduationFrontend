"use client";

import { useState } from 'react';
import Joi from 'joi';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export const loginUser = async (credentials) => {
  try {
    // Validation schema with modified email validation for browser compatibility
    const schema = Joi.object({
      email: Joi.string()
        .email({ tlds: { allow: false } }) // Disable TLD validation
        .required(),
      password: Joi.string().required()
    });

    // Validate input
    const { error } = schema.validate(credentials);
    
    if (error) {
      return {
        success: false,
        message: error.details[0].message
      };
    }

    console.log(credentials);

    // Make API request with axios
    const response = await axios.post(
      'http://localhost:3001/api/v1/users/login', 
      credentials,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      }
    );

    // With axios, the data is already parsed as JSON
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Login error:', error);
    
    // Handle axios error responses
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return {
        success: false,
        message: error.response.data.message || 'Login failed'
      };
    } else if (error.request) {
      // The request was made but no response was received
      return {
        success: false,
        message: 'No response from server. Please check your connection.'
      };
    } else {
      // Something happened in setting up the request that triggered an Error
      return {
        success: false,
        message: error.message || 'An error occurred during login'
      };
    }
  }
};

// دالة للتحقق من صلاحية التوكن
export const verifyToken = async (token) => {
  try {
    if (!token) {
      return {
        success: false,
        message: 'No token provided'
      };
    }

    // التحقق من التوكن باستخدام نقطة نهاية API
    const response = await axios.get(
      'http://localhost:3001/api/v1/users/verify-token',
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      }
    );

    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Token verification error:', error);
    
    // Handle axios error responses
    if (error.response) {
      return {
        success: false,
        message: error.response.data.message || 'Token verification failed'
      };
    } else if (error.request) {
      return {
        success: false,
        message: 'No response from server. Please check your connection.'
      };
    } else {
      return {
        success: false,
        message: error.message || 'An error occurred during token verification'
      };
    }
  }
};

// التحقق مما إذا كان المستخدم مصرح له بالوصول إلى مسار معين
export const checkAuthorization = (userType, currentPath) => {
  // مسارات مسموح بها لكل نوع مستخدم
  const authorizedPaths = {
    0: ['/students'], // الطلاب
    1: ['/teachers/assistants'], // المساعدين
    2: ['/teachers/doctors'], // الدكاترة
    3: ['/admins'], // المسؤولين
    4: ['/teachers/doctors'] // نوع إضافي (قد يكون رئيس قسم مثلاً)
  };

  // التحقق من صفحة تسجيل الدخول
  if (currentPath === '/login') {
    return true;
  }

  // التحقق من الصفحة الرئيسية
  if (currentPath === '/') {
    return true;
  }

  // التحقق إذا كان المستخدم غير معرّف أو نوعه غير موجود
  if (userType === undefined || !authorizedPaths[userType]) {
    return false;
  }

  // التحقق ما إذا كان المسار الحالي يبدأ بأحد المسارات المصرح بها لنوع المستخدم
  return authorizedPaths[userType].some(path => currentPath.startsWith(path));
};