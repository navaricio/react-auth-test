const isUserAuthenticated = auth => {
    return Object.prototype.hasOwnProperty.call(auth, "uid");
};

export default { isUserAuthenticated };
