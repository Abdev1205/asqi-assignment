import { IconType } from "react-icons";

interface IconStarProps {
  icon: IconType;
}

// Create the component
const Icon: React.FC<IconStarProps> = ({ icon: Icon }) => {
  return <Icon />;
};

export default Icon;
