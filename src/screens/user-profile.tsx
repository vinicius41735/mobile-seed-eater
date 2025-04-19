import { Button, Loading } from '@components';
import { useAuth } from '@contexts';
import { api } from '@services';
import { useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { Followers } from '@models';
import { AxiosResponse } from 'axios';
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from '@constants';

interface FollowerCardProps {
  login: string;
}

const FollowerCard = ({ login }: FollowerCardProps) => (
  <View className="flex-row items-center p-4 mb-2 bg-secondary/10 rounded-xl border border-secondary">
    <View className="w-10 h-10 rounded-full bg-tertiary mr-3 items-center justify-center">
      <Text className="text-primary font-bold text-lg">
        {login[0]?.toUpperCase()}
      </Text>
    </View>
    <Text className="text-secondary font-medium text-lg">@{login}</Text>
  </View>
);

export function UserProfile({ route }: { route: any }) {
  const { name, login } = route.params;
  const { userLogin } = useAuth();
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [followerId, setFollowerId] = useState<number | null>(null);
  const [followers, setFollowers] = useState<string[]>([]);
  const navigation = useNavigation<any>();

  const fetchFollowers = useCallback(async () => {
    try {
      const response: AxiosResponse<Followers[]> = await api.get(`/users/${login}/followers`);
      const followersList = response.data.map((follower) => follower.follower_login);
      const currentFollower = response.data.find(follower => follower.follower_login === userLogin);

      setFollowers(followersList);
      
      if (currentFollower) {
        setIsFollowing(true);
        setFollowerId(currentFollower.followed_id);
      } else {
        setIsFollowing(false);
        setFollowerId(null);
      }
    } catch (error) {
      console.error('Error fetching followers:', error);
    } finally {
      setLoading(false);
    }
  }, [login, userLogin]);

  useEffect(() => {
    setLoading(true);
    fetchFollowers();
  }, [fetchFollowers]);

  const handleFollow = async () => {
    try {
      setLoading(true);
      
      if (isFollowing && followerId) {
        await api.delete(`/users/${login}/followers/${followerId}`);
      } else {
        await api.post(`/users/${login}/followers`);
      }
      
      // Força atualização imediata da lista
      await fetchFollowers();
      
    } catch (error) {
      console.error('Follow action failed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <View className="flex-1 bg-primary p-4 pt-9">
      <View className="flex-row justify-end my-4">
        <Button.Root.Redirect onPress={() => navigation.goBack()} >
          <Button.Content.Redirect title="Voltar" />
        </Button.Root.Redirect>
      </View>

      <View className="items-center mb-8">
        <View className="w-24 h-24 rounded-full bg-tertiary mb-4 items-center justify-center">
          <Text className="text-primary text-4xl font-bold">
            {name[0]?.toUpperCase()}
          </Text>
        </View>
        <Text className="text-secondary font-bold text-3xl">{name}</Text>
        <Text className="text-tertiary font-medium text-xl">@{login}</Text>

        {userLogin !== login && (
          <Pressable
            className="flex-row items-center justify-center p-4 w-full rounded-xl mt-6 bg-secondary/10 border border-secondary"
            onPress={handleFollow}
            disabled={loading}
          >
            <Text className="text-lg font-semibold text-secondary">
              {isFollowing ? 'Seguindo' : 'Seguir'}
            </Text>
          </Pressable>
        )}
      </View>

      <View className="flex-1">
        <Text className="text-tertiary font-bold text-xl mb-4 px-2">
          Seguidores ({followers.length})
        </Text>
        
        {followers.length === 0 ? (
          <View className="flex-1 items-center justify-center">
            <MaterialIcons
              name="people-outline"
              size={48}
              color={colors.tertiary}
              style={{ opacity: 0.3 }}
            />
            <Text className="text-tertiary/50 mt-4 text-center text-lg">
              Nenhum seguidor encontrado
            </Text>
          </View>
        ) : (
          <FlatList
            data={followers}
            keyExtractor={(item, index) => `${item}-${index}`}
            renderItem={({ item }) => <FollowerCard login={item} />}
            contentContainerStyle={{ paddingHorizontal: 8 }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
}