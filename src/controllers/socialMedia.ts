// require('dotenv').config();
// import express from 'express';
// import querystring from 'query-string';
// const redirectURI = 'auth/google';
// import {
//   SERVER_ROOT_URI,
//   GOOGLE_CLIENT_ID,
//   JWT_SECRET,
//   GOOGLE_CLIENT_SECRET,
//   COOKIE_NAME,
//   UI_ROOT_URI,
// } from "../config";

// export async function getGoogleAuthURL() {
//   const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
//   const options = {
//     redirect_uri: `${process.env.SERVER_ROOT_URI}/${redirectURI}`,
//     client_id: GOOGLE_CLIENT_ID,
//     access_type: 'offline',
//     response_type: 'code',
//     prompt: 'consent',
//     scope: [
//       'https://www.googleapis.com/auth/userinfo.profile',
//       'https://www.googleapis.com/auth/userinfo.email',
//     ].join(' '),
//   };
//   return `${rootUrl}?${querystring.stringify(options)}`;
// }
