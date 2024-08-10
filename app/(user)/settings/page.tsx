import { auth } from "@/server/auth";
import SettingsForm from "@/components/settings/settings-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const SettingsPage = async () => {
  const session = await auth();

  if (!session) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>
          This is how others will see you on the website
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SettingsForm session={session} />
      </CardContent>
    </Card>
  );
};

export default SettingsPage;
