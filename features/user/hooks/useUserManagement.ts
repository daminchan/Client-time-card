import { useCallback, useEffect, useState } from "react";

import { useToast } from "@chakra-ui/react";

import { getUsers, deleteUser } from "@/features/user/action/userAction";

type User = {
  id: string;
  email: string;
  name: string;
  role: string;
};

export function useUserManagement(initialUsers: User[] = []) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      toast({
        title: "エラー",
        description: "ユーザー情報の取得に失敗しました。",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm("このユーザーを削除してもよろしいですか？")) {
      const result = await deleteUser(userId);
      if (result.success) {
        setUsers(users.filter((user) => user.id !== userId));
        toast({
          title: "ユーザー削除",
          description: result.message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "エラー",
          description: result.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  return {
    users,
    loading,
    fetchUsers,
    handleDeleteUser,
  };
}
