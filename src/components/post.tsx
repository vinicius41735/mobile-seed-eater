import { Pressable, Text, View } from "react-native";
import { Icon } from "./icon";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { api } from "@services";
import { colors } from "@constants";
import { useAuth } from "@contexts";
import { Likes, Posts } from "@models";

export function SinglePost({ props }: { props: Posts }) {
  const navigation = useNavigation<any>();
  const { userLogin } = useAuth();
  const [likes, setLikes] = useState<Likes[]>([]);
  const [comments, setComments] = useState<Posts[]>([]);
  const [userLiked, setUserLiked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function verifyLikes() {
      try {
        setIsLoading(true);

        const responseLikes = await api.get(`/posts/${props.id}/likes`);
        const dataLikes: Likes[] = responseLikes.data;
        setLikes(dataLikes);
        const userLike = dataLikes.some(like => like.user_login === userLogin);
        setUserLiked(userLike);

        const responseComments = await api.get(`/posts/${props.id}/replies`);
        const dataComments: Posts[] = responseComments.data;
        setComments(dataComments);
        
      } catch (error) {
        console.error("Erro ao buscar curtidas:", error);
      } finally {
        setIsLoading(false);
      }
    }

    verifyLikes();
  }, [props.id, userLogin]);

  const handleLikeToggle = async () => {
    if (isLoading) return;
  
    setIsLoading(true);
    try {
      if (likes && likes.length > 0) {
        if (userLiked) {
          const likeToRemove = likes.find(like => like.user_login === userLogin);
          if (likeToRemove) {
            await api.delete(`/posts/${props.id}/likes/${likeToRemove.id}`);
            const updatedLikes = likes.filter(like => like.id !== likeToRemove.id);
            setLikes(updatedLikes);
          }
        } else {
          const existingLike = likes.find(like => like.user_login === userLogin);
          if (!existingLike) {
            const response = await api.post(`/posts/${props.id}/likes`);
            const newLikes = [...likes, response.data];
            setLikes(newLikes);
          }
        }
      } else {
        if (!userLiked) {
          const response = await api.post(`/posts/${props.id}/likes`);
          setLikes([response.data]);
        }
      }
  
      setUserLiked(!userLiked);
    } catch (error) {
      console.error("Erro ao atualizar curtidas:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View
      className="flex-row gap-5 items-center justify-between p-4 m-3 rounded-lg border border-secondary bg-secondary/10"
    >
      <View className="flex-1">
        <View className="flex-row items-center mb-2">
          <View className="w-6 h-6 rounded-full bg-tertiary mr-2 items-center justify-center">
            <Text className="text-primary text-xs font-bold">
              {props.user_login[0]?.toUpperCase()}
            </Text>
          </View>
          <Text className="text-tertiary font-medium text-sm">
            @{props.user_login}
          </Text>
          <Text className="text-secondary text-sm ml-2">
          • {new Date(props.created_at).
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
          {props.message}
        </Text>
      </View>

      <View className="flex-col justify-end gap-5">
        <Pressable
          className="flex-row items-center gap-2"
          onPress={() =>
            navigation.navigate('Post', { id: props.id, user_login: props.user_login, message: props.message, created_at: props.created_at })
          }
        >
          <Icon icon="comment" color={colors.secondary} />
          <Text className="text-secondary">{comments?.length || 0}</Text>
        </Pressable>

        <Pressable
          className="flex-row items-center gap-2"
          onPress={handleLikeToggle}
          disabled={isLoading}
        >
          <Icon
            icon="heart"
            color={isLoading ? 'rgba(255, 255, 255, 0.1)' : (userLiked ? colors.tertiary : colors.secondary)}
          />
          <Text className="text-secondary">{likes?.length || 0}</Text>
        </Pressable>
      </View>
    </View>
  );
}
