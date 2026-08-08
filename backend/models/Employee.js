const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      maxlength: [100, 'Full name cannot exceed 100 characters'],
    },
    employeeId: {
      type: String,
      required: [true, 'Employee ID is required'],
      unique: true,
      trim: true,
      maxlength: [20, 'Employee ID cannot exceed 20 characters'],
      match: [/^[A-Za-z0-9-_]+$/, 'Employee ID must be alphanumeric'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: [150, 'Email cannot exceed 150 characters'],
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      maxlength: [20, 'Phone number cannot exceed 20 characters'],
      match: [/^[+\d][\d\s\-()\\.]{6,19}$/, 'Please provide a valid phone number'],
    },
    dateOfBirth: {
      type: Date,
    },
    gender: {
      type: String,
      enum: {
        values: ['Male', 'Female', 'Other'],
        message: '{VALUE} is not a valid gender option',
      },
    },
    address: {
      type: String,
      trim: true,
      maxlength: [500, 'Address cannot exceed 500 characters'],
    },
    department: {
      type: String,
      enum: {
        values: ['IT', 'HR', 'Finance', 'Marketing', 'Operations', 'Sales', 'Admin', 'Other'],
        message: '{VALUE} is not a valid department',
      },
    },
    position: {
      type: String,
      trim: true,
      maxlength: [100, 'Position cannot exceed 100 characters'],
    },
    joinDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Third argument explicitly sets the MongoDB collection name to 'HR'
module.exports = mongoose.model('Employee', employeeSchema, 'HR');
