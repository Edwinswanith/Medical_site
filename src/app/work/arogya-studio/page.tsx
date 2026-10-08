import { ProjectRoute, projectMetadata } from "@/components/ProjectRoute";

export const metadata = projectMetadata("arogya-studio");

export default function ArogyaProjectPage() {
  return <ProjectRoute slug="arogya-studio" />;
}
