import { useState } from 'react';
import { Text, TextInput, View, Pressable, FlatList } from 'react-native';
import { api } from '@services';
import { Input, Loading } from '@components';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { Reply } from '@models';
import { MaterialIcons } from "@expo/vector-icons";

export function Post({ route }: { route: any }) {
  const { user_login, message, id, created_at } = route.params;
  const [replies, setReplies] = useState<Reply[]>([]);
  const [newReply, setNewReply] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [hasMoreReplies, setHasMoreReplies] = useState<boolean>(true);
  const navigation = useNavigation<any>();

  const fetchReplies = async (pageToFetch: number = 0) => {
    try {
      setLoading(true);
      const response = await api.get(`/posts/${id}/replies?page=${pageToFetch}`);
      const fetchedReplies = response.data;

      if (fetchedReplies.length === 0) {
        setHasMoreReplies(false);
      }

      setReplies((prevReplies) => (pageToFetch === 0 ? fetchedReplies : [...prevReplies, ...fetchedReplies]));
    } catch (error) {
      console.error('Error fetching replies:', error);
    } finally {
      setLoading(false);
      setIsFetchingMore(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchReplies();
    }, [id])
  );

  const handleReply = async () => {
    if (!newReply.trim()) return;
    try {
      setLoading(true);
      await api.post(`/posts/${id}/replies`, { message: newReply });
      setNewReply('');
      fetchReplies(0);
    } catch (error) {
      console.error('Error posting reply:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreReplies = () => {
    if (!isFetchingMore && hasMoreReplies) {
      setIsFetchingMore(true);
      const nextPage = page + 1;
      fetchReplies(nextPage);
      setPage(nextPage);
    }
  };

  return (
    <View className="flex-1 bg-primary p-4 pt-9">
      <View className="flex-row justify-end my-4">
        <Pressable
          className="bg-secondary p-4 px-5 rounded-full"
          onPress={() => navigation.navigate("PrivateDrawerRoutes")}
        >
          <Text className="text-primary text-base font-bold">Voltar</Text>
        </Pressable>
      </View>

      <View
        className="items-center justify-center p-4 m-3 gap-3 rounded-lg border border-secondary bg-secondary/10"
      >
        <View className="flex-row items-center mb-2">
          <View className="w-6 h-6 rounded-full bg-tertiary mr-2 items-center justify-center">
            <Text className="text-primary text-xs font-bold">
              {user_login[0]?.toUpperCase()}
            </Text>
          </View>
          <Text className="text-tertiary font-medium text-sm">
            @{user_login}
          </Text>
          <Text className="text-secondary text-sm ml-2">
          • {new Date(created_at).
                  toLocaleString('pt-BR',
                    { 
                      day: '2-digit', 
                      month: '2-digit', 
                      year: 'numeric', 
                      hour: '2-digit', 
                      minute: '2-digit', 
                      hour12: false 
                    }).replace(',', ' às')}
          </Text>
        </View>
        <Text className="text-secondary text-base leading-6">
          {message}
        </Text>

        <Input.Root.Field>
          <Input.Content.Field
            placeholder='Digite sua resposta...'
            multiline
            value={newReply}
            onChangeText={setNewReply}
          />
          <Input.Actions icon={MaterialIcons} name='send' onShowAction={handleReply} />
        </Input.Root.Field>
      </View>

      <View className="border-b border-secondary my-4 mx-3" />

      {loading && replies.length === 0 ? (
        <Loading />
      ) : (
        <FlatList
          data={replies.slice().reverse()}
          keyExtractor={(reply) => reply.id.toString()}
          renderItem={({ item: reply }) => (
            <View
              className="p-4 my-2 border border-secondary rounded-lg bg-opacity-10"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }}
            >
              <View className="flex-row items-center mb-2">
                <View className="w-6 h-6 rounded-full bg-tertiary mr-2 items-center justify-center">
                  <Text className="text-primary text-xs font-bold">
                    {reply.user_login[0]?.toUpperCase()}
                  </Text>
                </View>
                <Text className="text-tertiary font-medium text-sm">
                  @{reply.user_login}
                </Text>
                <Text className="text-secondary text-sm ml-2">
                  • {new Date(reply.created_at).
                  toLocaleString('pt-BR',
                    { 
                      day: '2-digit', 
                      month: '2-digit', 
                      year: 'numeric', 
                      hour: '2-digit', 
                      minute: '2-digit', 
                      hour12: false 
                    }).replace(',', ' às')}
                </Text>
              </View>
              <Text className="text-secondary text-base leading-6">
                {reply.message}
              </Text>
            </View>
          )}
          ListEmptyComponent={() => (
            <Text className="text-secondary text-center mt-10">Nenhuma resposta ainda.</Text>
          )}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
          onEndReached={loadMoreReplies}
          onEndReachedThreshold={0.1}
          ListFooterComponent={isFetchingMore ? <Loading /> : null}
        />
      )}
    </View>
  );
}
