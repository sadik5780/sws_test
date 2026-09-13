import OpeningScene from "@/components/scenes/OpeningScene";
import SelectedWorkScene from "@/components/scenes/SelectedWorkScene";
import CampaignsScene from "@/components/scenes/CampaignsScene";
import BTSScene from "@/components/scenes/BTSScene";
import EditorialScene from "@/components/scenes/EditorialScene";
import ReelScene from "@/components/scenes/ReelScene";
import CreditsScene from "@/components/scenes/CreditsScene";

/**
 * THE REEL — seven scenes, registered with lib/filmProgress.js as they
 * mount so the bottom timeline can size its segments and track the current
 * scene. See components/CameraFrame.jsx for the persistent HUD and
 * components/Leader.jsx for the opening countdown.
 */
export default function Home() {
  return (
    <main>
      <OpeningScene />
      <SelectedWorkScene />
      <CampaignsScene />
      <BTSScene />
      <EditorialScene />
      <ReelScene />
      <CreditsScene />
    </main>
  );
}
