import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // カスタムロジックをここに追加できます
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        // トークンが存在する場合、ユーザーは認証されています
        return token != null;
      },
    },
  }
);

export const config = { matcher: ["/protected/:path*"] };
