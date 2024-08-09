import { ReactNode } from "react";

const PostsGrid = ({ children }: { children: ReactNode }) => {
  return <div className="grid grid-cols-3 gap-1">{children}</div>;
};

export default PostsGrid;
