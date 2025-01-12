import { useNavigate } from "react-router-dom";

export const useNavigateAndScroll = () => {
    const navigate = useNavigate();

    const navigateAndScroll = (path, id) => {
        navigate(path);
        setTimeout(() => {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }, 100);
    };

    return navigateAndScroll;
};
