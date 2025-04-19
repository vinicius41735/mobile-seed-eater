import { ReactNode } from "react";
import { View } from "react-native";

interface InputRootProps {
  children: ReactNode
}

function Field({ children }: InputRootProps){
  return (
    <View
      className="w-full h-16 flex-row items-center gap-3 px-3 border border-secondary bg-secondary/10 rounded-lg"
    >
      {children}
    </View>
  );
}

function Search({ children }: InputRootProps){
  return (
    <View
      className="flex-row items-center mx-2 px-3 border border-secondary bg-secondary/10 rounded-full"
    >
      {children}
    </View>
  );
}

export const InputRoot = {
  Field,
  Search
}