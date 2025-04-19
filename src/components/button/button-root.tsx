import { ReactNode } from "react";
import { Pressable, PressableProps } from "react-native";

interface ButtonRootProps extends Omit<PressableProps, 'children'> {
  children: ReactNode
}

function Submit({ children, ...rest }: ButtonRootProps){
  return (
    <Pressable
      className="w-full h-16 bg-secondary items-center justify-center rounded-lg"
      {...rest}
    >
      {children}
    </Pressable>
  );
}

function Redirect({ children, ...rest }: ButtonRootProps){
  return (
    <Pressable
      className="bg-secondary p-4 px-5 rounded-full"
      {...rest}
    >
      {children}
    </Pressable>
  );
}

function Link({ children, ...rest }: ButtonRootProps){
  return (
    <Pressable
      {...rest}
    >
      {children}
    </Pressable>
  );
}

export const ButtonRoot = {
  Submit,
  Redirect,
  Link
}