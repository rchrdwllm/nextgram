import { auth } from "@/server/auth";
import SettingsForm from "@/components/settings/settings-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FadeWrapper from "@/components/ui/fade-wrapper";

const SettingsPage = async () => {
  const session = await auth();

  if (!session) return null;

  return (
    <FadeWrapper>
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
    </FadeWrapper>
  );
};

export default SettingsPage;
