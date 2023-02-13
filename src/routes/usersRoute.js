import { Router } from 'express';
import { loginUser } from './usersControllers/loginUser.js';
import { registerUser } from './usersControllers/registerUser.js';
import { logoutUser } from './usersControllers/logoutUser.js';
import { verifyUserEmail } from './usersControllers/verifyUserEmail.js';
import { userValidationMiddleware } from '../models/validation/userModelValidation.js';
import { resetPasswordValidationMiddleware } from '../models/validation/resetPasswordValidation.js';
import { forgotPasswordSendEmail } from './usersControllers/forgotPasswordSendEmail.js';
import { resetUserPassword } from './usersControllers/resetUserPassword.js';
import { getUserSocial } from './usersControllers/getUserSocial.js';
import { authMiddleware } from '../utils.js';
import { addIntroData } from './usersControllers/addIntroData.js';
import { getUserData } from './usersControllers/getUserData.js';
import { getUserProjectsData } from './usersControllers/getUserProjectsData.js';
import { addProjectData } from './usersControllers/addProjectData.js';
import { deleteOneProject } from './usersControllers/deleteOneProject.js';
import { addUserImage } from './usersControllers/addUserImage.js';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { getProudOfData } from './usersControllers/getProudOfData.js';
import { addProudOf } from './usersControllers/addProudOfState.js';
import { getContactData } from './usersControllers/getContactData.js';
import { addContactData } from './usersControllers/addContactData.js';
import { changePassword } from './usersControllers/changePassword.js';
import { updateUser } from './usersControllers/updateUser.js';
import { getOneUser } from './usersControllers/getOneUser.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { downloadFile } from './usersControllers/downloadFile.js';
import { getAllData } from './usersControllers/getAllData.js';
import { deleteOneUser } from './usersControllers/deleteOneUser.js';

// ES6 modules not supporting __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Account access information from CLOUDINARY
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export async function handleUpload(file) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: 'auto',
  });
  return res;
}

const storage = new multer.memoryStorage();

const upload = multer({
  storage,
});

export const usersRoute = Router();

// GET ALL DATA
usersRoute.get('/getAllData/:userId', getAllData);

// GET one user
usersRoute.post('/getOne', getUserSocial);

// GET one user
usersRoute.get('/getOne/:user_id', authMiddleware, getOneUser);

// POST LOGIN
usersRoute.post('/login', loginUser);

// POST REGISTER
usersRoute.post('/register', userValidationMiddleware, registerUser);

// GET LOGOUT
usersRoute.get('/logout', logoutUser);

// PUT verify-email
usersRoute.put('/verify-email', verifyUserEmail);

//PUT Forgot password
usersRoute.post('/forgot-password/', forgotPasswordSendEmail);

// PUT Reset user password
usersRoute.patch(
  '/reset-password/',
  resetPasswordValidationMiddleware,
  resetUserPassword
);

// PUT Change user password
usersRoute.patch(
  '/changePassword',
  resetPasswordValidationMiddleware,
  changePassword
);

// Patch update user
usersRoute.patch('/updateUser', updateUser);

// PATCH put user data intro database
usersRoute.patch('/addIntroData', addIntroData);

//PATCH proudOfData
usersRoute.patch('/addProudOf', addProudOf);

// PATCH user projects data
usersRoute.put('/addProjectData', addProjectData);

// GET user data from database
usersRoute.post('/getUserData', getUserData);

// GET projects

// GET user projects from database
usersRoute.post('/getUserProjects', getUserProjectsData);

// Delete ONE project
usersRoute.delete('/deleteOneProject/:projectId', deleteOneProject);

// POST UPLOAD IMAGE
usersRoute.patch(
  '/uploadImage/:projectId/:userId',
  upload.single('image'),
  addUserImage
);

// POST Download Resume
usersRoute.post('/downloadFile/:userId', upload.single('file'), downloadFile);

// GET PROUD OF
usersRoute.post('/getProudOf', getProudOfData);

//GET CONTACT DATA
usersRoute.post('/getContactData', getContactData);

// PATCH add contact data
usersRoute.patch('/addContactData', addContactData);

//DELETE ONE USER
usersRoute.delete('/deleteOneUser/:userId', deleteOneUser);
