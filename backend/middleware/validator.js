import { errorResponse } from '../utils/responseHandler.js';

export const validateCartAdd = (req, res, next) => {
  const { productId, quantity } = req.body;
  if (!productId) {
    return errorResponse(res, 'Product ID is required', 400);
  }
  if (quantity !== undefined && (isNaN(quantity) || parseInt(quantity, 10) < 1)) {
    return errorResponse(res, 'Quantity must be a positive integer', 400);
  }
  next();
};

export const validateCartUpdate = (req, res, next) => {
  const { quantity } = req.body;
  if (quantity === undefined || isNaN(quantity) || parseInt(quantity, 10) < 0) {
    return errorResponse(res, 'A valid non-negative quantity is required', 400);
  }
  next();
};

export const validateContact = (req, res, next) => {
  const { name, email, subject, message } = req.body;
  const errors = [];

  if (!name || !name.trim()) errors.push('Name is required');
  if (!email || !email.trim()) {
    errors.push('Email is required');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      errors.push('Please provide a valid email address');
    }
  }
  if (!subject || !subject.trim()) errors.push('Subject is required');
  if (!message || !message.trim()) {
    errors.push('Message is required');
  } else if (message.trim().length < 10) {
    errors.push('Message must be at least 10 characters long');
  }

  if (errors.length > 0) {
    return errorResponse(res, 'Validation failed', 400, errors);
  }

  next();
};
