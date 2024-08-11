import SearchForm from "@/components/search/search-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SearchPosts from "../../../components/search/search-posts";
import SearchUsers from "../../../components/search/search-users";

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { q: string };
}) => {
  const query = searchParams.q ?? "";

  return (
    <div className="flex flex-col gap-4">
      <SearchForm />
      <Tabs defaultValue="posts">
        <TabsList className="w-full">
          <TabsTrigger className="w-full" value="posts">
            Posts
          </TabsTrigger>
          <TabsTrigger className="w-full" value="users">
            Users
          </TabsTrigger>
        </TabsList>
        <TabsContent className="mt-4" value="posts">
          <SearchPosts query={query.toLowerCase()} />
        </TabsContent>
        <TabsContent value="users">
          <SearchUsers query={query.toLowerCase()} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SearchPage;
