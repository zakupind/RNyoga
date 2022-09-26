import React from 'react';
import FAIcon from 'react-native-vector-icons/FontAwesome';

FAIcon.loadFont();

type IconSizeProps = {
  iconSizes: keyof typeof IconSizes;
};

export interface IconProps {
  size: IconSizeProps['iconSizes'];
  name: string;
  color: string;
}

export const IconSizes = {
  small: 13,
  medium: 18,
  large: 23,
  extraLarge: 27,
};

export const Icon = ({ size, name, color }: IconProps) => (
  <FAIcon name={name} size={IconSizes[size]} color={color} />
);
