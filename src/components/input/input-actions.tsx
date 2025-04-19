import { Pressable } from "react-native";
import { InputIcon } from "./input-icon";
import { ElementType } from "react";

interface InputActionsProps {
  onShowAction: () => void;
  icon: ElementType
  name: string;
}

export function InputActions({ onShowAction, icon, name }: InputActionsProps){
  return (
    <Pressable
      onPress={onShowAction}
    >
      <InputIcon
        icon={icon}
        name={name}
      />
    </Pressable>
  );
}