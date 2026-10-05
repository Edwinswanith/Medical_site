import { SERVICE_PAGES } from "@/content/services";
import { ServicePage } from "@/components/ServicePage";
import { pageMetadata } from "@/lib/seo";

const service = SERVICE_PAGES.find(item => item.slug === "patient-films")!;
export const metadata = pageMetadata({ path: "/services/patient-films", title: service.title, description: service.description });
export default function Page() { return <ServicePage service={service} />; }
