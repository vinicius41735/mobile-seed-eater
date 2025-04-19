import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { api } from "@services";

interface AuthContextData {
  signed: boolean;
  userId: number | null;
  userLogin: string | null;
  loading: boolean;
  signIn(userName: string, password: string): Promise<void>;
  signOut(): void;
  clear(): void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [userId, setUserId] = useState<number | null>(null);
  const [userLogin, setUserLogin] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoragedData() {
      const storageUserId = await AsyncStorage.getItem('user_id');
      const storageUserLogin = await AsyncStorage.getItem('user_login');
      const storageToken = await AsyncStorage.getItem('token');
      //console.log(storageToken)

      if(storageUserId && storageUserLogin && storageToken){
        setUserId(Number(storageUserId));
        setUserLogin(storageUserLogin);
        setLoading(false);

        api.defaults.headers['x-session-token'] = storageToken;
      }
    }

    loadStoragedData();
  }, [])

  async function signIn(userName: string, password: string) {
    const res = await api.post("/sessions", { login: userName, password: password });
    const data = res.data;

    console.log(data.token)

    setUserId(data.id);
    setUserLogin(data.user_login);

    api.defaults.headers['x-session-token'] = data.token;

    await AsyncStorage.setItem('user_id', String(data.id));
    await AsyncStorage.setItem('user_login', data.user_login);
    await AsyncStorage.setItem('token', data.token);
  }

  async function signOut() {
    const storageUserId = await AsyncStorage.getItem('user_id');
    const res = await api.delete(`/sessions/${storageUserId}`);
    const data = res.status;
    console.log(data)

    AsyncStorage.clear().then(() => {
      setUserId(null);
      setUserLogin(null);
    })
  }

  async function clear() {
    AsyncStorage.clear().then(() => {
      setUserId(null);
      setUserLogin(null);
    })
  }

  return (
    <AuthContext.Provider value={{signed: !!userId, userId, userLogin, loading, signIn, signOut, clear}}>
      { children }
    </AuthContext.Provider> 
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}