const {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    FB_CLIENT_ID,
    FB_CLIENT_SECRET,
    FB_CLIENT_CALLBACKURL,
    GOOGLE_CLIENT_CALLBACKURL
} = process.env;

const passportGoogleConfig = {
    clientSecret: GOOGLE_CLIENT_SECRET,
    clientID: GOOGLE_CLIENT_ID,
    callbackURL: GOOGLE_CLIENT_CALLBACKURL,
    profileFields: ["id", "displayName", "email"]
};

const passportFacebookConfig = {
    clientID: FB_CLIENT_ID,
    clientSecret: FB_CLIENT_SECRET,
    callbackURL: FB_CLIENT_CALLBACKURL,
    profileFields: ["id", "displayName", "email"]
};

export {
    passportFacebookConfig,
    passportGoogleConfig
};