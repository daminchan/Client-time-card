"use client";
import React from "react";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Box,
  Spinner,
} from "@chakra-ui/react";
import Link from "next/link";

import CustomButton from "@/components/button/CustomButton";
import FlexCol from "@/components/ui/FlexCol";

import { useUserManagement } from "../hooks/useUserManagement";
type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

const UserTable: React.FC = () => {
  const { users, loading, handleDeleteUser } = useUserManagement();

  if (loading) {
    return <Spinner />;
  }

  if (users.length === 0) {
    return <p>ユーザーが見つかりません。</p>;
  }

  return (
    <FlexCol>
      <Box width="100%">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>名前</Th>
              <Th>メールアドレス</Th>
              <Th>役割</Th>
              <Th>アクション</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user.id}>
                <Td>{user.name}</Td>
                <Td>{user.email}</Td>
                <Td>{user.role}</Td>
                <Td>
                  <CustomButton onClick={() => handleDeleteUser(user.id)}>
                    削除
                  </CustomButton>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </FlexCol>
  );
};

export default UserTable;
