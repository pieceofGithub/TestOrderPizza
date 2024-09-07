import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { View, Text, Button } from "react-native";

const ProfileScreen = () => {
  const { profile } = useAuth();
  console.log(profile);

  return (
    <View>
      <Text>Profile Sign Out Page</Text>

      {/* Display the user's ID */}
      <Text>User ID: {profile?.id}</Text>

      <Button
        title="Sign out"
        onPress={async () => await supabase.auth.signOut()}
      />
    </View>
  );
};

export default ProfileScreen;
