import { getTeamMembers } from "@/features/team/queries";
import { TeamManagementClient } from "@/components/admin/TeamManagementClient";

export default async function AdminTeamPage() {
  const teamList = await getTeamMembers();

  return <TeamManagementClient initialMembers={teamList} />;
}
