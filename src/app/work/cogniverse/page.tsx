import { ProjectRoute, projectMetadata } from "@/components/ProjectRoute";

export const metadata = projectMetadata("cogniverse");

export default function CogniverseProjectPage() {
  return <ProjectRoute slug="cogniverse" />;
}
