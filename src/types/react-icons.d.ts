import { IconBaseProps } from 'react-icons';

declare module 'react-icons/fi' {
  export interface IconProps extends IconBaseProps {
    size?: number | string;
    color?: string;
    title?: string;
  }
  
  export const FiSearch: React.FC<IconProps>;
  export const FiMapPin: React.FC<IconProps>;
  export const FiTag: React.FC<IconProps>;
  export const FiArrowLeft: React.FC<IconProps>;
  export const FiMessageSquare: React.FC<IconProps>;
  export const FiUser: React.FC<IconProps>;
  export const FiClock: React.FC<IconProps>;
} 