import React from "react";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";

const AuthButton = ({ onClick, buttonText, provider, link }) => {
    return (
        <Button variant="primary" size="lg" onClick={onClick} href={link} block>
            {buttonText}
        </Button>
    );
};

AuthButton.propTypes = {
    link: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    buttonText: PropTypes.string.isRequired,
    provider: PropTypes.string.isRequired
};

export default AuthButton;
