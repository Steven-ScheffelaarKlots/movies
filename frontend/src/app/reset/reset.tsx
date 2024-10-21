import { resetMovies } from "@/utils/api";

import React from "react";

const ResetButton: React.FC = () => {
    const handleReset = async () => {
        try {
            await resetMovies();
        } catch (error) {
            console.error("Failed to reset movies", error);
        }
    };

    return (
        <button className="submit-button" onClick={handleReset}>
            Reset Movies
        </button>
    );
};

export default ResetButton;