import { colors, fontSize } from "@constants";
import { ElementType } from "react";

interface InputIconProps {
  icon: ElementType;
  name: string;
}

export function InputIcon({ icon: Icon, name }: InputIconProps){
  return (
    <Icon
      name={name}
      color={colors.secondary}
      size={fontSize["2xl"]}
    />  
  );
}